import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({lo}) => {
    
  const data = {
    labels: ['Incoming Call', 'Outgoing Call', 'Missed Call', 'Rejected Call'],
    series: [
      { name: 'First Interval', data: [lo] },
      { name: 'Second Interval', data: [lo] },
    ],
  };

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: data.labels,
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' calls';
        },
      },
    },
  };

  return <Chart options={options} series={data.series} type="bar" height={350} />;
};

export default BarChart;
