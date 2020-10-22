import React from "react";
import StatsCard from "../Components/StatCard";
import { useSelector } from "react-redux";

const StatsDisplay = () => {
    let activityData = useSelector((state) => state && state.activityData);
    let minWakeUp = {};
    let maxGoSleep = {};

    if (activityData) {
        minWakeUp = getMinWakeUpForStats(activityData);
        maxGoSleep = getMaxGoingToSleepForStats(activityData);
    }

    // useEffect(() => {
    //     if (activityData) {
    //     }
    // }, [activityData]);
    return (
        <div className="stats">
            {minWakeUp && (
                <React.Fragment>
                    <StatsCard
                        title={minWakeUp.title}
                        amount={minWakeUp.amount}
                        day={minWakeUp.day}
                        quality={minWakeUp.quality}
                        difficulty={minWakeUp.difficulty}
                        notes={minWakeUp.notes}
                    ></StatsCard>

                    <StatsCard
                        title={maxGoSleep.title}
                        amount={maxGoSleep.amount}
                        day={maxGoSleep.day}
                        quality={maxGoSleep.quality}
                        difficulty={maxGoSleep.difficulty}
                        notes={maxGoSleep.notes}
                    ></StatsCard>
                </React.Fragment>
            )}
        </div>
    );
};
export default StatsDisplay;
/*
 *
 *
 *
 *
 * helper functions
 */
const mapDayOfWeek = (day) => {
    switch (day) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 0:
            return "Sunday";
    }
};
function getMinWakeUpForStats(a) {
    if (a && a.length > 0) {
        let min = 0;
        for (let i = 1; i < a.length; i++) {
            if (
                a[min].begin_date.substring(11, 16) >
                a[i].begin_date.substring(11, 16)
            ) {
                min = i;
            }
        }

        let wakeUp = a[min].begin_date.substring(11, 16);
        let hour = wakeUp.split(":")[0];
        hour = Number(hour) + 2;
        if (hour < 10) {
            hour = "0" + hour;
        }
        wakeUp = hour + ":" + wakeUp.split(":")[1];

        const statsCardData = {
            title: "min",
            subtitle: "Earliest wake-up time",
            amount: wakeUp,
            day: mapDayOfWeek(new Date(a[min].begin_date).getDay()),
            quality: mapQualityOnSleep(a[min].activity_type),
            difficulty: mapDifficultyOnSleep(a[min].difficulty),
            notes: a[min].notes || "no notes",
        };
        return statsCardData;
    } else {
        return null;
    }
}
function getMaxGoingToSleepForStats(a) {
    if (a && a.length > 0) {
        let max = 0;
        for (let i = 1; i < a.length; i++) {
            if (
                a[max].end_date.substring(11, 16) <
                a[i].end_date.substring(11, 16)
            ) {
                max = i;
            }
        }

        let goToSleep = a[max].end_date.substring(11, 16);
        let hour = goToSleep.split(":")[0];
        hour = Number(hour) + 2;
        if (hour < 10) {
            hour = "0" + hour;
        }
        goToSleep = hour + ":" + goToSleep.split(":")[1];

        const statsCardData = {
            title: "max",
            subtitle: "Lates goint to sleep time",
            amount: goToSleep,
            day: mapDayOfWeek(new Date(a[max].end_date).getDay()),
            quality: mapQualityOnSleep(a[max].activity_type),
            difficulty: mapDifficultyOnSleep(a[max].difficulty),
            notes: a[max].notes || "no notes",
        };
        return statsCardData;
    } else {
        return null;
    }
}
function mapQualityOnSleep(num) {
    switch (num) {
        case 0:
            return "like a baby";
        case 1:
            return "good";
        case 2:
            return "meh";
        case 3:
            return "tossing and turning";
        case -1:
            return "not tracked";
    }
}
function mapDifficultyOnSleep(num) {
    switch (num) {
        case 0:
            return "many and wonderful";
        case 1:
            return "had a few";
        case 2:
            return "I don't remember";
        case 3:
            return "bad dreams";
        case -1:
            return "not tracked";
    }
}
// console.log(getMinWakeUpForStats(a));
// console.log(getMaxGoingToSleepForStats(a));

// function mapQualityOnFasting() {}
// function mapQualityOnExercise() {}
