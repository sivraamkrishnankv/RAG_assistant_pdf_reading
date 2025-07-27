"use client";

import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8002/upload_pdf/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(`✅ Uploaded: ${data.filename}`);
      } else {
        const err = await res.text();
        console.error("Upload failed:", err);
        setStatus("❌ Upload failed");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      setStatus("❌ Network error");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept=".pdf"
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload PDF
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
}
