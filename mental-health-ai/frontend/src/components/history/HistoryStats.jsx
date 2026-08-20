import { useEffect, useState } from "react";
import {
    Brain,
    Activity,
    ShieldCheck,
    Database,
    TrendingUp
} from "lucide-react";

import { getHistoryStats } from "../../services/historyService";

export default function HistoryStats() {

    const [stats, setStats] = useState({
        total_predictions: 0,
        today_predictions: 0,
        average_confidence: 0,
        most_used_model: "-"
    });

    const loadStats = async () => {

        try {

            const data = await getHistoryStats();

            setStats(data);

        }

        catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadStats();

        const interval = setInterval(loadStats, 3000);

        return () => clearInterval(interval);

    }, []);

    const cards = [

        {
            title: "Total Predictions",
            value: stats.total_predictions,
            icon: Brain,
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },

        {
            title: "Today's Predictions",
            value: stats.today_predictions,
            icon: Activity,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },

        {
            title: "Average Confidence",
            value: `${stats.average_confidence}%`,
            icon: ShieldCheck,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },

        {
            title: "Most Used Model",
            value: stats.most_used_model,
            icon: Database,
            color: "text-pink-400",
            bg: "bg-pink-500/10"
        }

    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-purple-500/30"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-zinc-400">

                                    {card.title}

                                </p>

                                <h2 className="mt-2 text-4xl font-bold text-white">

                                    {card.value}

                                </h2>

                            </div>

                            <div className={`rounded-xl p-4 ${card.bg}`}>

                                <Icon
                                    size={30}
                                    className={card.color}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}