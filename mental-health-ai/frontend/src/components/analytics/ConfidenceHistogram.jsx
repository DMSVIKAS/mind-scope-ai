import { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function ConfidenceHistogram() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/confidence")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));

    }, []);

    return (

        <div className="analytics-card">

            <div className="chart-header">
                <h3>Confidence Distribution</h3>
                <span>Prediction Confidence</span>
            </div>

            <ResponsiveContainer width="100%" height={260}>

                <BarChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#2A2A2A"
                    />

                    <XAxis
                        dataKey="range"
                        stroke="#9CA3AF"
                    />

                    <YAxis
                        allowDecimals={false}
                        stroke="#9CA3AF"
                    />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#8B5CF6"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );
}

export default ConfidenceHistogram;