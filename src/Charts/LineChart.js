import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({
    labels,
    begin,
    beginLineColor,
    beginBgColor,
    beginDotColor,
    end,
    endLineColor,
    color,
    gridLinesColor,
    interval,
    notes,
}) {
    console.log("_._._._._._._ ", begin);

    const data = {
        // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        labels: labels,
        datasets: [
            {
                label: "wake up time",
                data: begin,
                backgroundColor: beginBgColor,
                pointBackgroudColor: beginLineColor,
                pointBorderColor: beginLineColor, // change to this "#009699"
                borderColor: beginLineColor,
                borderWidth: 2,
            },
            {
                label: "going to sleep time",
                data: end,
                backgroundColor: "rgba(0,0,0,0)",
                pointBackgroudColor: color,
                pointBorderColor: color,
                borderColor: endLineColor,
                borderWidth: 2,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        title: {
            display: true,
            text: `Waking up and going to sleep times for ${interval}`,
            fontColor: color,
            fontSize: 16,
        },
        scales: {
            xAxes: [
                {
                    ticks: { display: true, fontColor: color },
                    gridLines: {
                        zeroLineColor: color,
                        display: true,
                        color: gridLinesColor,
                        drawBorder: true,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: { min: 0, max: 24, stepSize: 1, fontColor: color },
                    gridLines: {
                        zeroLineColor: color,
                        display: true,
                        color: gridLinesColor,
                        drawBorder: true,
                    },
                },
            ],
        },
        legend: {
            labels: {
                fontColor: color,
            },
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, notes) {
                    return tooltipItem.yLabel + "\n";
                },
            },
        },
    };
    return <Line data={data} options={options} />;
}

export default LineChart;
