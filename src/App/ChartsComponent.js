import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";
import { useSelector, useDispatch } from "react-redux";
import { getActivityData } from "../Redux/actions";

const ChartsComponent = ({ currentActivity, view }) => {
    const dispatch = useDispatch();
    let begin, end, duration, color, barColor;

    if (!currentActivity) {
        // these values will come from the db
        begin = [6, 5, 7, 5.5, 6.5, 5, 6];
        end = [23, 24, 23.5, 22.5, 23.5, 23];
        duration = [];
        color = "rgb(154, 177, 177)";
        barColor = "rgb(154, 177, 177)";
    } else {
        color = "rgb(148, 214, 214)";
        begin = [6, 5, 7, 5.5, 6.5, 5, 6];
        end = [23, 24, 23.5, 22.5, 23.5, 23];
        duration = [];
        barColor = ["pink", "SkyBlue", "Plum", "YellowGreen", "LightSalmon"];
    }

    end.forEach((item, i) => {
        duration.push(24 - item + begin[i]);
    });

    useEffect(() => {
        console.log("_________axios req");
        dispatch();
        // based on the activity the component makes an axios request to get the data from the db
        // it will watch for changes in the view to get weekly view or monthly view
    }, [currentActivity]);
    return (
        <div className="activity-container" key={currentActivity}>
            <p>{currentActivity}</p>
            <ul className="nav-buttons">
                <li>add data</li>
                <li>add data</li>
            </ul>
            <div className="sleep">
                <div className="line">
                    <LineChart begin={begin} end={end} color={color} />
                </div>

                <div className="bar-don-wrapper">
                    <div className="bar">
                        <BarChart duration={duration} color={barColor} />
                    </div>

                    <div className="doughnut">
                        <DoughnutChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsComponent;
