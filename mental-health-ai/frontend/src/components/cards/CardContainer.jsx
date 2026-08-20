import { motion } from "framer-motion";

function CardContainer({
  title,
  subtitle,
  actions,
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        shadow-lg
        p-6
        ${className}
      `}
    >
      {(title || subtitle || actions) && (
        <div className="mb-5 flex items-start justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      {children}
    </motion.div>
  );
}

export default CardContainer;