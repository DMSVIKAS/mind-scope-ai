import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, CheckCircle2, Loader2 } from "lucide-react";

function LoadingModal({ open, stages, currentStage }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <BrainCircuit className="h-16 w-16 text-violet-400 animate-pulse" />

              <h2 className="mt-4 text-3xl font-bold text-white">
                MindScope AI
              </h2>

              <p className="mt-2 text-zinc-400">
                Analyzing your text...
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex items-center gap-3"
                >
                  {index < currentStage ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : index === currentStage ? (
                    <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-zinc-600" />
                  )}

                  <span
                    className={
                      index <= currentStage
                        ? "text-white"
                        : "text-zinc-500"
                    }
                  >
                    {stage.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className="h-full bg-violet-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStage + 1) / stages.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingModal;