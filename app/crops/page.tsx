export default function CropsPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crop Advisory</h1>
      {/* TODO: Add crop type/stage selection and advice */}
      <div className="bg-brown-100 p-4 rounded mb-2">Select crop type and stage</div>
      <div className="bg-green-50 p-4 rounded mb-2">Advice: Maize at vegetative stage needs nitrogen-rich fertilizer. Apply CAN at 50kg/acre.</div>
    </main>
  );
}