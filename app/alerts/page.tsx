"use client";
import React from "react";

const ALERTS = [
  {
    pest: "Fall Armyworm",
    risk: "High",
    icon: "⚠️",
    color: "bg-orange-200 border-l-4 border-orange-500",
    symptoms: [
      { desc: "Windowpane leaf damage", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Fall_Armyworm_damage.jpg" },
      { desc: "Frass (caterpillar droppings) in whorl", img: "https://www.cabi.org/isc/FullTextImages/2020/20203358516.jpg" }
    ],
    advice: "Inspect leaves early morning. Use recommended pesticide if detected. Remove and destroy infested plants if possible."
  },
  {
    pest: "Maize Streak Virus",
    risk: "Medium",
    icon: "🟠",
    color: "bg-yellow-100 border-l-4 border-yellow-400",
    symptoms: [
      { desc: "Yellow streaks on leaves", img: "https://www.cimmyt.org/wp-content/uploads/2017/07/MSV.jpg" }
    ],
    advice: "Plant resistant varieties. Control leafhoppers. Remove infected plants early."
  },
  {
    pest: "Bean Rust",
    risk: "Low",
    icon: "🟢",
    color: "bg-green-100 border-l-4 border-green-400",
    symptoms: [
      { desc: "Rusty spots on underside of leaves", img: "https://www.gardeningknowhow.com/wp-content/uploads/2019/07/bean-rust.jpg" }
    ],
    advice: "Remove affected leaves. Use fungicide if severe. Practice crop rotation."
  }
];

export default function AlertsPage() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-900">🪲 Pest & Disease Alerts</h1>
      <div className="flex flex-col gap-4">
        {ALERTS.map((alert, i) => (
          <div key={i} className={`rounded-xl shadow p-4 flex flex-col gap-2 ${alert.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{alert.icon}</span>
              <span className="font-bold text-lg">{alert.pest}</span>
              <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${alert.risk === "High" ? "bg-red-600 text-white" : alert.risk === "Medium" ? "bg-yellow-400 text-black" : "bg-green-500 text-white"}`}>{alert.risk} risk</span>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {alert.symptoms.map((s, j) => (
                <div key={j} className="flex flex-col items-center w-28">
                  <img src={s.img} alt={s.desc} className="w-20 h-16 object-cover rounded border mb-1" />
                  <span className="text-xs text-gray-700 text-center">{s.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-800"><b>Treatment advice:</b> {alert.advice}</div>
          </div>
        ))}
      </div>
    </main>
  );
}