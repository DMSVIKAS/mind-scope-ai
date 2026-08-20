import { Trophy } from "lucide-react";

function WinnerCard({ results }) {
  if (!results || results.length === 0) return null;

  const winner = [...results].sort(
    (a, b) => b.confidence - a.confidence
  )[0];

  const modelNames = {
    logistic_regression: "Logistic Regression",
    random_forest: "Random Forest",
    svm: "Support Vector Machine",
    xgboost: "XGBoost",
    lightgbm: "LightGBM",
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-8">

      <div className="flex items-center gap-3">

        <Trophy
          size={38}
          className="text-yellow-400"
        />

        <div>

          <h2 className="text-2xl font-bold text-white">
            Best Performing Model
          </h2>

          <p className="text-zinc-300">
            Highest confidence for this prediction
          </p>

        </div>

      </div>

      <div className="mt-6">

        <h1 className="text-4xl font-bold text-yellow-300">
          {modelNames[winner.model]}
        </h1>

        <p className="mt-3 text-xl text-white">
          Prediction :
          <span className="ml-2 font-bold text-violet-400">
            {winner.prediction}
          </span>
        </p>

        <p className="mt-2 text-lg text-zinc-300">
          Confidence :
          <span className="ml-2 font-bold text-green-400">
            {(winner.confidence * 100).toFixed(2)}%
          </span>
        </p>

      </div>

    </div>
  );
}

export default WinnerCard;