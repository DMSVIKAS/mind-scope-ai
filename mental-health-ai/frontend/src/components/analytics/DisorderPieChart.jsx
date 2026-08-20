import { useEffect, useState } from "react";
import axios from "axios";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#8B5CF6",
    "#A855F7",
    "#C084FC",
    "#7C3AED",
    "#9333EA",
    "#6D28D9",
    "#DDD6FE"
];

function DisorderPieChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/analytics/disorders")
            .then(res => setData(res.data))
            .catch(console.error);

    }, []);

    return (

        <div className="analytics-card">

            <div className="chart-header">
                <h3>Disorder Distribution</h3>
                <span>Prediction Breakdown</span>
            </div>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="40%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        label={({ percent }) =>
                            `${(percent * 100).toFixed(0)}%`
                        }
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[index % COLORS.length]
                                    }
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DisorderPieChart;