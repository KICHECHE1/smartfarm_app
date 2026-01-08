"use client";

import React, { useEffect, useState } from "react";

// API endpoints now point to your backend
const WEATHER_API = "http://localhost:4000/api/weather";
const SOIL_API = "http://localhost:4000/api/soil";
const MARKET_API = "http://localhost:4000/api/market-prices";
const CROP_ADVICE_API = "http://localhost:4000/api/crop-advice";
const CROP_API = "http://localhost:4000/api/crops";
const PEST_API = "http://localhost:4000/api/pest-alerts";
const RECORDS_API = "http://localhost:4000/api/farm-records";
const KNOWLEDGE_API = "http://localhost:4000/api/knowledge";

// Define the Alert type for TypeScript
interface Alert {
  type: string;
  message: string;
  urgency: string;
}

// Define Crop type for TypeScript
interface Crop {
  name: string;
  stage: string;
  health: string;
  harvestDate: string;
  [key: string]: any;
}

// Add types for all data arrays
interface Advice extends String {}
interface PestAlert {
  pest: string;
  severity: string;
  advice: string;
  [key: string]: any;
}
interface RecordItem {
  crop: string;
  planted: string;
  harvested: string;
  yield: number | string;
  reviewed?: boolean;
  [key: string]: any;
}
interface KnowledgeItem {
  title: string;
  summary: string;
  read?: boolean;
  [key: string]: any;
}
interface MarketItem {
  crop: string;
  price: string;
  market: string;
  [key: string]: any;
}

// Add Weather type for TypeScript
interface Weather {
  weather: { description: string }[];
  main: { temp: number; humidity: number };
  rain?: { [key: string]: number };
  wind: { speed: number };
  [key: string]: any;
}

export default function SmallScaleFarmerDashboard() {
  // State for real data
  const [weather, setWeather] = useState<Weather | null>(null);
  const [soil, setSoil] = useState(null);
  const [market, setMarket] = useState<MarketItem[]>([]);
  const [advice, setAdvice] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [pestAlerts, setPestAlerts] = useState<PestAlert[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);

  // Fetch all data
  useEffect(() => {
    fetch(WEATHER_API)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(() => setWeather(null));
    fetch(SOIL_API)
      .then(res => res.json())
      .then(data => setSoil(data))
      .catch(() => setSoil(null));
    fetch(MARKET_API)
      .then(res => res.json())
      .then(data => setMarket(data))
      .catch(() => setMarket([]));
    fetch(CROP_ADVICE_API)
      .then(res => res.json())
      .then(data => setAdvice(data))
      .catch(() => setAdvice([]));
    fetch(CROP_API)
      .then(res => res.json())
      .then(data => setCrops(data))
      .catch(() => setCrops([]));
    fetch(PEST_API)
      .then(res => res.json())
      .then(data => setPestAlerts(data))
      .catch(() => setPestAlerts([]));
    fetch(RECORDS_API)
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(() => setRecords([]));
    fetch(KNOWLEDGE_API)
      .then(res => res.json())
      .then(data => setKnowledge(data))
      .catch(() => setKnowledge([]));
    // Example default alerts if API fails
    setAlerts([
      { type: "Weather", message: "Rain expected tomorrow", urgency: "Medium" },
      { type: "Crop", message: "Maize ready for harvest", urgency: "High" },
      { type: "Pest", message: "Early signs of aphids detected", urgency: "Low" }
    ]);
  }, []);

  // Interactivity: Dismiss alert
  const dismissAlert = (idx: number) => {
    setAlerts(alerts => alerts.filter((_, i) => i !== idx));
  };

  // Interactivity: Update crop status
  const updateCropStage = (idx: number, newStage: string) => {
    setCrops(crops => crops.map((crop, i) => i === idx ? { ...crop, stage: newStage } : crop));
  };

  // Interactivity: Mark advice as done
  const markAdviceDone = (idx: number) => {
    setAdvice(advice => advice.filter((_, i) => i !== idx));
  };

  // Interactivity: Mark pest alert as resolved
  const resolvePestAlert = (idx: number) => {
    setPestAlerts(pestAlerts => pestAlerts.filter((_, i) => i !== idx));
  };

  // Interactivity: Mark notification as read
  const markNotificationRead = (idx: number) => {
    setAlerts(alerts => alerts.filter((_, i) => i !== idx));
  };

  // Interactivity: Mark record as reviewed
  const reviewRecord = (idx: number) => {
    setRecords(records => records.map((rec, i) => i === idx ? { ...rec, reviewed: true } : rec));
  };

  // Interactivity: Mark knowledge as read
  const markKnowledgeRead = (idx: number) => {
    setKnowledge(knowledge => knowledge.map((item, i) => i === idx ? { ...item, read: true } : item));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-sky-100 p-4 md:p-8">
      {/* Dashboard Overview */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
            <h2 className="text-xl font-bold text-green-800 mb-2">Farm Status</h2>
            <span className="inline-block px-4 py-2 rounded-full text-white font-semibold bg-green-500">Healthy</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
            <h2 className="text-xl font-bold text-sky-700 mb-2">Today's Weather</h2>
            {weather ? (
              <div className="flex flex-col gap-1 text-gray-700">
                <span>{weather.weather[0].description}</span>
                <span>Temp: {weather.main.temp}°C</span>
                <span>Rainfall: {weather.rain ? weather.rain["1h"] + "mm" : "0mm"}</span>
                <span>Humidity: {weather.main.humidity}%</span>
                <span>Wind: {weather.wind.speed} km/h</span>
              </div>
            ) : (
              <span className="text-gray-400">Loading weather...</span>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex-1 text-center">
            <h2 className="text-xl font-bold text-green-800 mb-2">Active Alerts</h2>
            <ul className="space-y-1">
              {alerts.map((alert, i) => (
                <li key={i} className={`px-2 py-1 rounded text-white flex justify-between items-center ${alert.urgency === "High" ? "bg-red-500" : alert.urgency === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                  <span>{alert.message}</span>
                  <button className="ml-2 text-xs bg-white text-green-700 px-2 py-0.5 rounded" onClick={() => dismissAlert(i)}>Dismiss</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Crop Progress Overview */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Crop Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crops.length > 0 ? crops.map((crop, i) => (
              <div key={i} className="border rounded-lg p-4 text-center">
                <h3 className="font-semibold text-lg text-green-700 mb-1">{crop.name}</h3>
                <div className="mb-1 text-sm">Stage: <span className="font-medium">{crop.stage}</span></div>
                <div className="mb-1 text-sm">Health: <span className={`font-medium ${crop.health === "Good" ? "text-green-600" : crop.health === "Moderate" ? "text-yellow-600" : "text-red-600"}`}>{crop.health}</span></div>
                <div className="mb-1 text-sm">Est. Harvest: <span className="font-medium">{crop.harvestDate}</span></div>
                <select className="mt-2 border rounded px-2 py-1" value={crop.stage} onChange={e => updateCropStage(i, e.target.value)}>
                  <option>Planting</option>
                  <option>Vegetative</option>
                  <option>Flowering</option>
                  <option>Harvest</option>
                </select>
              </div>
            )) : <span className="text-gray-400">Loading crops...</span>}
          </div>
        </div>
      </section>
      {/* AI-Powered Recommendations */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">AI Recommendations</h2>
          <ul className="list-disc pl-5 text-green-900 space-y-1">
            {advice.length > 0 ? advice.map((rec, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{rec}</span>
                <button className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded" onClick={() => markAdviceDone(i)}>Done</button>
              </li>
            )) : <span className="text-gray-400">Loading recommendations...</span>}
          </ul>
        </div>
      </section>
      {/* Pest & Disease Alerts */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-red-700 mb-4">Pest & Disease Alerts</h2>
          <ul className="space-y-2">
            {pestAlerts.length > 0 ? pestAlerts.map((pest, i) => (
              <li key={i} className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between">
                <span className="font-semibold text-green-700">{pest.pest}</span>
                <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${pest.severity === "High" ? "bg-red-500" : pest.severity === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>{pest.severity}</span>
                <span className="text-gray-700 mt-2 md:mt-0">{pest.advice}</span>
                <button className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded" onClick={() => resolvePestAlert(i)}>Resolve</button>
              </li>
            )) : <span className="text-gray-400">Loading pest alerts...</span>}
          </ul>
        </div>
      </section>
      {/* Smart Alert & Notification Center */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Notifications</h2>
          <ul className="space-y-1">
            {alerts.map((alert, i) => (
              <li key={i} className={`px-2 py-1 rounded text-white flex justify-between items-center ${alert.urgency === "High" ? "bg-red-500" : alert.urgency === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                <span>{alert.type}: {alert.message}</span>
                <button className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded" onClick={() => markNotificationRead(i)}>Read</button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Knowledge & Learning Section */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-sky-700 mb-4">Knowledge & Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {knowledge.length > 0 ? knowledge.map((item, i) => (
              <div key={i} className={`border rounded-lg p-4 ${item.read ? 'bg-green-50' : ''}`}>
                <h3 className="font-semibold text-green-700 mb-1">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.summary}</p>
                <button className="mt-2 text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded" onClick={() => markKnowledgeRead(i)}>{item.read ? 'Read' : 'Mark as Read'}</button>
              </div>
            )) : <span className="text-gray-400">Loading knowledge...</span>}
          </div>
        </div>
      </section>
      {/* Farm Records & History */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Farm Records & History</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2">Crop</th>
                <th className="p-2">Planted</th>
                <th className="p-2">Harvested</th>
                <th className="p-2">Yield</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? records.map((rec, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{rec.crop}</td>
                  <td className="p-2">{rec.planted}</td>
                  <td className="p-2">{rec.harvested}</td>
                  <td className="p-2">{rec.yield}</td>
                  <td className="p-2">
                    <button className={`text-xs px-2 py-1 rounded ${rec.reviewed ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'}`} onClick={() => reviewRecord(i)}>{rec.reviewed ? 'Reviewed' : 'Mark as Reviewed'}</button>
                  </td>
                </tr>
              )) : <tr><td colSpan={5} className="text-gray-400 p-2">Loading records...</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      {/* Market & Price Insights (Optional) */}
      <section className="mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-sky-700 mb-4">Market & Price Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {market.length > 0 ? market.map((item, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-semibold text-green-700 mb-1">{item.crop}</h3>
                <p className="text-gray-700 text-sm">Price: <span className="font-semibold">{item.price}</span></p>
                <p className="text-gray-700 text-sm">Market: <span className="font-semibold">{item.market}</span></p>
              </div>
            )) : <span className="text-gray-400">Loading market prices...</span>}
          </div>
        </div>
      </section>
    </main>
  );
}