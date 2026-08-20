import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
    FiActivity,
    FiCalendar,
    FiTarget,
    FiClock,
    FiAward
} from "react-icons/fi";

function AnalyticsCards() {

    const [summary, setSummary] = useState(null);

    useEffect(() => {
        loadSummary();
    }, []);

    const loadSummary = async () => {
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/analytics/summary"
            );

            setSummary(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    if (!summary) return null;

    const cards = [
        {
            title: "Total Predictions",
            value: summary.total_predictions,
            icon: <FiActivity />
        },
        {
            title: "Today's Predictions",
            value: summary.today_predictions,
            icon: <FiCalendar />
        },
        {
            title: "Avg Confidence",
            value: (summary.average_confidence * 100).toFixed(1),
            suffix: "%",
            icon: <FiTarget />
        },
        {
            title: "Response Time",
            value: summary.average_response_time,
            suffix: " ms",
            icon: <FiClock />
        },
        {
            title: "Best Model",
            value: summary.best_model.toUpperCase(),
            icon: <FiAward />,
            text: true
        }
    ];

    return (
        <div className="analytics-cards">

            {cards.map((card, index) => (

                <div className="kpi-card" key={index}>

                    <div className="kpi-icon">
                        {card.icon}
                    </div>

                    <div>

                        <p>{card.title}</p>

                        <h2>

                            {card.text ? (

                                card.value

                            ) : (

                                <>
                                    <CountUp
                                        end={card.value}
                                        duration={1.5}
                                    />
                                    {card.suffix}
                                </>

                            )}

                        </h2>

                    </div>

                </div>

            ))}

        </div>
    );

}

export default AnalyticsCards;