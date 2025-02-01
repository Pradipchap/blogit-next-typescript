"use client";
import { useState } from "react";

export default function Page() {
  const [newsText, setNewsText] = useState("");
  const [isFake, setIsFake] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkNews = async () => {
    console.log("hello");
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newsText }), // Send the newsText as JSON
      });

      const data = await response.json(); // Parse the JSON response
      console.log("data", data.prediction); // Log the result

      setIsFake(data.prediction);
      setIsModalOpen(true);
    } catch (error) {
      alert("Error checking news. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewsText(""); // Clear text field
    setIsFake("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Paste the news to check its authenticity
        </label>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Paste your news"
          rows="5"
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
        />

        <button
          onClick={checkNews}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
          disabled={!newsText.trim()}
        >
          Test the News
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-96 text-center ${
              isFake === "Fake news"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            <h2 className="text-2xl font-bold">
              {isFake === "Fake news"
                ? "⚠️ The News is Fake"
                : "✅ The News is True"}
            </h2>
            <p className="mt-2 text-lg">
              {isFake === "Fake news"
                ? "Be cautious! This news is not reliable."
                : "This news is verified and trustworthy."}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
