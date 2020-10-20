import axios from "../helpers/axios";

export function addActivity(activity) {
    return {
        type: "ADD_ACTIVITY",
        newActivity: { name: activity },
    };
}
export function changeCurrentActivity(activity) {
    console.log("currentActivity from actions ", activity);
    return {
        type: "CHANGE_CURRENT_ACTIVITY",
        currentActivity: activity,
    };
}
export async function getActivityData(currentActivity, interval) {
    // interval = currentWeek, lastWeek, month
    try {
        const { data } = await axios.get("/api/activity-data", {
            params: {
                activity: currentActivity,
                begin: getDayCurrentWeek("first"),
                end: getDayCurrentWeek("last"),
                interval: interval, // interval property with currentWeek / prevWeek / month values
            },
        });
        // here make data 'pretty'
        console.log("------ data from axios req ", data);
        const begin = [];
        const end = [];
        const days = [];
        data.activityData.forEach((day) => {
            begin.push(convertDateToTime(day.begin_date));
            end.push(convertDateToTime(day.end_date));
            days.push(formatDate(day.begin_date));
        });
        console.log("\n\n");
        console.log(begin);
        console.log(end);
        console.log(days);
        console.log("\n\n");

        const activityData = {
            begin: begin,
            end: end,
            day: days,
        };

        return {
            type: "GET_ACTIVITY_DATA",
            activityData: activityData,
        };
    } catch (err) {
        console.log(err);
    }
}
export function newActivityEntry(activity) {
    console.log("####___## from actions ", activity);
    return {
        type: "NEW_ACTIVITY_ENTRY",
        activity: activity,
    };
}

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

function convertDateToTime(day) {
    day = day.split("T")[1].split(".")[0].split(":");
    return Number(`${day[0]}.${day[1]}`) + 2;
}
function formatDate(date) {
    const dateArray = date.split("T")[0].split("-");
    console.log(date.split("T")[0].split("-"));

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
    console.log(month);
    return `${dateArray[2]} ${month}`;
}
