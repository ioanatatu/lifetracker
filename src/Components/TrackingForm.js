import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { newActivityEntry } from "../Redux/actions";

import axios from "../helpers/axios";

const TrackingForm = ({ currentInterval }) => {
    const dispatch = useDispatch();
    let dbResult = false; // hardcoded to test defaultValue in the input field
    const activityData = useSelector((state) => state && state.activityData);
    console.log("activityData from TrackingForm", activityData);

    const [style, setStyle] = useState({
        transform: "translateX(200px)",
        transition: "transform .5s",
    });

    const { register, handleSubmit } = useForm();

    const currentActivity = useSelector(
        (state) => state && state.currentActivity
    );

    getDefaultTime();

    useEffect(() => {
        setStyle({
            transform: "translateX(0px)",
            transition: "transform .5s",
        });
        return () => {
            setStyle({
                transform: "translateX(0)",
                transition: "transform .5s",
            });
        };
    }, []);

    const onSubmit = async function (inputData) {
        inputData.activity = currentActivity.name;
        inputData.interval = currentInterval;

        if (inputData.activity) {
            // if I don't choose an activity, inputData.activity == undefined
            try {
                const { data } = await axios.post(
                    "/api/add-activity",
                    inputData
                );
                if (Object.keys(data).length !== 0) {
                    dispatch(newActivityEntry(data));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div
            className={
                !currentActivity || currentActivity == "intro"
                    ? "time-form-wrapper white"
                    : "time-form-wrapper"
            }
            style={style}
        >
            <div className="question">What do you want to track today?</div>
            <div
                className={
                    !currentActivity || currentActivity == "intro"
                        ? "activity-name placeholder"
                        : "activity-name"
                }
            >
                {!currentActivity || currentActivity == "intro"
                    ? "activity"
                    : currentActivity.name}
            </div>
            <div className="day">{getToday()}</div>
            {dbResult && (
                <p className="message">you have no entries for today</p>
            )}
            {currentActivity && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="tracking-form"
                >
                    <input
                        type="date"
                        name="date"
                        min="2020-11-01"
                        max="2021-12-31"
                        ref={register}
                        defaultValue={getDefaultDate()}
                    ></input>

                    <p className="tracking-form__time">
                        {titleBasedOnCurrentActivity(currentActivity.name)[0]}
                    </p>
                    <input
                        className="tracking-form__time-input"
                        type="time"
                        name="begin_time"
                        ref={register}
                        defaultValue={dbResult ? "00:00" : getDefaultTime()}
                    />
                    <select name="quality" ref={register}>
                        <option value="-1">
                            {currentActivity.quality
                                ? currentActivity.quality.question
                                : ""}
                        </option>
                        {mapStateArrayToHtml(currentActivity.quality)}
                    </select>
                    <select name="difficulty" ref={register}>
                        <option value="-1">
                            {currentActivity.difficulty
                                ? currentActivity.difficulty.question
                                : ""}
                        </option>
                        {mapStateArrayToHtml(currentActivity.difficulty)}
                    </select>
                    <textarea
                        defaultValue="add notes..."
                        name="notes"
                        ref={register}
                    ></textarea>

                    <p className="tracking-form__time">
                        {titleBasedOnCurrentActivity(currentActivity.name)[1]}
                    </p>
                    <input
                        type="time"
                        name="end_time"
                        ref={register}
                        defaultValue={dbResult ? "00:00" : getDefaultTime()}
                    />
                    <input
                        className="tracking-form__submit-button"
                        type="submit"
                        value="submit"
                    />
                </form>
            )}
        </div>
    );
};

export default TrackingForm;
/*
 *
 *
 *
 *
 * helper functions
 */
const getDefaultDate = () => {
    var today = new Date();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(1);

    return `${today.getFullYear()}-${month}-${day}`;
};
const getDefaultTime = () => {
    var now = new Date();
    let hour = now.getHours();
    let mins = now.getMinutes();

    return `${hour}:${mins}`;
};
const getToday = () => {
    var now = new Date();
    switch (now.getDay()) {
        case 0:
            return "Sunday";
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
    }
};
function mapStateArrayToHtml(array) {
    if (array) {
        let i = array.values.length - 1;
        return array.values.map((el, index) => {
            return (
                <option value={i - index} key={index.toString()}>
                    {el}
                </option>
            );
        });
    } else {
        return;
    }
}
const titleBasedOnCurrentActivity = (title) => {
    return title == "sleep"
        ? ["wake-up time", "to sleep time"]
        : ["start", "end"];
};
