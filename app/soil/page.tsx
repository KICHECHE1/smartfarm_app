"use client";
import React, { useEffect, useState } from "react";


function getDefaultLocation() {
  // Default to Kitale, Kenya if no geolocation
  return { lat: 1.015, lon: 35.006 };
}

function Bar({ label, value, min, max, goodMin, goodMax, unit }: {
  label: string;
  value: number;
  min: number;
  max: number;
  goodMin: number;
  goodMax: number;
  unit?: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  let color = "bg-green-500";
  if (value < goodMin || value > goodMax) color = "bg-red-500";
  else if (value < goodMin + (goodMax-goodMin)*0.2 || value > goodMax - (goodMax-goodMin)*0.2) color = "bg-yellow-400";
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>{label}</span>
        <span>{value}{unit ? ` ${unit}` : ""}</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded">
        <div
          className={`h-4 rounded ${color}`}
          style={{ width: `${percent}%`, transition: "width 0.5s" }}
        ></div>
      </div>
    </div>
  );
}

export default function SoilPage() {
  const [location, setLocation] = useState(getDefaultLocation());
  const [soil, setSoil] = useState({ ph: 6.5, moisture: 38, n: 20, p: 45, k: 60 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          setLocation(getDefaultLocation());
        }
      );
    }
  }, []);

  useEffect(() => {
    async function fetchSoil() {
      setLoading(true);
      setError(null);
      try {
        // Example API endpoint (replace with real soil API)
        // Replace with your actual soil data API
        const url = `https://api.soilgrids.org/query?lat=${location.lat}&lon=${location.lon}`;
        // For demo, use mock data
        // const res = await fetch(url);
        // if (!res.ok) throw new Error('Failed to fetch soil data');
        // const data = await res.json();
        // Example mapping (replace with real mapping)
        // setSoil({
        //   ph: data.ph || 6.5,
        //   moisture: data.moisture || 38,
        //   n: data.nitrogen || 20,
        //   p: data.phosphorus || 45,
        //   k: data.potassium || 60,
        // });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch soil data.");
        setLoading(false);
      }
    }
    fetchSoil();
  }, [location]);

  // Advice logic
  let advice = "Soil is healthy.";
  if (soil.n < 30) advice = "Soil nitrogen is low. Apply urea fertilizer within 7 days.";
  else if (soil.ph < 5.5) advice = "Soil is too acidic. Apply lime.";
  else if (soil.moisture < 25) advice = "Soil moisture is low. Irrigate soon.";

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span>🌱</span> Soil Health
      </h1>
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <Bar label="pH Level" value={soil.ph} min={3} max={9} goodMin={6} goodMax={7.5} />
        <Bar label="Moisture" value={soil.moisture} min={0} max={100} goodMin={30} goodMax={60} unit="%" />
        <Bar label="Nitrogen (N)" value={soil.n} min={0} max={100} goodMin={30} goodMax={70} unit="mg/kg" />
        <Bar label="Phosphorus (P)" value={soil.p} min={0} max={100} goodMin={30} goodMax={70} unit="mg/kg" />
        <Bar label="Potassium (K)" value={soil.k} min={0} max={100} goodMin={30} goodMax={70} unit="mg/kg" />
      </div>
      {loading ? (
        <div className="text-blue-700">Loading soil data...</div>
      ) : error ? (
        <div className="text-red-700">{error}</div>
      ) : (
        <div className={`mt-4 text-base font-semibold ${advice.includes("low") ? "text-red-700" : "text-green-700"}`}>{advice}</div>
      )}
    </main>
  );
}