import CompareInput from "../components/compare/CompareInput";

function CompareModels() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          ⚖️ AI Model Benchmark
        </h1>

        <p className="mt-2 max-w-3xl text-zinc-400">
          Compare all trained machine learning models on the same input,
          evaluate their confidence scores, predictions, and benchmark their
          performance side by side.
        </p>
      </div>

      {/* Compare Input */}
      <CompareInput />
    </div>
  );
}

export default CompareModels;