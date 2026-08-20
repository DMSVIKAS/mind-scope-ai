import {
    X,
    Brain,
    ShieldCheck,
    Clock,
    Calendar,
    Sparkles
} from "lucide-react";

export default function HistoryModal({

    open,
    onClose,
    prediction

}) {

    if (!open || !prediction) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-zinc-800 p-6">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Prediction Details
                        </h2>

                        <p className="mt-1 text-zinc-400">
                            Complete analysis of this prediction
                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-lg p-2 transition hover:bg-zinc-800"
                    >

                        <X className="text-white" />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-6">

                    {/* Input */}

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                        <p className="mb-2 text-sm text-zinc-500">

                            Input Text

                        </p>

                        <p className="leading-7 text-white">

                            {prediction.text}

                        </p>

                    </div>

                    {/* Grid */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                            <div className="flex items-center gap-3">

                                <Brain className="text-purple-400" />

                                <span className="text-zinc-400">

                                    Prediction

                                </span>

                            </div>

                            <h3 className="mt-4 text-3xl font-bold text-white">

                                {prediction.prediction}

                            </h3>

                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                            <div className="flex items-center gap-3">

                                <ShieldCheck className="text-green-400" />

                                <span className="text-zinc-400">

                                    Confidence

                                </span>

                            </div>

                            <h3 className="mt-4 text-3xl font-bold text-green-400">

                                {prediction.confidence}%

                            </h3>

                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                            <div className="flex items-center gap-3">

                                <Sparkles className="text-pink-400" />

                                <span className="text-zinc-400">

                                    Model

                                </span>

                            </div>

                            <h3 className="mt-4 text-2xl font-bold text-white">

                                {prediction.model}

                            </h3>

                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                            <div className="flex items-center gap-3">

                                <Calendar className="text-blue-400" />

                                <span className="text-zinc-400">

                                    Date

                                </span>

                            </div>

                            <h3 className="mt-4 text-xl text-white">

                                {prediction.date}

                            </h3>

                            <p className="mt-2 text-zinc-500">

                                {prediction.time}

                            </p>

                        </div>

                    </div>

                    {/* AI Recommendation */}

                    <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5">

                        <div className="mb-3 flex items-center gap-3">

                            <Clock className="text-purple-400" />

                            <h3 className="font-semibold text-purple-400">

                                AI Recommendation

                            </h3>

                        </div>

                        <p className="leading-7 text-zinc-300">

                            Based on this prediction, maintaining healthy sleep,
                            regular exercise, mindfulness, and talking to trusted
                            people can help improve emotional well-being. If symptoms
                            persist, consider consulting a licensed mental health
                            professional.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}