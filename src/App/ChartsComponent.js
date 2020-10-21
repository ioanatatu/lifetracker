import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import { useSelector, useDispatch } from "react-redux";
import { getActivityData } from "../Redux/actions";

const ChartsComponent = ({
    currentActivity,
    getIntervalFromChartsComponent,
}) => {
    //// set generic values to render if there is no currentActivity chosen
    let showNoActivityDataMessage = false;
    const dispatch = useDispatch();
    let activityData = useSelector((state) => state && state.activityData);
    let processedActivityData = {};

    console.log("currentActivity from ChartsComponent", currentActivity);
    console.log("activityData from ChartsComponent", activityData);
    if (activityData && activityData.length == 0) {
        console.log("activityData IS EMPTY!!!!!");
        showNoActivityDataMessage = true;
    }
    const daysOfWeek = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    let begin,
        end,
        beginLineColor,
        endLineColor,
        beginBgColor,
        color,
        barColor,
        gridLinesColor,
        labels,
        duration,
        notes,
        ticksMin,
        ticksMax,
        ticksStepSize;
    let interval = "current week";
    ////
    if (activityData && currentActivity != "intro") {
        processedActivityData = processActivityData(activityData, daysOfWeek);

        if (currentActivity == "sleep") {
            ticksMin = 0;
            ticksMax = 12;
            ticksStepSize = 1;
        } else if (currentActivity == "fasting") {
            ticksMin = 14;
            ticksMax = 24;
            ticksStepSize = 2;
        } else if (currentActivity == "exercise") {
            ticksMin = 0;
            ticksMax = 4;
            ticksStepSize = 0.5;
        }

        begin = processedActivityData.begin;
        end = processedActivityData.end;
        duration = processedActivityData.duration;
        labels = processedActivityData.labels;
        notes = processedActivityData.notes;

        beginLineColor = "rgb(0, 206, 209)";
        endLineColor = "#9E7EDF";
        beginBgColor = "rgba(0, 206, 209, 0.2)";
        color = "black";
        gridLinesColor = "#a7a7a7";
        barColor = ["pink", "SkyBlue", "Plum", "YellowGreen", "LightSalmon"];
    } else if (currentActivity == "intro") {
        showNoActivityDataMessage = false;
        begin = [6, 5, 8, 5, 8, 9, 12];
        end = [21, 22, 23, 22, 23.5, 24, 21];
        beginLineColor = "white";
        endLineColor = "white";
        beginBgColor = "rgba(255,255,255,0.3)";
        color = "white";
        barColor = "white";
        gridLinesColor = "white";
        labels = daysOfWeek;
        duration = end.map((night, i) => 24 - night + begin[i]);
        interval = "current week";
        notes = null;
        ticksMin = 0;
        ticksMax = 12;
        ticksStepSize = 1;
    }

    useEffect(() => {
        if (currentActivity != "intro")
            dispatch(getActivityData(currentActivity, "currentWeek"));
    }, [currentActivity]);

    return (
        <div className="charts-and-buttons-container" key={currentActivity}>
            <ul
                className={
                    !showNoActivityDataMessage && currentActivity != "intro"
                        ? "nav-buttons"
                        : "nav-buttons invisible"
                }
            >
                <li
                    onClick={() => {
                        if (currentActivity != "intro") {
                            dispatch(
                                getActivityData(currentActivity, "lastWeek")
                            );
                            getIntervalFromChartsComponent("lastWeek");
                        }
                        interval = "last week";
                    }}
                >
                    last week
                </li>
                <li
                    onClick={() => {
                        if (currentActivity != "intro") {
                            dispatch(
                                getActivityData(currentActivity, "currentWeek")
                            );
                            getIntervalFromChartsComponent("currentWeek");
                        }
                        interval = "current week";
                    }}
                >
                    current week
                </li>
                <li
                    onClick={() => {
                        if (currentActivity != "intro") {
                            dispatch(getActivityData(currentActivity, "month"));
                            getIntervalFromChartsComponent("currentMonth");
                        }
                        interval = "current month";
                    }}
                >
                    current month
                </li>
            </ul>
            {showNoActivityDataMessage && (
                <div className="no-data-message">
                    you have no data for {currentActivity}
                </div>
            )}

            {!showNoActivityDataMessage && (
                <div className="charts-wrapper">
                    <div className="line">
                        <LineChart
                            labels={labels}
                            begin={begin}
                            beginLineColor={beginLineColor}
                            beginBgColor={beginBgColor}
                            end={end}
                            color={color}
                            gridLinesColor={gridLinesColor}
                            interval={interval}
                            endLineColor={endLineColor}
                            notes={notes}
                        />
                    </div>

                    <div className="bar">
                        <BarChart
                            height={350}
                            duration={duration}
                            color={barColor}
                            gridLinesColor={gridLinesColor}
                            beginBgColor={beginBgColor}
                            labels={labels}
                            ticksStepSize={ticksStepSize}
                            ticksMin={ticksMin}
                            ticksMax={ticksMax}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartsComponent;

function processActivityData(activityData, daysOfWeek) {
    const processedActivityData = {
        begin: [],
        end: [],
        duration: [],
        labels: [],
        notes: [],
    };
    const daysOfW = daysOfWeek;
    const days = [];

    if (activityData.length > 7) {
        mapMonthDataOnObject(activityData, processedActivityData);
        console.log(processedActivityData);
    } else {
        activityData.forEach((day, i) => {
            processedActivityData.begin.push(convertDateToTime(day.begin_date));
            processedActivityData.end.push(convertDateToTime(day.end_date));
            days.push(formatDate(day.begin_date));
            processedActivityData.duration.push(
                Math.round(
                    (24 -
                        processedActivityData.end[i] +
                        processedActivityData.begin[i]) *
                        10
                ) / 10
            );
            processedActivityData.notes.push(activityData.notes);
        });

        processedActivityData.labels = daysOfW.map((d, i) => {
            return [d, days[i] ? days[i] : "not tracked"];
        });
    }

    return processedActivityData;
}
function convertDateToTime(day) {
    day = day.split("T")[1].split(".")[0].split(":");
    return Number(`${day[0]}.${day[1]}`) + 2;
}
function formatDate(date) {
    const dateArray = date.split("T")[0].split("-");

    let month;
    switch (dateArray[1]) {
        case "1":
            month = "January";
            break;
        case "10":
            month = "Oct";
            break;
        case "11":
            month = "November";
            break;
    }
    return `${dateArray[2]} ${month}`;
}
function mapMonthDataOnObject(a, obj) {
    const mapDayOfWeek = (day) => {
        switch (day) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 0:
                return "Sunday";
        }
    };

    const items = new Date(a[a.length - 1].end_date).getDate() + 1;
    const begin = new Array(items).fill(null);
    const end = new Array(items).fill(null);
    const notes = new Array(items).fill(null);
    const duration = new Array(items).fill(null);
    let labels = new Array(items).fill(null);

    for (let i = 0; i < a.length; i++) {
        let index = new Date(a[i].begin_date).getDate();

        begin[index] = convertDateToTime(a[i].begin_date).toFixed(1);
        end[index] = convertDateToTime(a[i].end_date).toFixed(1);
        notes[index] = a[i].notes;
        duration[index] = (
            24 -
            Number(convertDateToTime(a[i].end_date).toFixed(1)) +
            Number(convertDateToTime(a[i].begin_date).toFixed(1))
        ).toFixed(1);
        labels[index] = [
            mapDayOfWeek(new Date(a[i].begin_date).getDay()),
            formatDate(a[i].begin_date),
        ];
    }
    labels = labels.map((day) => (!day ? "not tracked" : day));

    begin.shift();
    end.shift();
    duration.shift();
    labels.shift();
    notes.shift();

    obj.begin = begin;
    obj.end = end;
    obj.duration = duration;
    obj.labels = labels;
    obj.notes = notes;
}
