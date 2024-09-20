import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       
        <div className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold">test</h2>
          <p className="text-gray-700">test description</p>
          <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
            Start
          </button>
        </div>

        <div className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold">test</h2>
          <p className="text-gray-700">test description</p>
          <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
            Start
          </button>
        </div>
        
        <div className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold">test</h2>
          <p className="text-gray-700">test description</p>
          <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
            Start
          </button>
        </div>
        
      </main>
    </div>
  );
}
