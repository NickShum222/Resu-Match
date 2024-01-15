import React from "react";
import ReactApexChart from "react-apexcharts";

const ResumeUsageChart = ({ applied, interview, offer, rejected }) => {
  const dummyData = [
    {
      name: "Fall2023Resume.pdf",
      count: 24,
    },
    {
      name: "Fall2023ResumeUPDATED.pdf",
      count: 87,
    },
    {
      name: "Spring2023Resume.pdf",
      count: 13,
    },
    {
      name: "Winter2023Resume.pdf",
      count: 5,
    },
  ];
  //Pass in a resume object:
  /*
  [
    {
      name: Fall2023Resume.pdf,
      count: 24
    },
    {
      name: Fall2023ResumeUPDATED.pdf,
      count: 87
    },
    {
      name: Spring2023Resume.pdf,
      count: 13
    },
  ]
  */
  const series = dummyData.map((item) => item.count);
  const labels = dummyData.map((item) => item.name);
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
        if (val < 15) return "";
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
        shadeIntensity: -0.5,
      },
    },
    legend: {
      show: false,
    },
    // title: {
    //   text: "Job Status",
    //   align: "left",
    //   margin: 10,
    //   offsetX: 0,
    //   offsetY: 0,
    //   floating: false,
    //   style: {
    //     fontSize: "16px",
    //     fontWeight: "bold",
    //     color: "#ffffff",
    //   },
    // },
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
        height="325px"
      />
    </div>
  );
};

export default ResumeUsageChart;
