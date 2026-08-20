import { useEffect, useState } from "react";
import axios from "axios";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function PredictionTimeline() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/timeline")
            .then((res) => {

                const formatted = res.data.map((item) => ({
                    date: item.date,
                    count: item.count
                }));

                setData(formatted);
            })
            .catch((err) => console.error(err));

    }, []);

    return (
        <div className="analytics-card">

            <div className="chart-header">
                <h3>Prediction Timeline</h3>
                <span>Prediction History</span>
            </div>

            <ResponsiveContainer width="100%" height={260}>

                <LineChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#2A2A2A"
                    />

                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                    />

                    <YAxis
                        stroke="#9CA3AF"
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default PredictionTimeline;