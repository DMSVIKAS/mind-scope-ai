import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from "recharts";

const data = [
  { day: "Mon", predictions: 8 },
  { day: "Tue", predictions: 13 },
  { day: "Wed", predictions: 10 },
  { day: "Thu", predictions: 17 },
  { day: "Fri", predictions: 15 },
  { day: "Sat", predictions: 7 },
  { day: "Sun", predictions: 11 },
];

const COLORS = [
  "#7C3AED",
  "#8B5CF6",
  "#A855F7",
  "#9333EA",
  "#8B5CF6",
  "#7C3AED",
  "#A855F7",
];

export default function PredictionTrend() {

  const total = data.reduce(
      (sum, item) => sum + item.predictions,
      0
  );

  return (
      <div className="flex h-full flex-col">

          <div className="mb-4 flex items-center justify-between">

              <div>

                  <h4 className="text-white text-base font-semibold">
                      Weekly Activity
                  </h4>

                  <p className="text-sm text-zinc-400">
                      Total Predictions
                  </p>

              </div>

              <div className="rounded-xl bg-purple-600/20 px-4 py-2">

                  <p className="text-2xl font-bold text-purple-400">
                      {total}
                  </p>

              </div>

          </div>

          <div className="flex-1">

              <ResponsiveContainer
                  width="100%"
                  height="100%"
              >

                  <BarChart
                      data={data}
                  >

                      <XAxis
                          dataKey="day"
                          tick={{
                              fill: "#A1A1AA",
                              fontSize: 12,
                          }}
                          axisLine={false}
                          tickLine={false}
                      />

                      <Tooltip
                          cursor={{
                              fill: "rgba(139,92,246,.08)",
                          }}
                          contentStyle={{
                              background: "#18181B",
                              border: "1px solid #3F3F46",
                              borderRadius: 12,
                              color: "#fff",
                          }}
                      />

                      <Bar
                          dataKey="predictions"
                          radius={[8, 8, 0, 0]}
                      >
                          {data.map((entry, index) => (
                              <Cell
                                  key={index}
                                  fill={COLORS[index]}
                              />
                          ))}
                      </Bar>

                  </BarChart>

              </ResponsiveContainer>

          </div>

          <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-3">

              <p className="text-xs uppercase tracking-wider text-purple-300">
                  Insight
              </p>

              <p className="mt-1 text-sm text-zinc-200">
                  Thursday recorded the highest prediction activity this week.
              </p>

          </div>

      </div>
  );
}