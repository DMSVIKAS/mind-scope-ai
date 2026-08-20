import { Link, useLocation } from "react-router-dom";
import {
  BrainCircuit,
  LayoutDashboard,
  ChartColumn,
  GitCompareArrows,
  History,
  CircleHelp,
  Sparkles,
  UserCircle2,
} from "lucide-react";

const mainMenu = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Predict",
    path: "/predict",
    icon: BrainCircuit,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: ChartColumn,
  },
  {
    title: "Compare Models",
    path: "/compare",
    icon: GitCompareArrows,
  },
];

const generalMenu = [
  {
    title: "History",
    path: "/history",
    icon: History,
  },
  {
    title: "About",
    path: "/about",
    icon: CircleHelp,
  },
];

function MenuSection({ title, items, pathname }) {
  return (
    <div>
      <p className="mb-3 px-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        {title}
      </p>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`
                  mx-2 flex items-center gap-4 rounded-2xl
                  px-5 py-4
                  transition-all duration-300

                  ${
                    active
                      ? "border border-violet-500/20 bg-gradient-to-r from-violet-500/20 to-violet-500/5 shadow-lg shadow-violet-500/10"
                      : "hover:bg-zinc-900/80"
                  }
                `}
              >
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center rounded-xl
                    transition-all duration-300

                    ${
                      active
                        ? "bg-violet-500/15 text-violet-400"
                        : "bg-zinc-900 text-zinc-500"
                    }
                  `}
                >
                  <Icon
                    className="h-[22px] w-[22px]"
                    strokeWidth={2.2}
                  />
                </div>

                <span
                  className={`
                    text-base font-semibold tracking-tight

                    ${
                      active
                        ? "text-white"
                        : "text-zinc-400"
                    }
                  `}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();

  return (
    <aside
    className="
      flex
      w-[280px]
      flex-col
      border-r
      border-zinc-800
      bg-[#09090B]
      shrink-0
    "
  >
      {/* Logo */}

      <div className="px-8 pt-8 pb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">

            <Sparkles
              className="h-7 w-7 text-violet-400"
              strokeWidth={2.2}
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              MindScope AI
            </h1>

            <p className="text-sm text-zinc-500">
              Mental Health Analytics
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

<div className="flex-1  pt-8">

<MenuSection
  title="Main"
  items={mainMenu}
  pathname={location.pathname}
/>

<div className="mt-12" />

<MenuSection
  title="General"
  items={generalMenu}
  pathname={location.pathname}
/>

</div>
      {/* Profile */}

      <div className="p-5">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">

          <div className="flex items-center gap-3">

            <UserCircle2
              className="h-10 w-10 text-violet-400"
              strokeWidth={2}
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

      </div>

    </aside>
  );
}

export default Sidebar;