import { BrainCircuit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function AnalyzeButton({
  disabled,
  loading,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex justify-center"
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        size="lg"
        className="
        h-14
        w-[320px]
        rounded-xl
        bg-gradient-to-r
        from-violet-600
        to-indigo-600
        text-lg
        font-semibold
        shadow-lg
        hover:scale-105
        hover:shadow-violet-500/40
        transition-all
        duration-300
        "
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <BrainCircuit className="mr-2 h-5 w-5" />
            Analyze Sentiment
          </>
        )}
      </Button>
    </motion.div>
  );
}

export default AnalyzeButton;