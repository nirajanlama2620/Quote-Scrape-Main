import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError("");

      await new Promise(resolve => setTimeout(resolve, 300));

      const { data } = await api.get("/quotes");

      setQuotes(data.quotes || []);
      setLastUpdated(data.lastUpdated);
      setPage(1); // reset to first page on refresh
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const selectedQuotes = quotes.slice(startIndex, startIndex + limit);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          📓 Quotes Dashboard
        </h1>

        {/* Top Bar */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={fetchQuotes}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            ⟳ Refresh
          </button>

          {lastUpdated && (
            <p className="text-sm text-gray-600">
              Last updated:{" "}
              <span className="font-semibold">
                {new Date(lastUpdated).toLocaleString()}
              </span>
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="mt-4 text-gray-600">Loading quotes...</p>
        )}

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {selectedQuotes.map((q, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition" >

                  {/* Quote */}
                  <p className="text-gray-800 text-lg leading-relaxed mb-4">
                    “{q.text}”
                  </p>

                  {/* Author (clickable) */}
                  <p className="text-right font-semibold text-gray-600">
                    —{" "}
                    <a href={q.authorUrl} target="_blank" rel="noopener noreferrer"
                      className="hover:underline text-blue-600" > {q.author} </a>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {q.tags?.map((tag, i) => (
                      <span key={i} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full" > #{tag} </span>
                    ))}
                  </div>
                </div>
          ))}
        </div>

        {/* Pagination */}
        {!loading && quotes.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" >
                 Prev </button>

            <span className="px-4 py-2 font-semibold"> Page {page} </span>

            <button onClick={() => setPage(prev => prev + 1)}
              disabled={startIndex + limit >= quotes.length}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}