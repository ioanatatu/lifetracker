import React, { useEffect } from "react";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";

const ChartsComponent = ({ activity, view }) => {
    // these values will come from the db
    const begin = [6, 5, 7, 5.5, 6.5, 5, 6];
    const end = [23, 24, 23.5, 22.5, 23.5, 23];
    const duration = [];

    end.forEach((item, i) => {
        duration.push(24 - item + begin[i]);
    });

    useEffect(() => {
        // based on the activity the component makes an axios request to get the data from the db
        // it will watch for changes in the view to get weekly view or monthly view
    }, []);
    return (
        <div className="activity-container">
            <ul className="nav-buttons">
                <li>add data</li>
                <li>add data</li>
            </ul>
            <div className="sleep">
                <div className="line">
                    <LineChart begin={begin} end={end} />
                </div>

                <div className="bar-don-wrapper">
                    <div className="bar">
                        <BarChart duration={duration} />
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
