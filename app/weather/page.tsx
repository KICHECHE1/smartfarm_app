"use client";

import React, { useEffect, useState } from "react";


export default function WeatherPage() {
  // No API key needed for Open-Meteo
  const DEFAULT_LOCATION = { lat: 1.015, lon: 35.006 };
  const [manualCity, setManualCity] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationName, setLocationName] = useState("Kitale, Kenya");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // On mount, get user location and name from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loc = localStorage.getItem("sf_user_location");
      const name = localStorage.getItem("sf_user_fullName");
      if (loc) setLocationName(loc);
      if (name) setUserName(name);
      // If location is a city string, try to geocode it using Open-Meteo
      if (loc && isNaN(Number(loc))) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc)}&count=1&language=en&format=json`)
          .then(res => res.json())
          .then(data => {
            if (data && data.results && data.results.length > 0) {
              setLocation({ lat: data.results[0].latitude, lon: data.results[0].longitude });
              setLocationName(`${data.results[0].name}${data.results[0].country ? ", " + data.results[0].country : ""}`);
            }
          });
      }
    }
  }, []);

  useEffect(() => {
    if (!isManual && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          setLocation(DEFAULT_LOCATION);
        }
      );
    }
  }, [isManual]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        let lat = location.lat;
        let lon = location.lon;
        let locName = locationName;
        // If manual city, geocode using Open-Meteo's geocoding API
        if (isManual && manualCity) {
          const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(manualCity)}&count=1&language=en&format=json`);
          if (!geoRes.ok) {
            const text = await geoRes.text();
            console.error('Geocode fetch failed:', geoRes.status, text);
            setError(`Geocode error: ${geoRes.status}`);
            setLoading(false);
            return;
          }
          const geoData = await geoRes.json();
          if (geoData && geoData.results && geoData.results.length > 0) {
            lat = geoData.results[0].latitude;
            lon = geoData.results[0].longitude;
            locName = `${geoData.results[0].name}${geoData.results[0].country ? ", " + geoData.results[0].country : ""}`;
            setLocation({ lat, lon });
            setLocationName(locName);
          } else {
            setError("City not found.");
            setLoading(false);
            return;
          }
        }
        // Fetch current weather and 7-day forecast from Open-Meteo
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&forecast_days=7&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) {
          const text = await res.text();
          console.error('Open-Meteo fetch failed:', res.status, text);
          setError(`Weather error: ${res.status}`);
          setLoading(false);
          return;
        }
        const data = await res.json();
        // Map Open-Meteo data to expected format
        setWeather({
          main: { temp: data.current_weather.temperature },
          weather: [{ description: `Code ${data.current_weather.weathercode}`, icon: "01d" }],
          wind: { speed: data.current_weather.windspeed },
          rain: { "1h": data.daily.precipitation_sum[0] || 0 },
        });
        // Build forecast array
        const forecastArr = Array.from({ length: 7 }).map((_, i) => ({
          dt: Math.floor(new Date(data.daily.time[i]).getTime() / 1000),
          temp: { day: data.daily.temperature_2m_max[i], min: data.daily.temperature_2m_min[i], max: data.daily.temperature_2m_max[i] },
          rain: data.daily.precipitation_sum[i],
          weather: [{ main: data.daily.weathercode[i] === 61 || data.daily.weathercode[i] === 63 ? "Rain" : data.daily.weathercode[i] === 0 ? "Clear" : "Clouds" }],
        }));
        setForecast(forecastArr);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    }
    fetchWeather();
  }, [location, isManual, manualCity]);

  function getDayName(dt: number): string {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString(undefined, { weekday: "short" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 px-2 py-4 flex flex-col items-center font-sans">
      <section className="w-full max-w-md text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-1 flex items-center justify-center gap-2">
          <span className="text-3xl">🌦️</span> Weather & Climate
        </h1>
        <div className="text-lg font-semibold text-blue-900 mb-1">{userName ? `Hello, ${userName}!` : ""}</div>
        <p className="text-blue-900 text-base md:text-lg mb-2">Plan your planting, irrigation, and spraying with confidence.</p>
        <div className="text-xs text-blue-700 mt-1">Location: {locationName}</div>
        <form className="flex flex-col items-center gap-2 mt-2" onSubmit={e => {e.preventDefault(); setIsManual(true); setLoading(true);}}>
          <input
            type="text"
            className="border rounded px-3 py-1 text-sm w-48"
            placeholder="Enter city name..."
            value={manualCity}
            onChange={e => setManualCity(e.target.value)}
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Set Location</button>
            <button type="button" className="bg-green-600 text-white px-3 py-1 rounded text-xs" onClick={() => {setIsManual(false); setManualCity(""); setLocation(DEFAULT_LOCATION); setLoading(true);}}>Use My Location</button>
          </div>
        </form>
      </section>

      {loading ? (
        <div className="w-full max-w-md text-center text-blue-700">Loading weather data...</div>
      ) : error ? (
        <div className="w-full max-w-md text-center text-red-700">{error}</div>
      ) : (
        <>
          {/* Today's Weather */}
          <section className="w-full max-w-md bg-blue-50 rounded-xl p-4 mb-4 shadow flex items-center gap-4">
            <span className="text-4xl">{weather && weather.weather && weather.weather[0].icon === "01d" ? "☀️" : "🌦️"}</span>
            <div className="flex-1 text-left">
              <div className="font-semibold text-blue-800">Today</div>
              <div className="text-sm">{weather && weather.main ? Math.round(weather.main.temp) : "--"}°C, {weather && weather.weather ? weather.weather[0].description : "--"}</div>
              <div className="text-xs text-blue-700">Rain: {weather && weather.rain ? weather.rain["1h"] : 0}% • Wind: {weather && weather.wind ? Math.round(weather.wind.speed) : "--"}km/h</div>
            </div>
          </section>

          {/* 7-day Forecast */}
          <section className="w-full max-w-md mb-4">
            <div className="font-semibold text-blue-800 mb-2">7-day Forecast</div>
            <div className="grid grid-cols-7 gap-2 text-xs">
              {forecast && forecast.map((f: any, i: number) => (
                <div key={i} className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm">
                  <span>{getDayName(f.dt)}</span>
                  <span className="text-lg">{f.weather[0].main === "Rain" ? "🌧️" : f.weather[0].main === "Clear" ? "☀️" : "🌦️"}</span>
                  <span>{Math.round(f.temp.day)}°C</span>
                </div>
              ))}
            </div>
          </section>

          {/* Rainfall Prediction */}
          <section className="w-full max-w-md bg-green-50 rounded-xl p-4 mb-4 shadow flex items-center gap-4">
            <span className="text-3xl">🌧️</span>
            <div className="flex-1 text-left">
              <div className="font-semibold text-green-800">Rainfall Prediction</div>
              <div className="text-sm">Rain expected in {forecast && forecast.findIndex((f: any) => f.weather[0].main === "Rain") + 1} days. Total: {forecast && forecast.reduce((sum: number, f: any) => sum + (f.rain || 0), 0)}mm this week.</div>
            </div>
          </section>

          {/* Extreme Alerts */}
          <section className="w-full max-w-md mb-4">
            <div className="font-semibold text-red-800 mb-2">Extreme Alerts</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-400 rounded p-2">
                <div className="text-xs text-blue-700 mt-1">Location: {locationName}</div>
                <span className="text-xl">🚨</span>
                <span className="text-sm">{forecast && forecast.some((f: any) => f.temp.max > 35) ? "Drought warning" : "No drought warning"}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 rounded p-2">
                <span className="text-xl">⚠️</span>
                <span className="text-sm">{forecast && forecast.some((f: any) => f.rain && f.rain > 20) ? "Heavy rain possible" : "No heavy rain expected"}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 border-l-4 border-blue-400 rounded p-2">
                <span className="text-xl">❄️</span>
                <span className="text-sm">{forecast && forecast.some((f: any) => f.temp.min < 5) ? "Frost expected" : "No frost expected"}</span>
              </div>
            </div>
          </section>

          {/* Farmer-friendly Message */}
          <div className="w-full max-w-md text-center text-base text-green-700 font-semibold mt-2 mb-4">
            {forecast && forecast.findIndex((f: any) => f.weather[0].main === "Rain") !== -1
              ? `Rain expected in ${forecast && forecast.findIndex((f: any) => f.weather[0].main === "Rain") + 1} days — delay irrigation.`
              : "No rain expected soon."}
          </div>
        </>
      )}
    </main>
  );
}