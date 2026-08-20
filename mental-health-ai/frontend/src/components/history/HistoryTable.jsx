import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import HistoryModal from "./HistoryModal";

import {
    getHistory,
    deleteHistory,
} from "../../services/historyService";

function badgeColor(prediction) {
    switch (prediction) {
        case "Normal":
            return "bg-green-500/20 text-green-400";

        case "Stress":
            return "bg-yellow-500/20 text-yellow-400";

        case "Anxiety":
            return "bg-orange-500/20 text-orange-400";

        case "Depression":
            return "bg-red-500/20 text-red-400";

        case "Suicidal":
            return "bg-red-700/20 text-red-500";

        case "Bipolar":
            return "bg-pink-500/20 text-pink-400";

        default:
            return "bg-zinc-700 text-white";
    }
}

export default function HistoryTable() {
    const [history, setHistory] = useState([]);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const loadHistory = async () => {
        try {
            const data = await getHistory();
            setHistory(data);
        } catch (err) {
            console.error("Error loading history:", err);
        }
    };

    useEffect(() => {
        loadHistory();

        const interval = setInterval(loadHistory, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleView = (prediction) => {
        setSelectedPrediction(prediction);
        setModalOpen(true);
    };

    const handleDelete = async (index) => {
        const confirmDelete = window.confirm(
            "Delete this prediction?"
        );

        if (!confirmDelete) return;

        try {
            await deleteHistory(index);
            await loadHistory();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-zinc-950">

                            <tr className="text-left text-sm text-zinc-400">

                                <th className="px-6 py-4">Date</th>

                                <th className="px-6 py-4">Model</th>

                                <th className="px-6 py-4">Input Text</th>

                                <th className="px-6 py-4">Prediction</th>

                                <th className="px-6 py-4">Confidence</th>

                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="py-10 text-center text-zinc-500"
                                    >
                                        No prediction history available.
                                    </td>

                                </tr>

                            ) : (

                                history.map((item, index) => (

                                    <tr
                                        key={index}
                                        className="border-t border-zinc-800 transition hover:bg-zinc-800/40"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="text-white">
                                                {item.date}
                                            </div>

                                            <div className="text-xs text-zinc-500">
                                                {item.time}
                                            </div>

                                        </td>

                                        <td className="px-6 py-5 font-semibold text-purple-400">
                                            {item.model}
                                        </td>

                                        <td className="max-w-sm px-6 py-5 text-zinc-300">

                                            <p className="truncate">
                                                {item.text}
                                            </p>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor(
                                                    item.prediction
                                                )}`}
                                            >
                                                {item.prediction}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="font-bold text-white">
                                                {Math.round(
                                                    (item.confidence || 0) * 100
                                                )}
                                                %
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleView(item)
                                                    }
                                                    className="rounded-lg bg-blue-500/10 p-2 transition hover:bg-blue-500/20"
                                                >
                                                    <Eye
                                                        size={18}
                                                        className="text-blue-400"
                                                    />
                                                </button>

                                               
                                                <button
                                                    onClick={() =>
                                                        handleDelete(index)
                                                    }
                                                    className="rounded-lg bg-red-500/10 p-2 transition hover:bg-red-500/20"
                                                >
                                                    <Trash2
                                                        size={18}
                                                        className="text-red-400"
                                                    />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <HistoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                prediction={selectedPrediction}
            />
        </>
    );
}