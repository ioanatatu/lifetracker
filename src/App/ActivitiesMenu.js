import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addActivity, changeCurrentActivity } from "../Redux/actions";

export default function ActivitiesMenu({ currentActivity }) {
    const dispatch = useDispatch();

    const [newActivityIsOpen, setNewActivityIsOpen] = useState(false);
    const [userInput, setUserInput] = useState("");

    const activities = useSelector((state) => state && state.activities);

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

    useEffect(() => {}, [currentActivity]);

    return (
        <div className="activities-menu-and-button">
            <ul className="categories">
                {mapStateArrayToHtml(
                    activities,
                    currentActivity,
                    changeCurrentActivity
                )}
            </ul>

            <div className="new-category">
                <div className="add-cat" onClick={handleClickAddActivityButton}>
                    <ion-icon name="add-outline"></ion-icon>
                </div>
                {newActivityIsOpen && (
                    <div className="new-act__input-and-button">
                        <input
                            className="input-new-activity"
                            name="new-activity"
                            placeholder="add new activity..."
                            autoComplete="off"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        ></input>
                        <div
                            className="new-activ-submit"
                            onClick={() => {
                                dispatch(addActivity(userInput));
                                handleSubmitNewActivity();
                                handleClickAddActivityButton();
                            }}
                        >
                            submit
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
/*
 *
 *
 *
 *
 * helper functions
 */
function mapStateArrayToHtml(array, currentActivity, changeCurrentActivity) {
    const dispatch = useDispatch();
    if (array) {
        return array.map((activity, index) => {
            console.log(
                "activity in ActivitiesMenu > mapStateArrayToHtml ",
                activity.name
            );
            return (
                <li
                    className={
                        currentActivity && currentActivity.name == activity.name
                            ? "current__activity"
                            : ""
                    }
                    key={index.toString()}
                    onClick={() => dispatch(changeCurrentActivity(activity))}
                >
                    <Link to={`/${activity.name}`}>{activity.name}</Link>
                </li>
            );
        });
    } else {
        return;
    }
}
