import Chart from "react-apexcharts";
import { motion } from "framer-motion";

const series = [68, 18, 9, 5];

const options = {
  chart: {
    type: "donut",
    background: "transparent",
  },

  theme: {
    mode: "dark",
  },

  labels: [
    "Positive",
    "Neutral",
    "Negative",
    "Stress",
  ],

  colors: [
    "#22C55E",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
  ],

  stroke: {
    width: 0,
  },

  legend: {
    position: "bottom",
    fontSize: "14px",
    labels: {
      colors: "#CFCFCF",
    },
    itemMargin: {
      vertical: 8,
    },
  },

  dataLabels: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      donut: {
        size: "72%",

        labels: {
          show: true,

          name: {
            show: true,
            color: "#A1A1AA",
            fontSize: "16px",
          },

          value: {
            show: true,
            color: "#FFFFFF",
            fontSize: "26px",
            fontWeight: 700,
            formatter: (val) => `${val}%`,
          },

          total: {
            show: true,
            label: "Overall",

            formatter: () => "Positive",

            color: "#FFFFFF",
            fontSize: "18px",
          },
        },
      },
    },
  },

  tooltip: {
    theme: "dark",

    y: {
      formatter: (val) => `${val}%`,
    },
  },
};

function EmotionDonutChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <Chart
        options={options}
        series={series}
        type="donut"
        height={360}
      />
    </motion.div>
  );
}

export default EmotionDonutChart;