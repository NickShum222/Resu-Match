import React from "react";
import ReactApexChart from "react-apexcharts";

const JobStatusPieChart = ({ applied, interview, offer, rejected }) => {
  const series = [applied, interview, offer, rejected];
  const labels = ["Applied", "Interview", "Offer", "Rejected"];
  const options = {
    chart: {
      foreColor: "#fff",
      width: "100%",
      background: "#252525",
    },
    labels: labels,
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value.toFixed(2)}%`;
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        if (val < 5) return "";
        return opts.w.globals.labels[opts.seriesIndex];
      },
    },
    stroke: {
      width: 1,
    },
    theme: {
      mode: "dark",
      monochrome: {
        enabled: true,
        color: "#252525",
        shadeTo: "dark",
        shadeIntensity: 0.5,
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="300px"
      />
    </div>
  );
};

export default JobStatusPieChart;
