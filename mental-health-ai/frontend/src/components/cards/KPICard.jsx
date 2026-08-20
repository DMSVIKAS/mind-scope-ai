import { motion } from "framer-motion";

const KPICard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}) => {
  const colors = {
    blue: {
      bg: "from-blue-500/20 to-blue-700/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      glow: "shadow-blue-500/10",
    },
    green: {
      bg: "from-green-500/20 to-green-700/10",
      border: "border-green-500/20",
      icon: "text-green-400",
      glow: "shadow-green-500/10",
    },
    red: {
      bg: "from-red-500/20 to-red-700/10",
      border: "border-red-500/20",
      icon: "text-red-400",
      glow: "shadow-red-500/10",
    },
    purple: {
      bg: "from-purple-500/20 to-purple-700/10",
      border: "border-purple-500/20",
      icon: "text-purple-400",
      glow: "shadow-purple-500/10",
    },
    orange: {
      bg: "from-orange-500/20 to-orange-700/10",
      border: "border-orange-500/20",
      icon: "text-orange-400",
      glow: "shadow-orange-500/10",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <motion.div
    
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      
      className={`
        group
        relative overflow-hidden
        rounded-2xl
        border
        ${theme.border}
        bg-gradient-to-br ${theme.bg}
        backdrop-blur-xl
        p-6
        shadow-xl
        ${theme.glow}
        transition-all duration-300
      `}
    >
      <div
  className={`
    absolute left-0 top-0 h-1 w-full
    bg-gradient-to-r ${theme.bg}
    opacity-80
  `}
/>
      {/* Decorative Circle */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
  <div
    className={`
      relative
      flex h-14 w-14 items-center justify-center
      rounded-2xl
      border border-white/10
      bg-zinc-900/70
      backdrop-blur-xl
      transition-all duration-300
      group-hover:scale-105
    `}
  >
    <div
      className={`
        absolute inset-0 rounded-2xl
        bg-gradient-to-br ${theme.bg}
        opacity-20
      `}
    />

    <Icon
      className={`relative h-7 w-7 ${theme.icon}`}
      strokeWidth={2}
    />
  </div>
)}
      </div>
    </motion.div>
  );
};

export default KPICard;