import { useEffect, useState } from "react";
import axios from "axios";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function ConfidenceTrend() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/confidence-trend")
            .then(res => setData(res.data))
            .catch(console.error);

    }, []);

    return (

        <div className="analytics-card">

            <div className="chart-header">

                <h3>Confidence Trend</h3>

                <span>Prediction Confidence</span>

            </div>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="date"/>

                    <YAxis
                        domain={[0,100]}
                    />

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="confidence"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ r:5 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ConfidenceTrend;