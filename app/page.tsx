"use client";

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("sf_user_fullName");
      const loc = localStorage.getItem("sf_user_location");
      setUserName(name);
      setUserLocation(loc);
      if (!name || !loc) {
        router.push("/onboarding");
      }
    }
  }, [router]);


  if (!userName || !userLocation) {
    return null; // or a loading spinner
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 px-2 py-4 flex flex-col items-center font-sans">
      {/* Header */}
      <section className="w-full max-w-md text-center mb-4">
        <div className="flex flex-col items-center gap-1 mb-2">
          <span className="text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow">SmartFarm</span>
        </div>
        <p className="text-green-900 text-base md:text-lg font-medium mb-2">Advisory App for Modern Farmers</p>
        <p className="text-yellow-900 text-sm md:text-base mb-3">Clear daily advice, weather, soil & crop data, and smart alerts—right in your pocket.</p>
        <div className="flex gap-2 mb-2">
          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Mobile Ready</span>
          <span className="inline-block bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Web Optimized</span>
        </div>
      </section>

      {/* Greeting & Location */}
      <section className="relative z-10 w-full max-w-md text-left mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-1">Good morning, {userName}</h2>
        <div className="text-brown-700 text-sm mb-2">{userLocation}</div>
        {/* Weather summary */}
        <div className="flex items-center gap-4 bg-yellow-50 rounded-lg p-3 mb-2 shadow-sm">
          <div className="text-3xl">☀️</div>
          <div>
            <div className="font-semibold text-lg">22°C</div>
            <div className="text-xs text-yellow-800">Rain: 10% • Wind: 8km/h</div>
          </div>
        </div>
      </section>

      {/* Quick stats cards */}
      <section className="relative z-10 w-full max-w-md grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center shadow-md">
          <span className="text-2xl">🌱</span>
          <span className="font-semibold">Soil Moisture</span>
          <span className="text-green-700 font-bold">Good</span>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center shadow-md">
          <span className="text-2xl">🧪</span>
          <span className="font-semibold">Soil pH</span>
          <span className="text-blue-700 font-bold">6.5 (Optimal)</span>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center shadow-md">
          <span className="text-2xl">🌽</span>
          <span className="font-semibold">Crop Status</span>
          <span className="text-yellow-700 font-bold">Healthy</span>
        </div>
        <div className="bg-red-50 rounded-xl p-4 flex flex-col items-center shadow-md">
          <span className="text-2xl">🐛</span>
          <span className="font-semibold">Pest Risk</span>
          <span className="text-red-700 font-bold">Low</span>
        </div>
      </section>

      {/* Primary Action Button */}
      <button
        className="relative z-10 w-full max-w-md bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white text-lg font-bold py-4 rounded-2xl shadow-xl transition mb-4 flex items-center justify-center gap-2 active:scale-95"
        onClick={() => router.push("/advice")}
      >
        <span className="text-2xl">✅</span> Get Today’s Farm Advice
      </button>

      {/* Tagline for extra engagement */}
      <div className="relative z-10 w-full max-w-md text-center text-xs text-gray-500 mt-2">
        Powered by AI & real farm data. <span className="text-green-700 font-semibold">Grow smart, farm better!</span>
      </div>
    </main>
  );
}
