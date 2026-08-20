function ComparisonTable({ results }) {

    const modelNames = {
      logistic_regression: "Logistic Regression",
      random_forest: "Random Forest",
      svm: "Support Vector Machine",
      xgboost: "XGBoost",
      lightgbm: "LightGBM",
    };
  
    return (
      <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
  
        <h2 className="mb-6 text-2xl font-bold text-white">
          Comparison Results
        </h2>
  
        <table className="w-full text-left">
  
          <thead>
  
            <tr className="border-b border-zinc-700">
  
              <th className="pb-3 text-zinc-300">Model</th>
              <th className="pb-3 text-zinc-300">Prediction</th>
              <th className="pb-3 text-zinc-300">Confidence</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {results.map((item) => (
  
              <tr
                key={item.model}
                className="border-b border-zinc-800"
              >
  
                <td className="py-4 text-white">
                  {modelNames[item.model]}
                </td>
  
                <td className="py-4 font-semibold text-violet-400">
                  {item.prediction}
                </td>
  
                <td className="py-4 text-white">
                  {(item.confidence * 100).toFixed(2)}%
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default ComparisonTable;