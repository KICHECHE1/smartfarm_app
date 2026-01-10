"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AdvicePage() {
	const router = useRouter();
	return (
		<main className="min-h-screen bg-gradient-to-br from-white via-green-50 to-yellow-50 px-2 py-4 flex flex-col items-center font-sans">
			<section className="w-full max-w-md text-center mb-6">
				<h1 className="text-2xl md:text-3xl font-extrabold text-green-800 mb-1 flex items-center justify-center gap-2">
					<span className="text-3xl">🧭</span> Today's Farm Advice
				</h1>
				<p className="text-green-900 text-base md:text-lg mb-2">Actionable steps for your farm, based on real data.</p>
			</section>

			{/* Advice Cards */}
			<section className="w-full max-w-md flex flex-col gap-4 mb-6">
				{/* Weather Advice */}
				<a href="/weather" className="bg-blue-50 rounded-xl p-4 shadow flex flex-col gap-2 hover:ring-2 ring-blue-300 transition">
					<span className="text-3xl">🌦️</span>
					<div className="flex-1 text-left">
						<div className="font-semibold text-blue-800">Weather Advice</div>
						<div className="text-sm">Check today's weather and 7-day forecast to plan your farm activities.</div>
					</div>
					<span className="bg-blue-600 text-white px-3 py-1 rounded text-xs self-start mt-2">View Weather</span>
				</a>
				{/* Soil Advice */}
				<a href="/soil" className="bg-green-50 rounded-xl p-4 shadow flex flex-col gap-2 hover:ring-2 ring-green-300 transition">
					<span className="text-3xl">🌱</span>
					<div className="flex-1 text-left">
						<div className="font-semibold text-green-800">Soil Advice</div>
						<div className="text-sm">Get soil health tips and fertilizer recommendations for your crops.</div>
					</div>
					<span className="bg-green-600 text-white px-3 py-1 rounded text-xs self-start mt-2">View Soil</span>
				</a>
				{/* Crop Advice */}
				<a href="/crops" className="bg-yellow-50 rounded-xl p-4 shadow flex flex-col gap-2 hover:ring-2 ring-yellow-300 transition">
					<span className="text-3xl">🌾</span>
					<div className="flex-1 text-left">
						<div className="font-semibold text-yellow-800">Crop Advice</div>
						<div className="text-sm">See best practices for planting, growing, and harvesting your crops.</div>
					</div>
					<span className="bg-yellow-600 text-white px-3 py-1 rounded text-xs self-start mt-2">View Crops</span>
				</a>
				{/* Pest Alerts */}
				<a href="/alerts" className="bg-red-50 rounded-xl p-4 shadow flex flex-col gap-2 hover:ring-2 ring-red-300 transition">
					<span className="text-3xl">🐛</span>
					<div className="flex-1 text-left">
						<div className="font-semibold text-red-800">Pest Alerts</div>
						<div className="text-sm">Stay updated on pest outbreaks and get control advice.</div>
					</div>
					<span className="bg-red-600 text-white px-3 py-1 rounded text-xs self-start mt-2">View Alerts</span>
				</a>
			</section>

			{/* Call to Action for Farm Records */}
			<button
				className="w-full max-w-md bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mb-2 active:scale-95"
				onClick={() => router.push("/profile")}
			>
				<span className="text-2xl">📊</span> View Farm Records & History
			</button>

			<div className="w-full max-w-md text-center text-xs text-gray-500 mt-2">
				Stay updated — check this page daily for new advice!
			</div>
		</main>
	);
}