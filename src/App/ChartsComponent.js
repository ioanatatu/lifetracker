import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";
import { useSelector, useDispatch } from "react-redux";
import { getActivityData } from "../Redux/actions";

const ChartsComponent = ({ currentActivity, view }) => {
    const dispatch = useDispatch();
    let begin, end, duration, color, barColor;
    // const [labels, setLabels] = useState();

    const activityData = useSelector((state) => state && state.activityData);
    console.log("activitydata____", activityData);

    const showChart = !(!activityData || activityData.length == 0);
    console.log(showChart);

    if (!currentActivity) {
        // these values will come from the db
        begin = [6, 5, 7, 5.5, 6.5, 5, 6];
        end = [22, 21.5, 21.5, 22, 23, 21];
        duration = [];
        color = "white";
        barColor = "white";
    } else {
        color = "rgb(148, 214, 214)";
        begin = [6, 5, 7, 5.5, 6.5, 5, 6];
        end = [23, 24, 23.5, 22.5, 23.5, 23];
        duration = [];
        barColor = ["pink", "SkyBlue", "Plum", "YellowGreen", "LightSalmon"];
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

    let labels = [];

    if (activityData) {
        labels = daysOfWeek.map((d, i) => {
            return [
                d,
                activityData.day[i] ? activityData.day[i] : "not tracked",
            ];
        });
    }

    end.forEach((item, i) => {
        duration.push(24 - item + begin[i]);
    });

    useEffect(() => {
        if (currentActivity)
            dispatch(getActivityData(currentActivity, "currentWeek"));
        // it will watch for changes in the view to get weekly view or monthly view
    }, [currentActivity]);
    return (
        <div className="activity-container" key={currentActivity}>
            <ul
                className={
                    showChart && currentActivity
                        ? "nav-buttons"
                        : "nav-buttons invisible"
                }
            >
                <li
                    onClick={() => {
                        currentActivity
                            ? dispatch(
                                  getActivityData(currentActivity, "lastWeek")
                              )
                            : "";
                    }}
                >
                    last week
                </li>
                <li
                    onClick={() => {
                        currentActivity
                            ? dispatch(
                                  getActivityData(
                                      currentActivity,
                                      "currentWeek"
                                  )
                              )
                            : "";
                    }}
                >
                    current week
                </li>
                <li
                    onClick={() => {
                        currentActivity
                            ? dispatch(
                                  getActivityData(currentActivity, "month")
                              )
                            : "";
                    }}
                >
                    current month
                </li>
            </ul>
            <div className="sleep">
                {!showChart && !currentActivity && (
                    <div className="line">
                        <LineChart begin={begin} end={end} color={color} />
                    </div>
                )}
                {activityData && activityData.length == 0 && (
                    <div className="no-data-message">
                        you have no data for {currentActivity}
                    </div>
                )}
                {showChart && (
                    <React.Fragment>
                        <div className="line">
                            <LineChart
                                labels={labels}
                                begin={begin}
                                end={end}
                                color={color}
                            />
                        </div>

                        <div className="bar-don-wrapper">
                            <div className="bar">
                                <BarChart
                                    duration={duration}
                                    color={barColor}
                                />
                            </div>

                            <div className="doughnut">
                                <DoughnutChart />
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default ChartsComponent;

const getDayCurrentWeek = (day) => {
    if (day == "first") {
        function getMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
            return new Date(d.setDate(diff));
        }
        let monday = JSON.stringify(getMonday(new Date()));
        return monday.substring(1, monday.length - 1).split("T")[0];
    } else if (day == "last") {
        function getSunday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -1 : 7); // adjust when day is sunday
            return new Date(d.setDate(diff));
        }

        let sunday = JSON.stringify(getSunday(new Date()));

        return sunday.substring(1, sunday.length - 1).split("T")[0];
    }
};
getDayCurrentWeek("first");
getDayCurrentWeek("last");
