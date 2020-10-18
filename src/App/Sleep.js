import React from "react";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";

const Sleep = () => {
    return (
        <div className="sleep">
            <div className="chart">
                <LineChart />
            </div>

            <div className="bar-don-wrapper">
                <div className="bar">
                    <BarChart />
                </div>

                <div className="doughnut">
                    <DoughnutChart />
                </div>
            </div>
        </div>
    );
};

export default Sleep;
