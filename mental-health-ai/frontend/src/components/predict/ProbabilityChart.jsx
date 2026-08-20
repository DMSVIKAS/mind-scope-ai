import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

function ProbabilityChart({ confidence }) {
  if (confidence === null || confidence === undefined) return null;

  const percent = (confidence * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">
            Prediction Confidence
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="w-full h-5 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-zinc-400">
            <span>0%</span>
            <span className="font-semibold text-white">
              {percent}%
            </span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProbabilityChart;