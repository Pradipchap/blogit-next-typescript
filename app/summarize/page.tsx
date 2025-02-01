"use client";
import { useState } from "react";

export default function Page() {
  const [newsText, setNewsText] = useState("");
  const [summary, setSummary] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchSummary = async () => {
    if (!newsText.trim()) return; // Prevent empty submissions

    setIsDisabled(true); // Disable textarea on submit

    try {
      const response = await fetch(
        "https://6797e16cc2c861de0c6e4fab.mockapi.io/summarize/summary"
      );
      const data = await response.json();
      setSummary(data[0]?.summary || "No summary available.");
    } catch (error) {
      setSummary("Error fetching summary. Please try again.");
    }
  };

  const handleSummarizeNext = () => {
    setNewsText(""); // Clear text area
    setSummary(""); // Reset summary
    setIsDisabled(false); // Enable textarea
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Place your news text here
        </label>

        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
          placeholder="Paste your news"
          rows="5"
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          disabled={isDisabled} // Disable textarea on submit
        />

        <button
          onClick={fetchSummary}
          className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all disabled:bg-gray-400"
          disabled={!newsText.trim() || isDisabled} // Button disabled if textarea is empty or already submitted
        >
          Submit
        </button>

        {summary && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
            <p className="mt-2 text-gray-700 bg-gray-100 p-4 rounded-lg">
              {summary}
            </p>

            <button
              onClick={handleSummarizeNext}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Summarize Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
