import ProbabilityBarChart from "../charts/probability/ProbabilityBarChart";
import CardContainer from "../components/cards/CardContainer";
import KPICard from "../components/cards/KPICard";
import EmotionDonutChart from "../charts/emotion/EmotionDonutChart";
import ConfidenceGauge from "../charts/gauges/ConfidenceGauge";
import AnalyticsExplorer from "../components/dashboard/AnalyticsExplorer";
import {
  Brain,
  Target,
  TriangleAlert,
  BarChart3,
  Heart,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <KPICard
          title="Prediction"
          value="Depression"
          subtitle="High Risk"
          icon={Brain}
          color="blue"
        />

        <KPICard
          title="Confidence"
          value="96.7%"
          subtitle="Very High"
          icon={Target}
          color="green"
        />

        <KPICard
          title="Risk"
          value="HIGH"
          subtitle="Immediate"
          icon={TriangleAlert}
          color="red"
        />

        <KPICard
          title="Accuracy"
          value="97.2%"
          subtitle="Random Forest"
          icon={BarChart3}
          color="orange"
        />

        <KPICard
          title="Wellness"
          value="24/100"
          subtitle="Needs Attention"
          icon={Heart}
          color="purple"
        />
      </div>

      {/* Analytics Grid */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ProbabilityBarChart />
        </div>

        <CardContainer
          title="Emotion Distribution"
          subtitle="Emotion breakdown from prediction"
          className="xl:col-span-4"
        >
          <EmotionDonutChart />
        </CardContainer>

        <CardContainer
          title="Analytics Explorer"
          subtitle="Explore different mental health analytics"
          className="xl:col-span-8"
        >
          <AnalyticsExplorer />
        </CardContainer>

        <CardContainer
          title="Confidence Gauge"
          subtitle="Prediction confidence"
          className="xl:col-span-4"
        >
          <ConfidenceGauge />
        </CardContainer>
      </div>
    </div>
  );
}

export default Dashboard;