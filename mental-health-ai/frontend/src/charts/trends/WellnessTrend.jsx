import { Heart, TrendingUp } from "lucide-react";

export default function WellnessTrend() {
  const score = 86;
  const confidence = 91;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex h-full flex-col p-2">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h4 className="text-2xl font-semibold text-white">
            Wellness Score
          </h4>

          <p className="mt-1 text-sm text-zinc-400">
            Overall Mental Wellness
          </p>
        </div>

        <div className="rounded-xl bg-purple-500/10 p-3">
          <Heart className="text-purple-400" size={24} />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-between gap-8">

        {/* Left - Circular Gauge */}
        <div className="flex w-[42%] justify-center">

          <div className="relative">

            <svg width="170" height="170">

              <defs>
                <linearGradient
                  id="wellnessGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>

              {/* Background Circle */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                stroke="#27272A"
                strokeWidth="10"
                fill="none"
              />

              {/* Progress Circle */}
              <circle
                cx="85"
                cy="85"
                r={radius}
                stroke="url(#wellnessGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 85 85)"
              />

            </svg>

            {/* Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h1 className="text-5xl font-bold text-white">
                {score}
              </h1>

              <span className="text-lg text-zinc-500">
                /100
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex w-[58%] flex-col gap-5">

          {/* Confidence Card */}
          <div className="flex h-[150px] flex-col justify-center rounded-2xl border border-zinc-800 bg-zinc-900 px-6">

            <p className="text-xs uppercase tracking-[3px] text-zinc-500">
              Confidence
            </p>

            <h2 className="mt-2 text-5xl font-bold text-purple-400">
              {confidence}%
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Average prediction confidence
            </p>

          </div>

          {/* Status Card */}
          <div className="flex h-[150px] flex-col justify-center rounded-2xl border border-zinc-800 bg-zinc-900 px-6">

            <p className="text-xs uppercase tracking-[3px] text-zinc-500">
              Status
            </p>

            <div className="mt-2 flex items-center gap-3">

              <TrendingUp
                size={22}
                className="text-emerald-400"
              />

              <span className="text-4xl font-bold text-emerald-400">
                Stable
              </span>

            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Wellness improving
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}