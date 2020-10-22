import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({
    labels,
    duration,
    color,
    gridLinesColor,
    beginBgColor,
    ticksMin,
    ticksMax,
    ticksStepSize,
    currentActivity,
}) {
    let chartTitle = "";
    if (currentActivity == "sleep") {
        chartTitle = "Amount of sleeping hours";
    } else if (currentActivity == "fasting") {
        chartTitle = "Fasting duration";
    } else if (currentActivity == "exercise") {
        chartTitle = "Exercise duration";
    } else {
        chartTitle = `${currentActivity} routine`;
    }

    let barThickness = 25;
    if (labels && labels.length > 7) {
        barThickness = 12;
    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: "sleeping hours",
                data: duration,
                // backgroundColor: "pink",
                backgroundColor: beginBgColor,
                hoverBackgroundColor: ["hotPink", "DodgerBlue"],
                barThickness: barThickness,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: chartTitle,
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
