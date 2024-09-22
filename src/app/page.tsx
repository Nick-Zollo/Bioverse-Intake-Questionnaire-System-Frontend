import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to BIOVERSE</h1>
      <Link href="/login">
        <button className="px-6 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
          Go to Login
        </button>
      </Link>
    </div>
  );
}
