import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ begin, end, color }) {
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
                label: "wake up time",
                data: begin,
                backgroundColor: "rgba(0,0,0,0)",
                pointBackgroudColor: color,
                pointBorderColor: color,
                borderColor: color,
            },
            {
                label: "going to sleep time",
                data: end,
                backgroundColor: "rgba(0,0,0,0)",
                pointBackgroudColor: color,
                pointBorderColor: color,
                borderColor: color,
            },
        ],
    };
    const options = {
        title: {
            display: true,
            text: "Amount of sleeping hours per week",
        },
        scales: {
            yAxes: [
                {
                    ticks: { min: 0, max: 24, stepSize: 1 },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                    },
                },
            ],
        },
    };
    return <Line data={data} options={options} />;
}

export default LineChart;
