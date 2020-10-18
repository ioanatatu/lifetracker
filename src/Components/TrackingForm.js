import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TrackingForm = () => {
    const [inputTime, setInputTime] = useState("");
    const { register, handleSubmit, errors } = useForm();
    const [todaysDate, setTodaysDate] = useState("");

    const onSubmit = async function (inputData) {
        console.log(inputData);
    };
    let today = getDefaultDate();
    // setTodaysDate(today);
    console.log(today);
    console.log(today);

    return (
        <div className="time-form-wrapper">
            <h4>SLEEP</h4>
            <div className="day">Today</div>
            <form onSubmit={handleSubmit(onSubmit)} className="tracking-form">
                <input
                    type="date"
                    name="date"
                    min="2020-01-01"
                    max="2020-12-31"
                    ref={register}
                    defaultValue={today}
                    // defaultValue={getDefaultDate()}
                ></input>
                <input type="time" name="begin_time" ref={register} />
                <select name="quality" ref={register}>
                    <option value="3">like a baby</option>
                    <option value="2">good</option>
                    <option value="1">meh</option>
                    <option value="0">tossing and turning</option>
                </select>
                <select name="dreams" ref={register}>
                    <option value="3">many and wonderful</option>
                    <option value="2">had a few</option>
                    <option value="1">I don't remember</option>
                    <option value="0">bad dreams</option>
                </select>
                <button>add notes</button>
                <textarea name="notes" ref={register}></textarea>
                <input type="time" name="end_time" ref={register} />
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
