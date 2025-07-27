// pages/index.tsx
import AskQuestion from "@/components/AskQuestion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-500 flex flex-col items-center justify-center p-0">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-3">
        <h1 className="text-3xl font-bold mb-4 text-center text-white-100 bg-gray-900 p-4 rounded-lg">
          Interactive Rag Assistant
        </h1>
        <AskQuestion />
      </div>
    <footer className="mt-10 text-black-100">
        <p className="text-center justify-center text-md text-black-500">
        Built by Siv Raam Krishnan.K.V
        </p>      
    </footer>    
    </main>
  );
}
