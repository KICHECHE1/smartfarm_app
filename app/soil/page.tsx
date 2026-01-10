export default function SoilPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Soil Health</h1>
      {/* TODO: Add bar charts/gauges for pH, moisture, NPK */}
      <div className="bg-green-100 p-4 rounded mb-2">pH level: 6.5 (Optimal)</div>
      <div className="bg-green-50 p-4 rounded mb-2">Moisture: Good</div>
      <div className="bg-green-200 p-4 rounded mb-2">N: Low, P: Good, K: Good</div>
      <div className="mt-4 text-red-700">Soil nitrogen is low. Apply urea fertilizer within 7 days.</div>
    </main>
  );
}