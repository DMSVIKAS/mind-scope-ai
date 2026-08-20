import { motion } from "framer-motion";

const confidence = 96.7;

function ConfidenceGauge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex h-[360px] flex-col justify-center"
    >
      {/* Percentage */}
      <div className="text-center">
        <p className="text-5xl font-bold tracking-tight text-white">
          {confidence}%
        </p>

        <p className="mt-2 text-sm font-medium text-emerald-400">
          Excellent Confidence
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-12">
        <div className="relative h-4 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300"
          />
        </div>

        <div className="mt-3 flex justify-between text-xs font-medium text-zinc-500">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Model Status
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            Stable
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Reliability
          </p>

          <p className="mt-2 text-lg font-semibold text-emerald-400">
            High
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ConfidenceGauge;