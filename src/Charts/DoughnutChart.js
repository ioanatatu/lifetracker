import React from "react";
import Chart from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.defaults.global.defaultFontFamily = "DM Sans";

function DoughnutChart() {
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
                DoughnutThickness: 20,
            },
        ],
    };
    const options = {
        title: {
            display: true,
            text: "Amount of sleeping hours per week",
        },
        animation: { animateScale: true },
        legend: {
            display: false,
        },
    };
    return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
