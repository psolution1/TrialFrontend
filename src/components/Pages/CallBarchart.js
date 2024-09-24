import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    scales,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the necessary components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels // Register the datalabels plugin
);

// Sample data for the bar chart with multiple datasets
const data = {
    labels: ['Amit', 'Dinesh', 'Ramesh', 'Anil', 'Shubhash', 'Chirag', 'Umesh'],
    datasets: [
        {
            label: 'Incoming Call',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#10cb40',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: 'Outgoing Call',
            data: [75, 69, 70, 91, 66, 65, 50],
            backgroundColor: '#fc9605',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        },
        {
            label: 'Miss Call',
            data: [85, 79, 90, 71, 76, 75, 60],
            backgroundColor: '#fc0505',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        },
        {
            label: 'Rejected Call',
            data: [95, 89, 100, 81, 86, 85, 70],
            backgroundColor: '#eb7575',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

// Options for the bar chart with horizontal bars and data labels
const options = {
    indexAxis: 'y', // This makes the bars horizontal
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Calling Data By Today',
        },
        datalabels: {
            anchor: 'end',
            align: 'end',
            color: 'black',
            font: {
                weight: 'bold',
                size: 12,
            },
            formatter: (value) => value,
        },
    },
    scales:{
        x:{
            stacked:true,
        },
        y:{
            stacked:true,
        }
    }
};

export default function CallBarchart() {
    return (
        <div>
            {/* <h2>Bar Chart Example</h2> */}
            <Bar data={data} options={options} />
        </div>
    );
}
