import { useEffect, useState } from "react";

import TextInputCard from "../components/predict/TextInputCard";
import FileUploadCard from "../components/predict/FileUploadCard";
import AnalyzeButton from "../components/predict/AnalyzeButton";
import LoadingModal from "../components/predict/LoadingModal";
import PredictionModal from "../components/predict/PredictionModal";

import loadingStages from "../data/loadingStages";

import api from "../services/Api";

function Predict() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState("xgboost");

  const [loading, setLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const [resultOpen, setResultOpen] = useState(false);


  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setPrediction(null);
    setConfidence(null);
    setResultOpen(false);

    setCurrentStage(0);
    setLoading(true);

    try {
      const response = await api.post("/predict-text", {
        text,
        model_name: selectedModel,
      });

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (err) {
      console.error(err);

      setLoading(false);

      alert("Prediction failed.");
    }
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= loadingStages.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            setLoading(false);

            if (prediction) {
              setResultOpen(true);
            }
          }, 800);

          return prev;
        }

        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [loading, prediction]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          🧠 AI Sentiment Analysis
        </h1>

        <p className="mt-2 text-zinc-400">
          Analyze mental health sentiment using AI.
        </p>
      </div>

      {/* Input Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TextInputCard
          text={text}
          setText={setText}
        />

        <FileUploadCard
          file={file}
          setFile={setFile}
          setText={setText}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-800"></div>

        <span className="text-sm uppercase tracking-[0.4em] text-zinc-500">
          OR
        </span>

        <div className="h-px flex-1 bg-zinc-800"></div>
      </div>

      {/* Analyze Button */}
      <AnalyzeButton
        disabled={!text.trim()}
        loading={loading}
        onClick={handleAnalyze}
      />
      <div className="mb-6">
  <label className="mb-2 block text-sm font-medium text-zinc-300">
    Select AI Model
  </label>

  <select
    value={selectedModel}
    onChange={(e) => setSelectedModel(e.target.value)}
    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
  >
    <option value="logistic_regression">Logistic Regression</option>
    <option value="random_forest">Random Forest</option>
    <option value="svm">Support Vector Machine (SVM)</option>
    <option value="xgboost">XGBoost</option>
    <option value="lightgbm">LightGBM</option>
  </select>
</div>

      {/* Loading Popup */}
      <LoadingModal
        open={loading}
        stages={loadingStages}
        currentStage={currentStage}
      />

      {/* Prediction Popup */}
      <PredictionModal
  open={resultOpen}
  onClose={() => setResultOpen(false)}
  prediction={prediction}
  confidence={confidence}
  model={selectedModel}
/>
    </div>
  );
}

export default Predict;