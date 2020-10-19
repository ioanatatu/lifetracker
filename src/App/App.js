import React, { useEffect, useState, useRef } from "react";
import axios from "../helpers/axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/*
 *
 * components
 */
import ChartsComponent from "./ChartsComponent";
import TrackingForm from "../Components/TrackingForm";
import ActivitiesMenu from "./ActivitiesMenu";

export default function App() {
    const [isVisible, setIsVisible] = useState(true);
    const [activity, setActivity] = useState("");
    const trackingFormIsVisible = {
        sleep: true,
        fast: false,
        exercise: false,
        events: false,
    };
    let menuActivity = useRef();

    const logout = () => {
        axios
            .get("/logout")
            .then((result) => {
                console.log(result);
                location.replace("/");
            })
            .catch((error) => console.log(error));
    };
    const handleClickOutside = (e) => {
        // console.log(trackingForm);
        Object.keys(trackingFormIsVisible).map((key) => {
            if (key != e.target.textContent.toLowerCase()) {
                trackingFormIsVisible[key] = false;
                setIsVisible(false);
                console.log(e.target.textContent);
            }
        });
    };

    const toggleTrackingForm = (e) => {
        const activity = e.target.textContent.toLowerCase();

        Object.keys(trackingFormIsVisible).map((key) => {
            if (key == activity) {
                // trackingFormIsVisible[key] = true;
            } else {
                // trackingFormIsVisible[key] = false;
            }
        });

        setIsVisible(!isVisible);
        setActivity(activity);

        // console.log(menuActivity.current.innerText);
    };

    return (
        <Router>
            <div id="container" onClick={handleClickOutside}>
                {isVisible && (
                    <TrackingForm
                        isVisible={isVisible}
                        activity={activity}
                    ></TrackingForm>
                )}
                <aside className="menu">
                    <div className="menu-top">
                        <p className="menu__user-name">
                            welcome
                            <br />
                            back,
                            <br /> ioana
                        </p>

                        <div className="logo">
                            MyLifetracker<span>_</span>
                        </div>
                    </div>
                    <div className="menu-bottom">
                        <ActivitiesMenu></ActivitiesMenu>

                        <ul className="network">
                            <li>Friends</li>
                            <li>Doctors</li>
                            <li>Trainers</li>
                        </ul>
                    </div>
                </aside>

                <section className="main">
                    <div className="top-bar">
                        <button
                            className="logout"
                            onClick={() => {
                                logout();
                            }}
                        >
                            logout
                        </button>
                    </div>

                    <div className="charts-area">
                        <Route
                            exact
                            path="/sleep"
                            component={ChartsComponent}
                        ></Route>
                    </div>

                    <div className="stats"></div>
                </section>
            </div>
        </Router>
    );
}
