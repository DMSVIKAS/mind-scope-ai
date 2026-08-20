import { Search, Download, CalendarDays } from "lucide-react";

export default function HistoryFilters() {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

                {/* Search */}

                <div className="relative lg:col-span-4">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Search by text or prediction..."
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-3 pl-11 pr-4 text-white outline-none transition-all focus:border-purple-500"
                    />

                </div>

                {/* Model */}

                <select
                    className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-purple-500 lg:col-span-2"
                >
                    <option>All Models</option>
                    <option>Logistic Regression</option>
                    <option>Random Forest</option>
                    <option>SVM</option>
                    <option>LightGBM</option>
                    <option>XGBoost</option>
                </select>

                {/* Emotion */}

                <select
                    className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-purple-500 lg:col-span-2"
                >
                    <option>All Emotions</option>
                    <option>Normal</option>
                    <option>Happy</option>
                    <option>Stress</option>
                    <option>Anxiety</option>
                    <option>Depression</option>
                    <option>Bipolar</option>
                    <option>Suicidal</option>
                </select>

                {/* Date */}

                <div className="relative lg:col-span-2">

                    <CalendarDays
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="date"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-3 pl-11 pr-4 text-white outline-none transition focus:border-purple-500"
                    />

                </div>

                {/* Export */}

                <button
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 lg:col-span-2"
                >
                    <Download size={18} />
                    Export CSV
                </button>

            </div>

        </div>
    );
}