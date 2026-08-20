import { useEffect, useState } from "react";
import axios from "axios";

function AIHealthCard() {

    const [health, setHealth] = useState(null);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/health")
            .then((res) => setHealth(res.data))
            .catch(console.error);

    }, []);

    if (!health) {

        return (
            <div className="analytics-card">
                <h3>AI Health</h3>
                <p style={{ color: "#9CA3AF" }}>Loading...</p>
            </div>
        );

    }

    return (

        <div className="analytics-card">

            <h3>AI Health</h3>

            <div className="health-score">
                {health.health_score}
            </div>

            <div
                className={
                    health.status === "Healthy"
                        ? "health-status healthy"
                        : "health-status offline"
                }
            >
                {health.status}
            </div>

            <div className="health-info">

                <div className="health-row">
                    <span>Models Loaded</span>
                    <strong>{health.models_loaded}</strong>
                </div>

                <div className="health-row">
                    <span>Avg Confidence</span>
                    <strong>{health.avg_confidence}%</strong>
                </div>

                <div className="health-row">
                    <span>Response Time</span>
                    <strong>{health.response_time} ms</strong>
                </div>

                <div className="health-row">
                    <span>Best Model</span>
                    <strong>{health.best_model}</strong>
                </div>

            </div>

        </div>

    );

}

export default AIHealthCard;