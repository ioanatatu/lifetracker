import React from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
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
                label: "I met the pajarito",
                data: [3, 2, 3, 2, 1],
                backgroundColor: "SteelBlue",
                pointBackgroudColor: ["LightSalmon"],
                pointPorderColor: "hotpink",
            },
        ],
    };
    return <Line data={data} />;
}

export default LineChart;
