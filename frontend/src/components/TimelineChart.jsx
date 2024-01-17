import React from "react";
import ReactApexChart from "react-apexcharts";

const TimelineChart = () => {
  function getLast30Days() {
    const currentDate = new Date();
    const last30Days = [];

    for (let i = 0; i < 30; i++) {
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - i);

      const month = previousDate.toLocaleString("default", { month: "short" });
      const day = previousDate.getDate();

      const formattedDate = `${month} ${day}`;
      last30Days.push(formattedDate);
    }

    return last30Days.reverse();
  }

  function generateRandomizedArray(length) {
    const randomizedArray = [];

    for (let i = 0; i < length; i++) {
      const randomValue = Math.floor(Math.random() * 21);
      randomizedArray.push(String(randomValue));
    }

    return randomizedArray;
  }
  const series = [
    {
      name: "Applied",
      data: generateRandomizedArray(30),
    },
  ];

  const options = {
    chart: {
      height: 320,
      type: "line",
      zoom: {
        enabled: false,
      },
      background: "#252525",
      foreColor: "#bfbfbf",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: getLast30Days(),
    },
    theme: {
      mode: "",
      monochrome: {
        enabled: true,
        color: "#5C67DE",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
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
