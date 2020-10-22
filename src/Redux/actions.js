import axios from "../helpers/axios";

export function addActivity(activity) {
    return {
        type: "ADD_ACTIVITY",
        newActivity: {
            name: activity,
            quality: {
                question: "How was your ${activity}?",
                values: [
                    "excellent",
                    "good and made progress",
                    "okay-ish",
                    "not happy with it",
                ],
            },
            difficulty: {
                question: "Was it hard?",
                values: [
                    "Easy and I had energy",
                    "Not easy but I had energy",
                    "Normal",
                    "Struggled",
                ],
            },
        },
    };
}
export function changeCurrentActivity(activity) {
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
                interval: interval, // interval property with 'currentWeek' / 'prevWeek' / 'month values'
            },
        });

        return {
            type: "GET_ACTIVITY_DATA",
            activityData: data.activityData,
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
