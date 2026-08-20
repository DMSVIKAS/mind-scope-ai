import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Moon,
  UserCircle2,
} from "lucide-react";

function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left Section */}
      <div>
        <p className="text-sm font-medium text-zinc-500">
          Dashboard
        </p>

        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
          Mental Health Analytics
        </h1>

        <p className="mt-2 text-zinc-400">
          AI-powered insights for mental health prediction and analysis.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-72
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/70
              py-3
              pl-12
              pr-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-violet-500
            "
          />
        </div>

        {/* Notification */}
        <button
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-zinc-800
            bg-zinc-900
            transition
            hover:border-violet-500
            hover:text-violet-400
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* Theme */}
        <button
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            border border-zinc-800
            bg-zinc-900
            transition
            hover:border-violet-500
            hover:text-violet-400
          "
        >
          <Moon className="h-5 w-5" />
        </button>

        {/* Profile */}
        <button
          className="
            flex items-center gap-3
            rounded-xl
            border border-zinc-800
            bg-zinc-900
            px-3
            py-2
            transition
            hover:border-violet-500
          "
        >
          <UserCircle2 className="h-8 w-8 text-violet-400" />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-white">
              Vikas
            </p>

            <p className="text-xs text-zinc-500">
              AI Engineer
            </p>
          </div>
        </button>

      </div>
    </motion.header>
  );
}

export default DashboardHeader;