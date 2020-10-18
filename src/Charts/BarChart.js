import React from "react";
import Chart from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.defaults.global.defaultFontFamily = "'Courier', sans-serif";
// Chart.defaults.global.elements.line.tension = 0; // this one removes smoothness from lines

function BarChart() {
    const data = {
        labels: [
            "monday",
            "tuesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ],
        datasets: [
            {
                label: "sleeping hours",
                data: [8, 2, 6, 7, 9, 6, 7],
                // backgroundColor: "pink",
                backgroundColor: [
                    "pink",
                    "SkyBlue",
                    "Plum",
                    "YellowGreen",
                    "LightSalmon",
                ],
                hoverBackgroundColor: ["hotPink", "DodgerBlue"],
                barThickness: 20,
            },
        ],
    };
    const options = {
        title: {
            display: true,
            text: "Amount of sleeping hours per week",
        },
        scales: {
            xAxes: [
                {
                    ticks: { display: false },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: { min: 0, max: 12, stepSize: 1 },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                    },
                },
            ],
        },
    };
    return <Bar data={data} options={options} />;
}

export default BarChart;
