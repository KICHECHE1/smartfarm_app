"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !location || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("sf_user_fullName", fullName);
      localStorage.setItem("sf_user_location", location);
      localStorage.setItem("sf_user_phone", phone);
      localStorage.setItem("sf_user_email", email);
    }
    router.push("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-green-50 px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 text-center">Welcome to SmartFarm!</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border rounded px-3 py-2"
            placeholder="Full Name*"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Location (e.g. Kitale, Kenya)*"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Phone Number*"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold mt-2">Continue</button>
        </form>
      </div>
    </main>
  );
}