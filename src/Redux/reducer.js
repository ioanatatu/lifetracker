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
    }
    return state;
}
