import { useState } from "react";
import { Brain, GitCompareArrows } from "lucide-react";
import api from "../../services/Api";
import ComparisonTable from "./ComparisonTable";
import WinnerCard from "./WinnerCard";
function CompareInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleCompare = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/compare-models", {
        text,
        model_name: "logistic_regression",
      });

      setResults(response.data.results);

    } catch (err) {
      console.error(err);
      alert("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

        <div className="mb-6 flex items-center gap-3">
          <Brain className="text-violet-500" size={30} />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Compare All Models
            </h2>

            <p className="text-zinc-400">
              Enter a sentence and compare predictions from every AI model.
            </p>
          </div>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I feel hopeless and don't enjoy life anymore..."
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white outline-none focus:border-violet-500"
        />

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            <GitCompareArrows size={20} />
            {loading ? "Comparing..." : "Compare Models"}
          </button>
        </div>

      </div>

      {results.length > 0 && (
        <>
        <WinnerCard results={results} />
    
        <ComparisonTable results={results} />
    </>
      )}
    </>
  );
}

export default CompareInput;