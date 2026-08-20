import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function CardContainer({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-zinc-800/80",
        "bg-zinc-950/70 backdrop-blur-xl",
        "shadow-lg transition-all duration-300",
        "hover:border-zinc-700 hover:shadow-2xl",
        className
      )}
    >
      {/* Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
      </div>

      {(title || subtitle || action) && (
        <div className="relative flex items-start justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            {title && (
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}

      <div className="relative p-6">
        {children}
      </div>
    </motion.section>
  );
}

export default CardContainer;