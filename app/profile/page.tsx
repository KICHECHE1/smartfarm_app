export default function ProfilePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Profile & Settings</h1>
      {/* TODO: Add form for farm size, location, crops, language, notifications */}
      <div className="bg-white p-4 rounded mb-2">Farm size: 2 acres</div>
      <div className="bg-white p-4 rounded mb-2">Location: Kisumu</div>
      <div className="bg-white p-4 rounded mb-2">Crops: Maize, Beans</div>
      <div className="bg-white p-4 rounded mb-2">Preferred language: English</div>
      <div className="bg-white p-4 rounded mb-2">Notifications: Enabled</div>
    </main>
  );
}