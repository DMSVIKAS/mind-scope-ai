import { AnimatePresence, motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  Brain,
  Target,
  X,
  Lightbulb,
  Calendar,
  ShieldAlert,
  RotateCcw,
  Download,
} from "lucide-react";

function PredictionModal({
  open,
  onClose,
  prediction,
  confidence,
  model,
}) {
  if (!open) return null;

  const percent = confidence
    ? (confidence * 100).toFixed(2)
    : "0.00";

  const confidenceValue = Number(percent);

  let confidenceText = "Moderate Confidence";

  if (confidenceValue >= 95)
    confidenceText = "Excellent Confidence";
  else if (confidenceValue >= 85)
    confidenceText = "Very High Confidence";
  else if (confidenceValue >= 70)
    confidenceText = "High Confidence";

  const badges = {
    Normal: {
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      emoji: "🟢",
    },
    Depression: {
      color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
      emoji: "🟣",
    },
    Anxiety: {
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      emoji: "🟡",
    },
    Stress: {
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      emoji: "🟠",
    },
    Bipolar: {
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      emoji: "🔵",
    },
    Personality: {
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      emoji: "🟤",
    },
    Suicidal: {
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      emoji: "🔴",
    },
  };

  const current =
    badges[prediction] || {
      color: "bg-zinc-700 text-white border-zinc-600",
      emoji: "⚪",
    };

  const recommendations = {
    Depression: [
      "Maintain a consistent sleep schedule.",
      "Talk to someone you trust.",
      "Seek professional support.",
    ],
    Anxiety: [
      "Practice deep breathing.",
      "Reduce caffeine intake.",
      "Take regular breaks.",
    ],
    Stress: [
      "Exercise regularly.",
      "Practice mindfulness.",
      "Maintain work-life balance.",
    ],
    Normal: [
      "Keep up your healthy routine.",
      "Stay physically active.",
      "Maintain social connections.",
    ],
    Bipolar: [
      "Maintain a regular routine.",
      "Follow treatment plans.",
      "Stay connected with your doctor.",
    ],
    Personality: [
      "Practice self-awareness.",
      "Develop healthy coping skills.",
      "Seek guidance if required.",
    ],
    Suicidal: [
      "Seek immediate professional help.",
      "Reach out to someone you trust.",
      "Contact emergency services if needed.",
    ],
  };

  const tips =
    recommendations[prediction] || [
      "Maintain a healthy lifestyle.",
    ];
    const downloadReport = () => {
        const doc = new jsPDF();
      
        doc.setFontSize(22);
        doc.text("MindScope AI Report", 20, 20);
      
        doc.setFontSize(12);
      
        doc.text(`Prediction: ${prediction}`, 20, 40);
        doc.text(`Confidence: ${percent}%`, 20, 50);
        doc.text(`Confidence Level: ${confidenceText}`, 20, 60);
        doc.text(`Model: ${model}`, 20, 70);
      
        doc.text("Recommendations:", 20, 90);
      
        let y = 100;
      
        tips.forEach((tip) => {
          doc.text(`• ${tip}`, 25, y);
          y += 10;
        });
      
        y += 15;
      
        doc.text(
          "Disclaimer:",
          20,
          y
        );
      
        y += 10;
      
        const disclaimer =
          "This AI report is for educational purposes only and is not a medical diagnosis.";
      
        const lines = doc.splitTextToSize(disclaimer, 170);
      
        doc.text(lines, 20, y);
      
        doc.save("MindScope_Report.pdf");
      };
      const modelNames = {
        logistic_regression: "Logistic Regression",
        random_forest: "Random Forest",
        svm: "Support Vector Machine (SVM)",
        xgboost: "XGBoost",
        lightgbm: "LightGBM",
      };
      
      const displayModel = modelNames[model] || model;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-[0_0_60px_rgba(139,92,246,0.25)]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-zinc-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center">

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 6, -6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Brain
                  className="mx-auto mb-4 text-violet-500"
                  size={60}
                />
              </motion.div>

              <h1 className="text-4xl font-bold text-white">
                MindScope AI Report
              </h1>

              <p className="mt-2 text-zinc-400">
                Analysis completed successfully
              </p>

            </div>

            {/* Two-column layout */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">

              {/* Left */}
              <div className="rounded-2xl bg-zinc-800/70 p-6">

                <p className="text-zinc-400">
                  Mental Health Status
                </p>

                <div
                  className={`mt-4 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xl font-bold ${current.color}`}
                >
                  {current.emoji} {prediction}
                </div>

                <div className="mt-8">

                  <div className="mb-2 flex items-center gap-2 text-white">
                    <Target size={18} />
                    Confidence
                  </div>

                  <div className="h-4 rounded-full bg-zinc-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-3xl font-bold text-white">
                      {percent}%
                    </p>

                    <p className="text-green-400 text-sm">
                      {confidenceText}
                    </p>
                  </div>

                </div>

              </div>

              {/* Right */}
              <div className="rounded-2xl bg-zinc-800/70 p-6">

                <div className="mb-4 flex items-center gap-2 text-white">
                  <Lightbulb
                    className="text-yellow-400"
                    size={20}
                  />
                  AI Recommendations
                </div>

                <ul className="space-y-3 text-zinc-300">
                  {tips.map((tip, index) => (
                    <li key={index}>
                      • {tip}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-zinc-700 pt-5">

                  <div className="mb-3 flex items-center gap-2 text-zinc-400">
                    <Calendar size={16} />
                    {new Date().toLocaleString()}
                  </div>

                  <div className="text-zinc-400">
                    Model :
                    <span className="ml-2 font-semibold text-white">
                      {displayModel}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5">

              <div className="mb-2 flex items-center gap-2 font-semibold text-yellow-300">
                <ShieldAlert size={18} />
                Disclaimer
              </div>

              <p className="text-sm text-yellow-100">
                This AI prediction is intended for educational purposes only
                and should not be considered a medical diagnosis. Please seek
                advice from a qualified mental health professional if you are
                experiencing emotional distress.
              </p>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="flex items-center gap-2 rounded-xl bg-zinc-700 px-6 py-3 text-white hover:bg-zinc-600"
              >
                <RotateCcw size={18} />
                Analyze Again
              </button>

              <button
  onClick={downloadReport}
  className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
>
                Download Report
              </button>

              <button
                onClick={onClose}
                className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-700"
              >
                Close
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PredictionModal;