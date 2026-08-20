import Chart from "react-apexcharts";
import { motion } from "framer-motion";

const series = [
  {
    name: "Mood Score",
    data: [62, 68, 71, 76, 74, 82, 88],
  },
];

const options = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    background: "transparent",
  },

  theme: {
    mode: "dark",
  },

  stroke: {
    curve: "smooth",
    width: 3,
  },

  colors: ["#8B5CF6"],

  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      opacityFrom: 0.35,
      opacityTo: 0.02,
      stops: [0, 100],
    },
  },

  markers: {
    size: 5,
    strokeWidth: 2,
    strokeColors: "#18181B",
    hover: {
      size: 7,
    },
  },

  grid: {
    borderColor: "#27272A",
    strokeDashArray: 5,
  },

  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#A1A1AA",
      },
    },
  },

  yaxis: {
    min: 50,
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        colors: "#A1A1AA",
      },
    },
  },

  tooltip: {
    theme: "dark",
    y: {
      formatter: (value) => `${value}/100`,
    },
  },

  dataLabels: {
    enabled: false,
  },

  legend: {
    show: false,
  },
};

function MoodTrend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Chart
        options={options}
        series={series}
        type="area"
        height={330}
      />
    </motion.div>
  );
}

export default MoodTrend;