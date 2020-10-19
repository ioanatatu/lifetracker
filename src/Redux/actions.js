// import axios from "../helpers/axios";

export async function addActivity(activity) {
    return {
        type: "ADD_ACTIVITY",
        newActivity: { name: activity },
    };
}
