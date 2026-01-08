"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
	"Small-scale Farmer",
	"Commercial Farmer",
	"Farm Manager",
	"Agronomist",
];

export default function LandingPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [selectedRole, setSelectedRole] = useState(roles[0]);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Here you would handle authentication logic, then redirect:
		if (selectedRole === "Small-scale Farmer") router.push("/dashboard/small-scale-farmer");
		else if (selectedRole === "Commercial Farmer") router.push("/dashboard/commercial-farmer");
		else if (selectedRole === "Farm Manager") router.push("/dashboard/farm-manager");
		else if (selectedRole === "Agronomist") router.push("/dashboard/agronomist");
	};

	return (
		<main className="flex flex-col md:flex-row items-center min-h-screen bg-gradient-to-br from-green-200 via-white to-sky-200 p-4 md:p-8">
			{/* Info Section */}
			<section className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mb-8 md:mb-0">
				<h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-800 drop-shadow-lg text-center md:text-left">
					Smart Farming Advisory App
				</h1>
				<p className="text-lg md:text-xl text-green-900 mb-6 max-w-md text-center md:text-left">
					Transform your farming with real-time weather, crop management,
					AI-powered recommendations, and smart alerts. Designed for all roles in
					modern agriculture.
				</p>
				<ul className="mb-6 text-green-900 list-disc pl-5 max-w-md text-base md:text-lg space-y-1">
					<li>Weather-based farming insights</li>
					<li>Crop health and growth tracking</li>
					<li>AI recommendations for every role</li>
					<li>Priority alerts and notifications</li>
					<li>Educational resources and best practices</li>
				</ul>
				<div className="flex gap-2 mt-2">
					<span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
						Mobile Ready
					</span>
					<span className="inline-block bg-sky-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
						Web Optimized
					</span>
				</div>
			</section>
			{/* Form Section */}
			<section className="w-full md:w-1/2 flex flex-col items-center">
				<div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-sky-100">
					<div className="flex justify-between mb-6">
						<button
							className={`w-1/2 px-4 py-2 font-semibold rounded-l-xl transition-all duration-200 ${
								isLogin
									? "bg-green-600 text-white shadow"
									: "bg-sky-100 text-green-800"
							}`}
							onClick={() => setIsLogin(true)}
						>
							Login
						</button>
						<button
							className={`w-1/2 px-4 py-2 font-semibold rounded-r-xl transition-all duration-200 ${
								!isLogin
									? "bg-green-600 text-white shadow"
									: "bg-sky-100 text-green-800"
							}`}
							onClick={() => setIsLogin(false)}
						>
							Signup
						</button>
					</div>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<label className="font-medium text-green-900">Role</label>
						<select
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
							value={selectedRole}
							onChange={(e) => setSelectedRole(e.target.value)}
						>
							{roles.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
						<label className="font-medium text-green-900">Email</label>
						<input
							type="email"
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-400"
							placeholder="Enter your email"
							required
						/>
						<label className="font-medium text-green-900">Password</label>
						<input
							type="password"
							className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-400"
							placeholder="Enter your password"
							required
						/>
						{!isLogin && (
							<>
								<label className="font-medium text-green-900">Full Name</label>
								<input
									type="text"
									className="border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
									placeholder="Enter your name"
									required
								/>
							</>
						)}
						<button
							type="submit"
							className="bg-gradient-to-r from-green-500 to-sky-400 text-white font-semibold py-2 rounded-xl mt-4 shadow hover:from-green-600 hover:to-sky-500 transition-all"
						>
							{isLogin ? "Login" : "Signup"}
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
