import { Cpu } from "lucide-react";

const models = [
  {
    name: "XGBoost",
    accuracy: 97.2,
    color: "#8B5CF6",
  },
  {
    name: "Random Forest",
    accuracy: 95.8,
    color: "#3B82F6",
  },
  {
    name: "LightGBM",
    accuracy: 94.6,
    color: "#10B981",
  },
  {
    name: "Logistic Regression",
    accuracy: 91.3,
    color: "#F59E0B",
  },
  {
    name: "SVM",
    accuracy: 89.8,
    color: "#EF4444",
  },
];

export default function ModelPerformanceTrend() {

  const best = models[0];

  return (

    <div className="flex h-full flex-col">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h4 className="text-xl font-semibold text-white">
            Model Performance
          </h4>

          <p className="text-sm text-zinc-400">
            Accuracy comparison
          </p>

        </div>

        <div className="rounded-xl bg-purple-500/10 p-3">

          <Cpu
            className="text-purple-400"
            size={24}
          />

        </div>

      </div>

      <div className="flex-1 space-y-5">

        {models.map((model) => (

          <div key={model.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-white font-medium">

                {model.name}

              </span>

              <span
                style={{
                  color: model.color,
                }}
                className="font-bold"
              >

                {model.accuracy}%

              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${model.accuracy}%`,
                  background: model.color,
                }}
              />

            </div>

          </div>

        ))}

      </div>


    </div>

  );

}