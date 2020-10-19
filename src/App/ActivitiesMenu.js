import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addActivity } from "../Redux/actions";

export default function ActivitiesMenu({ toggleTrackingForm }) {
    const dispatch = useDispatch();

    const [newActivityIsOpen, setNewActivityIsOpen] = useState(true);
    const [userInput, setUserInput] = useState("");

    const activities = useSelector((state) => state && state.activities);
    console.log(activities);

    // useEffect(() => {}, []);

    const handleClickAddActivityButton = () => {
        console.log("clicked add activity");
        setNewActivityIsOpen(!newActivityIsOpen);
    };
    const handleSubmitNewActivity = () => {
        console.log("submit");
    };
    const handleInputChange = (e) => {
        console.log(e.target.value);
        setUserInput(e.target.value);
    };

    return (
        <div className="activities-menu-and-button">
            <ul className="categories">
                {mapStateArrayToHtml(activities, toggleTrackingForm)}
            </ul>

            <div className="new-category">
                <div className="add-cat" onClick={handleClickAddActivityButton}>
                    <ion-icon name="add-outline"></ion-icon>
                </div>
                {newActivityIsOpen && (
                    <div>
                        <div
                            onClick={() => {
                                dispatch(addActivity(userInput));
                                handleSubmitNewActivity();
                            }}
                        >
                            submit
                        </div>
                        <input
                            className="custom-input"
                            name="new-activity"
                            placeholder="add new activity..."
                            // ref={register}
                            autoComplete="off"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        ></input>
                    </div>
                )}
            </div>
        </div>
    );
}

function mapStateArrayToHtml(array, toggleTrackingForm) {
    // const dispatch = useDispatch();
    if (array) {
        return array.map((activity, index) => {
            console.log("activity in ActivitiesMenu ", activity);
            return (
                <li
                    onClick={(e) => toggleTrackingForm(e)}
                    key={index.toString()}
                >
                    <Link to={`/${activity.name}`}>{activity.name}</Link>
                </li>
            );
        });
    } else {
        return;
    }
}
