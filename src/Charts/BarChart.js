import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({
    duration,
    color,
    gridLinesColor,
    ticksMin,
    ticksMax,
    ticksStepSize,
}) {
    const data = {
        labels: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ],
        datasets: [
            {
                label: "sleeping hours",
                data: duration,
                // backgroundColor: "pink",
                backgroundColor: color,
                hoverBackgroundColor: ["hotPink", "DodgerBlue"],
                barThickness: 25,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: "Amount of sleeping hours",
            fontColor: color,
            fontSize: 16,
        },
        scales: {
            xAxes: [
                {
                    ticks: { display: true, fontColor: color },
                    gridLines: {
                        zeroLineColor: color,
                        display: false,
                        drawBorder: false,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        min: ticksMin,
                        max: ticksMax,
                        stepSize: ticksStepSize,
                        fontColor: color,
                    },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        zeroLineColor: color,
                        color: gridLinesColor,
                    },
                },
            ],
        },
        legend: {
            labels: {
                fontColor: color,
            },
        },
    };
    return <Bar data={data} options={options} />;
}

export default BarChart;
