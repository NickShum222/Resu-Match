import React from "react";
import ReactApexChart from "react-apexcharts";

const TimelineChart = () => {
  const series = [
    {
      name: "Applied",
      data: [10, 23, 2, 4],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Job Applications Timeline - Past Month",
      aligh: "left",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr"],
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default TimelineChart;
