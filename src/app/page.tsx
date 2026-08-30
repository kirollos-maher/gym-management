import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏋️ Gym Management System
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Complete solution for gym check-in, loyalty points, and notifications
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-700">Check-In</h3>
              <p className="text-sm text-gray-500">QR Code & Manual</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-700">Loyalty Points</h3>
              <p className="text-sm text-gray-500">Earn & Redeem</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-700">Notifications</h3>
              <p className="text-sm text-gray-500">WhatsApp, SMS, Email</p>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link
              href="/check-in"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Check-In
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}