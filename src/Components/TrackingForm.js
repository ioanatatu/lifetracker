import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import axios from "../helpers/axios";

const TrackingForm = ({ isVisible, activity }) => {
    let dbResult = false; // hardcoded to test defaultValue in the input field

    const [style, setStyle] = useState({
        transform: "translateX(200px)",
        transition: "transform .5s",
    });
    const color = {
        color: "grey",
    };

    const { register, handleSubmit, errors } = useForm();

    const currentActivity = useSelector(
        (state) => state && state.currentActivity
    );

    getDefaultTime();

    useEffect(() => {
        setStyle({
            transform: "translateX(0px)",
            transition: "transform .5s",
        });
        // axios request to get data for TODAY
        // populate the input fields with default values or entry from db
        return () => {
            setStyle({
                transform: "translateX(0)",
                transition: "transform .5s",
            });
        };
    }, []);

    const onSubmit = async function (inputData) {
        inputData.activity = currentActivity;

        if (inputData.activity) {
            // if I don't choose an activity, inputData.activity == undefined
            try {
                const { data } = await axios.post(
                    "/api/add-activity",
                    inputData
                );
                if (data.success) location.replace("/");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="time-form-wrapper" style={style}>
            <div className="question">What do you want to track today?</div>
            <div
                className={
                    currentActivity
                        ? "activity-name"
                        : "activity-name placeholder"
                }
            >
                {currentActivity ? currentActivity : "..."}
            </div>
            <div className="day">{getToday()}</div>
            {dbResult && (
                <p className="message">you have no entries for today</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="tracking-form">
                <input
                    type="date"
                    name="date"
                    min="2020-01-01"
                    max="2020-12-31"
                    ref={register}
                    defaultValue={getDefaultDate()}
                ></input>

                <input
                    type="time"
                    name="begin_time"
                    ref={register}
                    defaultValue={dbResult ? "00:00" : getDefaultTime()}
                />

                <select name="quality" ref={register}>
                    <option value="" selected>
                        how did you sleep?
                    </option>
                    <option value="3">like a baby</option>
                    <option value="2">good</option>
                    <option value="1">meh</option>
                    <option value="0">tossing and turning</option>
                </select>
                <select name="dreams" ref={register}>
                    <option value="">did you dream?</option>
                    <option value="3">many and wonderful</option>
                    <option value="2">had a few</option>
                    <option value="1">I don't remember</option>
                    <option value="0">bad dreams</option>
                </select>

                <button>add notes</button>
                <textarea name="notes" ref={register}></textarea>

                <input
                    type="time"
                    name="end_time"
                    ref={register}
                    defaultValue={dbResult ? "00:00" : getDefaultTime()}
                />
                <input type="submit" />
            </form>
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
