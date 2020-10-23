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
    currentActivity,
}) {
    let chartTitle = "";
    if (currentActivity == "sleep") {
        chartTitle = `Waking up and going to sleep times for ${interval}`;
    } else if (currentActivity == "fasting") {
        chartTitle = `Fasting periods for ${interval}`;
    } else if (currentActivity == "exercise") {
        chartTitle = `Exercise times and duration for ${interval}`;
    } else {
        chartTitle = `${currentActivity} routine for ${interval}`;
    }

    const data = {
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
                        display: true,
                        color: gridLinesColor,
                        drawBorder: true,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 24,
                        stepSize: 1,
                        fontColor: color,
                    },
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
            custom: function (tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    console.log("ööööö___", tooltipItem, "and data\n", data);
                    var label =
                        data.datasets[tooltipItem.datasetIndex].label || "";

                    let notesWithLines = notes.map((currentNote) => {
                        let i = 0;
                        let j = 0;
                        let notesInLines = currentNote.split(" ");
                        let newArray = [];

                        while (i < notesInLines.length) {
                            for (let n = 0; n < 8; n++) {
                                newArray[j] =
                                    newArray[j] + " " + notesInLines[i];
                                i++;
                            }
                            j++;
                        }

                        return newArray.map((note) => {
                            return note.substr(9);
                        });
                    });

                    return [
                        data.datasets[0].label + ": " + tooltipItem.value,
                        " 🗯 ",
                        "NOTES: " + notesWithLines[tooltipItem.index][0] || "",
                        notesWithLines[tooltipItem.index][1] || "",
                        notesWithLines[tooltipItem.index][2] || "",
                    ];
                },
            },
        },
    };
    return <Line data={data} options={options} />;
}

export default LineChart;
