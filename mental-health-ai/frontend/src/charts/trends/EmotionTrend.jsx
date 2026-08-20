import { Smile } from "lucide-react";

const emotions = [
  { name: "Happy", value: 48, color: "#8B5CF6", emoji: "😊" },
  { name: "Normal", value: 27, color: "#3B82F6", emoji: "😐" },
  { name: "Anxiety", value: 11, color: "#F59E0B", emoji: "😟" },
  { name: "Stress", value: 7, color: "#EF4444", emoji: "😣" },
  { name: "Depression", value: 5, color: "#EC4899", emoji: "😔" },
  { name: "Bipolar", value: 2, color: "#10B981", emoji: "🙂" },
];

const timeline = ["😊", "😊", "😐", "😔", "😊", "😄", "😊"];

export default function EmotionTrend() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-semibold text-white">
            Emotion Trend
          </h4>

          <p className="mt-1 text-sm text-zinc-400">
            Emotional distribution over time
          </p>
        </div>

        <div className="rounded-xl bg-purple-500/10 p-3">
          <Smile
            size={24}
            className="text-purple-400"
          />
        </div>
      </div>

      {/* Current Emotion */}
      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Current Emotion
        </p>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-5xl">😊</span>

          <div>
            <h2 className="text-3xl font-bold text-white">
              Happy
            </h2>

            <p className="text-sm text-zinc-400">
              Positive emotional state
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <p className="mb-3 text-sm text-zinc-400">
          Recent Emotion Timeline
        </p>

        <div className="flex justify-between rounded-xl bg-zinc-900 p-4">
          {timeline.map((item, index) => (
            <span
              key={index}
              className="text-3xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Distribution */}
      <div className="space-y-4">
        {emotions.map((emotion) => (
          <div key={emotion.name}>
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-white">
                {emotion.emoji} {emotion.name}
              </span>

              <span className="text-sm text-zinc-400">
                {emotion.value}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${emotion.value}%`,
                  background: emotion.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}