const activities = [
    {
        name: "sleep",
        quality: {
            question: "How did you sleep?",
            values: ["like a baby", "good", "meh", "tossing and turning"],
        },
        difficulty: {
            question: "Did you dream?",
            values: [
                "many and wonderful",
                "had a few",
                "I don't remember",
                "bad dreams",
            ],
        },
    },
    {
        name: "fasting",
        quality: {
            question: "What type of fast?",
            values: [
                "juice-fasting",
                "with coffee",
                "with tea",
                "just plain water",
            ],
        },
        difficulty: {
            question: "How did you feel?",
            values: [
                "energy and clarity",
                "good",
                "low energy",
                "I had head aches",
            ],
        },
    },
    {
        name: "exercise",
        quality: {
            question: "How did you train?",
            values: ["weights", "cardio", "stretching", "outdoors"],
        },
        difficulty: {
            question: "How did you feel?",
            values: [
                "like a superhero",
                "I made progress",
                "low energy",
                "no progress at all",
            ],
        },
    },
];

export default function reducer(state = { activities: activities }, action) {
    switch (action.type) {
        case "ADD_USER":
            console.log("___________USER NAME IS BEING ADDED", action.user);
            state = Object.assign({}, state, {
                user: action.user,
            });
            break;

        case "LOAD_ACTIVITIES":
            state = Object.assign({}, state, {
                activities: [...state.activities],
            });
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
            state = Object.assign({}, state, {
                activityData: [...state.activityData, action.activity],
            });
            break;
    }
    return state;
}
