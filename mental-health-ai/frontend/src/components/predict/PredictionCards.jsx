import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Cpu } from "lucide-react";
import { motion } from "framer-motion";

function PredictionCards({ prediction, confidence, model }) {
  if (!prediction) return null;

  const confidencePercent = (confidence * 100).toFixed(2);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <Brain className="text-violet-400 mb-3" size={28} />
          <p className="text-zinc-400 text-sm">Prediction</p>
          <h2 className="text-2xl font-bold text-white">
            {prediction}
          </h2>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <Target className="text-green-400 mb-3" size={28} />
          <p className="text-zinc-400 text-sm">Confidence</p>
          <h2 className="text-2xl font-bold text-white">
            {confidencePercent}%
          </h2>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <Cpu className="text-blue-400 mb-3" size={28} />
          <p className="text-zinc-400 text-sm">Model Used</p>
          <h2 className="text-xl font-bold text-white">
            {model}
          </h2>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PredictionCards;