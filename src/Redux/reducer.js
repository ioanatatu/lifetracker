const activities = [
    { name: "sleep" },
    { name: "fasting" },
    { name: "exercise" },
];

export default function reducer(state = { activities: activities }, action) {
    switch (action.type) {
        case "LOAD_ACTIVITIES":
            state = Object.assign({}, state, {
                activities: [...state.activities],
            });
            console.log(state.activities);
            break;

        case "ADD_ACTIVITY":
            state = Object.assign({}, state, {
                activities: [...state.activities],
            });
            return {
                ...state,
                activities: [...state.activities, action.newActivity],
            };
        case "CHANGE_CURRENT_ACTIVITY":
            state = Object.assign({}, state, {
                currentActivity: action.currentActivity,
            });
            break;
        case "GET_ACTIVITY_DATA":
            state = Object.assign({}, state, {
                activityData: action.activityData,
            });
            break;
        case "NEW_ACTIVITY_ENTRY":
            console.log("####___## from REDUCER ", action.activity);

            state = Object.assign({}, state, {
                activityData: [...state.activityData, action.activity],
            });
            break;
    }
    return state;
}
