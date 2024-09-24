import axios, { Axios } from 'axios';
import React, { useEffect ,useRef } from 'react';
import { useState } from 'react';
//import { LineChart, ComposedChart,Area, Line, Bar, Tooltip, CartesianGrid, XAxis, YAxis,Legend } from 'recharts';
import Chart from 'react-apexcharts'
import { useDispatch } from 'react-redux';
import { Doughnut } from "react-chartjs-2";

const ChartComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
     const [data,setdata]=useState([]);
     const chartRef = useRef(null);
     const getAllLeadSourceOverview=async ()=>{
      try {
        const responce = await axios.get(
          `${apiUrl}/Income_Graph_Overview`
        );
        setdata(responce?.data?.monthlyIncom);
    console.log('responce',responce)
        
      } catch (error) {
        console.log(error);
      }
    } 

   useEffect(() => {
    getAllLeadSourceOverview();
    handleResize(); // Call the function on initial render to set the correct chart width
    window.addEventListener('resize', handleResize); // Listen for window resize events
    return () => {
      window.removeEventListener('resize', handleResize); // Remove the event listener on component unmount
    };
  }, []);

  const handleResize = () => {
    if (chartRef.current && chartRef.current.chart && chartRef.current.parentElement) {
      const containerWidth = chartRef.current.parentElement.offsetWidth;
      chartRef.current.chart.width = containerWidth > 768 ? 1200 : containerWidth;
    }
  };
  const data1 = {
    labels: ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",],
    datasets: [
      {
        label: "Monthely Income",
        data: data,
        backgroundColor: ["#fc0505", "#9933ff", "#10cb40", "#eb7575", "#ff6600", "#3366cc", "#9933ff", "#fc9605", "#cc33ff", "#00cc66", "#00cc99", "#0099ff"],
        hoverOffset: 4, 
      },
    ],
  };
   
  return (
    <React.Fragment>
     <div className="map-maxwidth">
      <Chart
          type="bar"
          width={1200} // Initial width, will be adjusted dynamically
          height={400}
          series={[
            {
              name: "Income Monthly",
              data: data,
            },
          ]}
          options={{
            title: {
            //   text: "BarChar Developed by DevOps Team",
            //   style: { fontSize: 30 },
            },

            subtitle: {
            //   text: "This is BarChart Graph",
            //   style: { fontSize: 18 },
            },

            colors: ["#f90000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              title: {
                text: "Income Graph Monthly",
                style: { color: "#f90000", fontSize: 10 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#f90000"] },
              },
              title: {
                text: "Amount In (K)",
                style: { color: "#f90000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
        {/* <Doughnut data={data1} options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
              },
            },
          }} /> */}

        </div>
        
      
    </React.Fragment>
  );
};

export default ChartComponent;
