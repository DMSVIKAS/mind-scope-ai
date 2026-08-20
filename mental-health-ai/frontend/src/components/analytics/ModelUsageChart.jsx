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

function ModelUsageChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/models")
            .then(res => setData(res.data))
            .catch(console.error);

    }, []);

    return (

        <div className="analytics-card">

            <h3>Model Usage</h3>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="model" />

                    <YAxis />

                    <Tooltip />

                    <Bar
    dataKey="count"
    fill="#8B5CF6"
    radius={[8, 8, 0, 0]}
/>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ModelUsageChart;