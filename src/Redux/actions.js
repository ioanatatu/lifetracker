// import axios from "../helpers/axios";

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
