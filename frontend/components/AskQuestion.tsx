"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function AskQuestions() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [references, setReferences] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!pdfFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await axios.post("http://127.0.0.1:8002/upload_pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`✅ Uploaded successfully`);
    } catch (err) {
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8002/ask_question/", { question });
      setAnswer(res.data.answer);
      setReferences(res.data.references || []);
    } catch (err) {
      setAnswer("⚠️ Failed to get response. Please check the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-white">
           <span className="text-blue-400"></span>
        </h1>

        {/* 📁 Upload PDF */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📄 Upload Resume PDF</h2>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="bg-gray-700 p-2 rounded-md w-full"
            />
            <button
              onClick={handleUpload}
              disabled={!pdfFile || uploading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        {/* 💬 Ask a Question */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">💬 Ask a Question</h2>
          <textarea
            rows={4}
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* 📢 Answer */}
        {answer && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📢 Answer</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>

            {references.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">📚 References:</h3>
                <ul className="list-disc pl-6 text-sm text-gray-300 space-y-1">
                  {references.map((ref, idx) => (
                    <li key={idx}>{ref.slice(0, 200)}...</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
