"use client";
import React, { useState } from "react";
// --- AI Chat Widget ---
type AgriChatProps = {
  crop: string;
  stage: string;
};
function AgriChat({ crop, stage }: AgriChatProps) {
  const [messages, setMessages] = React.useState([
    { sender: "ai", text: "Hello! Ask me anything about your crop." }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);

    // OpenAI Chat API integration
    try {
      const apiKey = "YOUR_OPENAI_API_KEY"; // <-- Replace with your OpenAI API key
      const systemPrompt = `You are an expert agronomist. Give clear, practical, and locally relevant advice for smallholder farmers in Kenya. The user is growing ${crop} at the ${stage} stage.`;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // or "gpt-4" if you have access
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.filter(m => m.sender !== "ai").map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
            { role: "user", content: input }
          ],
          max_tokens: 256,
          temperature: 0.7
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "(No response)";
      setMessages(msgs => [...msgs, { sender: "ai", text: reply }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { sender: "ai", text: "Sorry, I couldn't get a response from the assistant." }]);
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="border rounded p-2 bg-white mt-6">
      <div className="h-40 overflow-y-auto mb-2 bg-gray-50 rounded p-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "ai" ? "text-green-700" : "text-gray-800"}>
            <b>{m.sender === "ai" ? "AgriAI:" : "You:"}</b> {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question…"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading} className="bg-green-600 text-white px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}


const CROPS = [
  { name: "Maize", icon: "🌽" },
  { name: "Beans", icon: "🫘" },
  { name: "Rice", icon: "🍚" },
  { name: "Coffee", icon: "☕" },
  { name: "Sorghum", icon: "🌾" },
  { name: "Potato", icon: "🥔" },
  { name: "Tomato", icon: "🍅" },
  { name: "Cabbage", icon: "🥬" },
  { name: "Onion", icon: "🧅" },
  { name: "Cassava", icon: "🌱" },
  { name: "Millet", icon: "🌾" },
  { name: "Sunflower", icon: "🌻" },
  { name: "Banana", icon: "🍌" },
  { name: "Tea", icon: "🍵" },
  { name: "Sugarcane", icon: "🍬" },
];
const STAGES = ["Planting", "Vegetative", "Flowering", "Harvest"];

function getAdvice(crop: string, stage: string) {
  // Maize
  if (crop === "Maize") {
    if (stage === "Planting") return {
      fertilizer: { main: "Apply DAP at planting.", details: ["Quantity: 50kg/acre"] },
      irrigation: { main: "Irrigate if soil is dry.", details: ["Ensure moist soil for germination."] },
      spacing: { main: "75cm x 25cm.", details: ["Plant 2-3cm deep.", "Firm soil after planting."] },
      yield: { main: "18–25 bags/acre.", details: ["Use certified seeds."] },
      tip: "Maize at planting: Use DAP at 50kg/acre for strong start."
    };
    if (stage === "Vegetative") return {
      fertilizer: { main: "Top-dress with CAN.", details: ["50kg/acre, split in 2 doses."] },
      irrigation: { main: "Water every 3–4 days.", details: ["Apply 25–30mm per session."] },
      spacing: { main: "75cm x 25cm.", details: ["Weed 2 weeks after emergence."] },
      yield: { main: "18–25 bags/acre.", details: ["Apply fertilizer on moist soil."] },
      tip: "Maize at vegetative: Apply CAN at 50kg/acre."
    };
    if (stage === "Flowering") return {
      fertilizer: { main: "No fertilizer needed.", details: ["Monitor for pests."] },
      irrigation: { main: "Water if dry.", details: ["Critical for grain fill."] },
      spacing: { main: "Maintain weed-free field.", details: [] },
      yield: { main: "18–25 bags/acre.", details: ["Control pests early."] },
      tip: "Maize at flowering: Keep field weed-free."
    };
    if (stage === "Harvest") return {
      fertilizer: { main: "No fertilizer needed.", details: [] },
      irrigation: { main: "Stop irrigation 2 weeks before harvest.", details: [] },
      spacing: { main: "N/A", details: [] },
      yield: { main: "18–25 bags/acre.", details: ["Harvest when cobs are dry."] },
      tip: "Maize at harvest: Harvest when cobs are fully dry."
    };
  }
  // Beans
  if (crop === "Beans") {
    if (stage === "Planting") return {
      fertilizer: { main: "Apply DAP at 40kg/acre.", details: [] },
      irrigation: { main: "Irrigate if no rain.", details: [] },
      spacing: { main: "30cm x 10cm.", details: ["Plant 3-5cm deep."] },
      yield: { main: "8–12 bags/acre.", details: [] },
      tip: "Beans at planting: Use DAP at 40kg/acre."
    };
    if (stage === "Vegetative") return {
      fertilizer: { main: "No top-dressing needed.", details: [] },
      irrigation: { main: "Water every 5–7 days.", details: [] },
      spacing: { main: "30cm x 10cm.", details: ["Weed regularly."] },
      yield: { main: "8–12 bags/acre.", details: [] },
      tip: "Beans at vegetative: Keep soil moist, weed regularly."
    };
    if (stage === "Flowering") return {
      fertilizer: { main: "Apply foliar feed if needed.", details: [] },
      irrigation: { main: "Keep soil moist, avoid waterlogging.", details: [] },
      spacing: { main: "30cm x 10cm.", details: ["Remove weeds."] },
      yield: { main: "8–12 bags/acre.", details: [] },
      tip: "Beans at flowering: Apply foliar feed if needed."
    };
    if (stage === "Harvest") return {
      fertilizer: { main: "No fertilizer needed.", details: [] },
      irrigation: { main: "Stop irrigation before harvest.", details: [] },
      spacing: { main: "N/A", details: [] },
      yield: { main: "8–12 bags/acre.", details: ["Harvest when pods are dry."] },
      tip: "Beans at harvest: Harvest when pods are dry."
    };
  }
  // Rice
  if (crop === "Rice") {
    if (stage === "Planting") return {
      fertilizer: { main: "Apply basal NPK.", details: ["50kg/acre."] },
      irrigation: { main: "Flood field before planting.", details: [] },
      spacing: { main: "20cm x 20cm.", details: ["Transplant 2-3 seedlings/hill."] },
      yield: { main: "20–30 bags/acre.", details: [] },
      tip: "Rice at planting: Flood field, use NPK."
    };
    if (stage === "Vegetative") return {
      fertilizer: { main: "Top-dress with urea.", details: ["30kg/acre."] },
      irrigation: { main: "Maintain 2–5cm water depth.", details: [] },
      spacing: { main: "20cm x 20cm.", details: ["Weed as needed."] },
      yield: { main: "20–30 bags/acre.", details: [] },
      tip: "Rice at vegetative: Top-dress with urea."
    };
    if (stage === "Flowering") return {
      fertilizer: { main: "Apply potassium if needed.", details: [] },
      irrigation: { main: "Maintain water, avoid drought.", details: [] },
      spacing: { main: "Keep field weed-free.", details: [] },
      yield: { main: "20–30 bags/acre.", details: [] },
      tip: "Rice at flowering: Maintain water, apply potassium if needed."
    };
    if (stage === "Harvest") return {
      fertilizer: { main: "No fertilizer needed.", details: [] },
      irrigation: { main: "Drain field 2 weeks before harvest.", details: [] },
      spacing: { main: "N/A", details: [] },
      yield: { main: "20–30 bags/acre.", details: ["Harvest when grains are hard."] },
      tip: "Rice at harvest: Drain field, harvest when grains are hard."
    };
  }
  // Coffee
  if (crop === "Coffee") {
    if (stage === "Planting") return {
      fertilizer: { main: "Apply manure and NPK.", details: ["Mix in planting hole."] },
      irrigation: { main: "Water after planting.", details: [] },
      spacing: { main: "2m x 2m.", details: ["Shade young plants."] },
      yield: { main: "Varies.", details: ["Use healthy seedlings."] },
      tip: "Coffee at planting: Use manure and NPK."
    };
    if (stage === "Vegetative") return {
      fertilizer: { main: "Apply NPK every 3 months.", details: [] },
      irrigation: { main: "Irrigate during dry spells.", details: [] },
      spacing: { main: "2m x 2m.", details: ["Prune as needed."] },
      yield: { main: "Varies.", details: [] },
      tip: "Coffee at vegetative: Apply NPK quarterly."
    };
    if (stage === "Flowering") return {
      fertilizer: { main: "Apply foliar feed.", details: [] },
      irrigation: { main: "Water if dry.", details: [] },
      spacing: { main: "Keep field clean.", details: [] },
      yield: { main: "Varies.", details: [] },
      tip: "Coffee at flowering: Apply foliar feed."
    };
    if (stage === "Harvest") return {
      fertilizer: { main: "No fertilizer needed.", details: [] },
      irrigation: { main: "Irrigate if dry.", details: [] },
      spacing: { main: "N/A", details: [] },
      yield: { main: "Varies.", details: ["Pick only ripe berries."] },
      tip: "Coffee at harvest: Pick only ripe berries."
    };
  }
  // Potato
  if (crop === "Potato") {
    if (stage === "Planting") return {
      fertilizer: { main: "Apply DAP at 100kg/acre.", details: [] },
      irrigation: { main: "Irrigate after planting.", details: [] },
      spacing: { main: "75cm x 30cm.", details: ["Plant 10cm deep."] },
      yield: { main: "80–120 bags/acre.", details: ["Use certified seed."] },
      tip: "Potato at planting: Use DAP at 100kg/acre."
    };
    if (stage === "Vegetative") return {
      fertilizer: { main: "Top-dress with CAN.", details: ["50kg/acre."] },
      irrigation: { main: "Water every 5–7 days.", details: [] },
      spacing: { main: "75cm x 30cm.", details: ["Earth up plants."] },
      yield: { main: "80–120 bags/acre.", details: [] },
      tip: "Potato at vegetative: Top-dress with CAN."
    };
    if (stage === "Flowering") return {
      fertilizer: { main: "Apply foliar feed.", details: [] },
      irrigation: { main: "Keep soil moist.", details: [] },
      spacing: { main: "Keep field weed-free.", details: [] },
      yield: { main: "80–120 bags/acre.", details: [] },
      tip: "Potato at flowering: Apply foliar feed."
    };
    if (stage === "Harvest") return {
      fertilizer: { main: "No fertilizer needed.", details: [] },
      irrigation: { main: "Stop irrigation before harvest.", details: [] },
      spacing: { main: "N/A", details: [] },
      yield: { main: "80–120 bags/acre.", details: ["Harvest when tops dry."] },
      tip: "Potato at harvest: Harvest when tops are dry."
    };
  }
  // Add more crops here as needed...
  // Default
  return {
    fertilizer: { main: "Use balanced NPK fertilizer as per soil test.", details: [] },
    irrigation: { main: "Irrigate as needed, avoid water stress.", details: [] },
    spacing: { main: "Follow recommended spacing for crop. Weed as needed.", details: [] },
    yield: { main: "Yield depends on management and weather.", details: [] },
    tip: `${crop} at ${stage} stage: follow best agronomic practices.`
  };
}

export default function CropsPage() {
  const [crop, setCrop] = useState(CROPS[0].name);
  const [stage, setStage] = useState(STAGES[0]);
  const [showAdvice, setShowAdvice] = useState(false);
  // Demo: static location/soil/weather
  const location = "Kisumu County";
  const soil = "Loamy (pH 6.5)";
  const weather = "Light rain expected";
  const advice = getAdvice(crop, stage);

  return (
    <main className="max-w-md mx-auto p-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">🌾 Crop Advisory</h1>
        <div className="text-green-800">Get expert guidance for your farm</div>
        <div className="text-xs text-gray-500">Based on crop type, growth stage, soil & weather data</div>
      </header>

      {/* Input Section */}
      <section className="bg-white rounded-xl shadow p-4 mb-4">
        {/* Crop selection: icon grid */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Select Crop</div>
          <div className="grid grid-cols-3 gap-2">
            {CROPS.map(c => (
              <button
                key={c.name}
                className={`flex flex-col items-center justify-center border rounded-lg p-2 text-lg font-semibold transition-all ${crop === c.name ? "bg-green-100 border-green-600" : "bg-gray-50 border-gray-200"}`}
                onClick={() => { setCrop(c.name); setShowAdvice(false); }}
                type="button"
              >
                <span className="text-2xl mb-1">{c.icon}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Growth stage: button group */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Growth Stage</div>
          <div className="flex gap-2 flex-wrap">
            {STAGES.map(s => (
              <button
                key={s}
                className={`px-3 py-2 rounded-lg font-medium border transition-all ${stage === s ? "bg-yellow-200 border-yellow-600" : "bg-gray-50 border-gray-200"}`}
                onClick={() => { setStage(s); setShowAdvice(false); }}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        {/* Optional: location, soil, weather */}
        <div className="flex flex-col md:flex-row gap-2 text-xs text-gray-700 mb-4">
          <div className="bg-green-50 rounded px-2 py-1 flex-1">📍 Location: {location}</div>
          <div className="bg-yellow-50 rounded px-2 py-1 flex-1">🌱 Soil: {soil}</div>
          <div className="bg-blue-50 rounded px-2 py-1 flex-1">🌦 Weather: {weather}</div>
        </div>
        {/* Action button */}
        <button
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold text-lg mt-2 hover:bg-green-800 transition"
          onClick={() => setShowAdvice(true)}
        >
          Get Crop Advice
        </button>
      </section>

      {/* Results Section (show after button click) */}
      {showAdvice && (
        <section>
          {/* Fertilizer Advice Card */}
          <div className="bg-green-50 rounded-xl shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-2 font-bold text-green-900 text-lg"><span>🧪</span> Fertilizer Advice</div>
            <div>{advice.fertilizer.main}</div>
            <ul className="list-disc ml-6 text-sm text-green-800">
              {advice.fertilizer.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          {/* Irrigation Schedule Card */}
          <div className="bg-blue-50 rounded-xl shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-2 font-bold text-blue-900 text-lg"><span>💧</span> Irrigation Schedule</div>
            <div>{advice.irrigation.main}</div>
            <ul className="list-disc ml-6 text-sm text-blue-800">
              {advice.irrigation.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          {/* Spacing & Weeding Card */}
          <div className="bg-yellow-50 rounded-xl shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-2 font-bold text-yellow-900 text-lg"><span>🌿</span> Spacing & Weeding</div>
            <div>{advice.spacing.main}</div>
            <ul className="list-disc ml-6 text-sm text-yellow-800">
              {advice.spacing.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          {/* Expected Yield Tips Card */}
          <div className="bg-gray-50 rounded-xl shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-2 font-bold text-gray-900 text-lg"><span>📊</span> Expected Yield Tips</div>
            <div>{advice.yield.main}</div>
            <ul className="list-disc ml-6 text-sm text-gray-800">
              {advice.yield.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          {/* Farmer-Friendly Highlight */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded p-4 mb-4 text-yellow-900 font-bold text-center text-base shadow">
            <span className="mr-2">🟡 Tip of the Day</span>
            {advice.tip}
          </div>
        </section>
      )}

      {/* Language toggle (demo only, not functional) */}
      <div className="flex justify-center gap-2 mt-4">
        <span className="text-sm text-gray-600">Language:</span>
        <button className="px-2 py-1 rounded bg-green-100 text-green-900 font-semibold">English</button>
        <button className="px-2 py-1 rounded bg-yellow-100 text-yellow-900 font-semibold">Kiswahili</button>
      </div>

      {/* AI Chat Widget */}
      <AgriChat crop={crop} stage={stage} />
    </main>
  );
}