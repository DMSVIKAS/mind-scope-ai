import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, Moon, Sun, UserCircle2 } from "lucide-react";

function Navbar() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      setDarkMode(true);
    } else {
      document.documentElement.classList.add("light");
      setDarkMode(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-xl px-8 py-5"
    >
      {/* Left */}

      <div>
        <p className="text-sm text-zinc-500">Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          {greeting}, User 👋
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          AI-powered Mental Health Analytics Platform
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden lg:block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
          />
        </div>

        {/* Theme Toggle */}

        <button
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-violet-500 hover:text-violet-400"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2">
          <UserCircle2
            className="text-violet-400"
            size={36}
          />

          <div>
            <p className="text-sm font-semibold text-white">
              User
            </p>

            <p className="text-xs text-zinc-500">
              AI Engineer
            </p>
          </div>
        </div>

      </div>
    </motion.header>
  );
}

export default Navbar;