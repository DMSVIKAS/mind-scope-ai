import HistoryStats from "../components/history/HistoryStats";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryTable from "../components/history/HistoryTable";

export default function History() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-4xl font-bold text-white">
                    Prediction History
                </h1>

                <p className="mt-2 text-zinc-400">
                    View and manage all previous predictions.
                </p>
            </div>

            <HistoryStats />

            <HistoryFilters />

            <HistoryTable />

        </div>
    );
}