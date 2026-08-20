import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MoodTrend from "../../charts/trends/MoodTrend";
import PredictionTrend from "../../charts/trends/PredictionTrend";
import WellnessTrend from "../../charts/trends/WellnessTrend";
import ModelPerformanceTrend from "../../charts/trends/ModelPerformanceTrend";
import EmotionTrend from "../../charts/trends/EmotionTrend";

const charts = [
  {
    title: "Mood Trend",
    component: <MoodTrend />,
  },
  {
    title: "Prediction Trend",
    component: <PredictionTrend />,
  },
  {
    title: "Wellness Trend",
    component: <WellnessTrend />,
  },
  {
    title: "Model Performance",
    component: <ModelPerformanceTrend />,
  },
  {
    title: "Emotion Trend",
    component: <EmotionTrend />,
  },
];

export default function AnalyticsExplorer() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextChart = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % charts.length);
  };

  const prevChart = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + charts.length) % charts.length);
  };

  return (
    <div className="flex h-full flex-col">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            {charts[current].title}
          </h3>

          <p className="text-sm text-zinc-400">
            {current + 1} / {charts.length}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={prevChart}
            className="rounded-lg border border-zinc-700 bg-zinc-900 p-2 transition hover:border-purple-500 hover:bg-zinc-800"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={nextChart}
            className="rounded-lg border border-zinc-700 bg-zinc-900 p-2 transition hover:border-purple-500 hover:bg-zinc-800"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>

        </div>

      </div>

      {/* Chart */}

      <div className="flex-1">

        <AnimatePresence mode="wait">

          <motion.div
            key={current}
            initial={{
              opacity: 0,
              scale: 0.98,
              x: direction > 0 ? 40 : -40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              x: direction > 0 ? -40 : 40,
            }}
            transition={{
              duration: 0.35,
            }}
            className="h-full w-full"
          >
            {charts[current].component}
          </motion.div>

        </AnimatePresence>

      </div>

    </div>
  );
}