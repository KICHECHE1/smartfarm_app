"use client";
import React, { useState } from "react";

const ALL_CROPS = ["Maize", "Beans", "Rice", "Coffee", "Sorghum", "Potato", "Tomato", "Cabbage", "Onion", "Cassava", "Millet", "Sunflower", "Banana", "Tea", "Sugarcane"];

export default function ProfilePage() {
  const [farmSize, setFarmSize] = useState(2);
  const [location, setLocation] = useState("Kisumu");
  const [crops, setCrops] = useState(["Maize", "Beans"]);
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);

  function toggleCrop(crop: string) {
    setCrops(crops => crops.includes(crop) ? crops.filter(c => c !== crop) : [...crops, crop]);
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-900">👨‍🌾 Farmer Profile & Settings</h1>
      <form className="bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        {/* Farm size */}
        <div>
          <label className="block font-semibold mb-1">Farm size (acres)</label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={farmSize}
            onChange={e => setFarmSize(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g. Kisumu, Kitale, Eldoret"
          />
        </div>
        {/* Crops grown */}
        <div>
          <label className="block font-semibold mb-1">Crops grown</label>
          <div className="flex flex-wrap gap-2">
            {ALL_CROPS.map(crop => (
              <button
                type="button"
                key={crop}
                className={`px-3 py-1 rounded-full border text-sm ${crops.includes(crop) ? "bg-green-200 border-green-600 font-bold" : "bg-gray-50 border-gray-300"}`}
                onClick={() => toggleCrop(crop)}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
        {/* Preferred language */}
        <div>
          <label className="block font-semibold mb-1">Preferred language</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={`px-3 py-1 rounded ${language === "English" ? "bg-green-200 font-bold" : "bg-gray-50"}`}
              onClick={() => setLanguage("English")}
            >English</button>
            <button
              type="button"
              className={`px-3 py-1 rounded ${language === "Kiswahili" ? "bg-green-200 font-bold" : "bg-gray-50"}`}
              onClick={() => setLanguage("Kiswahili")}
            >Kiswahili</button>
          </div>
        </div>
        {/* Notification preferences */}
        <div>
          <label className="block font-semibold mb-1">Notifications</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="w-5 h-5"
              id="notif-toggle"
            />
            <label htmlFor="notif-toggle" className="text-sm">Enable notifications</label>
          </div>
        </div>
        {/* Save button (not functional, for UI) */}
        <button type="button" className="mt-2 bg-green-700 text-white py-2 rounded-lg font-bold text-lg hover:bg-green-800 transition">Save Profile</button>
      </form>
    </main>
  );
}