import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import CardContainer from "../../components/cards/CardContainer";

const series = [
  {
    name: "Probability",
    data: [91, 5, 2, 2],
  },
];

const options = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    background: "transparent",
    foreColor: "#CFCFCF",
  },

  theme: {
    mode: "dark",
  },

  plotOptions: {
    bar: {
      borderRadius: 12,
      distributed: true,
      columnWidth: "55%",
    },
  },

  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },

  colors: [
    "#EF4444",
    "#F59E0B",
    "#3B82F6",
    "#22C55E",
  ],

  dataLabels: {
    enabled: true,
    formatter: (val) => `${val}%`,
    style: {
      fontSize: "12px",
      fontWeight: 600,
    },
  },

  xaxis: {
    categories: [
      "Depression",
      "Anxiety",
      "Stress",
      "Normal",
    ],
    labels: {
      style: {
        colors: "#CFCFCF",
        fontSize: "13px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },

  yaxis: {
    max: 100,
    tickAmount: 5,
    labels: {
      formatter: (val) => `${val}%`,
      style: {
        colors: "#CFCFCF",
      },
    },
  },

  grid: {
    borderColor: "#363636",
    strokeDashArray: 4,
  },

  tooltip: {
    theme: "dark",
    y: {
      formatter: (val) => `${val}%`,
    },
  },

  legend: {
    show: false,
  },
};

function ProbabilityBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <CardContainer
        title="Probability Distribution"
        subtitle="Predicted probability for each mental health class"
        actions={
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-400">
            Demo Data
          </span>
        }
      >
        <Chart
          options={options}
          series={series}
          type="bar"
          height={320}
        />
      </CardContainer>
    </motion.div>
  );
}

export default ProbabilityBarChart;