import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const recommendations = {
  Depression: [
    "Maintain a consistent sleep schedule.",
    "Talk to someone you trust.",
    "Consider seeking professional mental health support."
  ],

  Anxiety: [
    "Practice deep breathing exercises.",
    "Reduce caffeine intake.",
    "Take regular breaks during work or study."
  ],

  Stress: [
    "Exercise regularly.",
    "Break large tasks into smaller ones.",
    "Practice mindfulness for 10–15 minutes daily."
  ],

  Normal: [
    "Keep up your healthy routine.",
    "Stay physically active.",
    "Maintain strong social connections."
  ],

  Bipolar: [
    "Follow your treatment plan consistently.",
    "Maintain regular sleep patterns.",
    "Stay in touch with your healthcare provider."
  ],

  Personality: [
    "Practice self-awareness.",
    "Consider speaking with a mental health professional if needed.",
    "Develop healthy coping mechanisms."
  ],

  Suicidal: [
    "Please seek immediate help from someone you trust.",
    "Contact a mental health professional or emergency services.",
    "Remember that support is available and you don't have to face this alone."
  ]
};

function RecommendationCard({ prediction }) {
  if (!prediction) return null;

  const tips = recommendations[prediction] || [
    "Maintain a healthy lifestyle.",
    "Reach out for professional support if needed."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="text-yellow-400" />
            AI Recommendations
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3 text-zinc-300">
            {tips.map((tip, index) => (
              <li key={index}>
                • {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default RecommendationCard;