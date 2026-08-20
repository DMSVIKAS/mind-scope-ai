import AnalyticsCards from "../components/analytics/AnalyticsCards.jsx";
import PredictionTimeline from "../components/analytics/PredictionTimeline.jsx";
import AIHealthCard from "../components/analytics/AIHealthCard.jsx";
import DisorderPieChart from "../components/analytics/DisorderPieChart.jsx";
import ConfidenceHistogram from "../components/analytics/ConfidenceHistogram.jsx";
import ModelUsageChart from "../components/analytics/ModelUsageChart.jsx";
import ConfidenceTrend from "../components/analytics/ConfidenceTrend.jsx";
import AIInsights from "../components/analytics/AIInsights.jsx";
import RecentPredictions from "../components/analytics/RecentPredictions.jsx";

import "../styles/analytics.css";

function Analytics() {
    return (
        <div className="analytics-page">

            <div className="analytics-header">
                <h1>Analytics Dashboard</h1>
                <span className="live-badge">🟢 LIVE</span>
            </div>

            <AnalyticsCards />

            <div className="analytics-grid two-column">
                <PredictionTimeline />
                <AIHealthCard />
            </div>

            <div className="analytics-grid two-column">
                <DisorderPieChart />
                <ConfidenceHistogram />
            </div>

            <div className="analytics-grid two-column">
                <ModelUsageChart />
                <ConfidenceTrend />
            </div>


        </div>
    );
}

export default Analytics;