import React, { useEffect, useState, useRef } from "react";
import axios from "../helpers/axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentActivity } from "../Redux/actions";

/*
 *
 * components
 */
import ChartsComponent from "./ChartsComponent";
import TrackingForm from "../Components/TrackingForm";
import ActivitiesMenu from "./ActivitiesMenu";

export default function App() {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);
    const [activity, setActivity] = useState("");
    const trackingFormIsVisible = {
        sleep: true,
        fast: false,
        exercise: false,
        events: false,
    };

    let currentActivity = useSelector(
        (state) => state && state.currentActivity
    );

    useEffect(() => {
        currentActivity = null;
    }, []);
    console.log("currentActivity from App ", currentActivity);

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
            if (key == e.target.textContent.toLowerCase()) {
                trackingFormIsVisible[key] = false;
                console.log(e.target.textContent);
                setActivity(e.target.textContent);
                console.log("activity from handle click outside", activity);
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
    };

    return (
        <Router>
            <div id="container" onClick={handleClickOutside}>
                <aside className="menu">
                    <div className="menu-top">
                        <p className="menu__user-name">
                            welcome
                            <br />
                            back,
                            <br /> ioana
                        </p>

                        <Link to={"/"}>
                            <div
                                className="logo"
                                onClick={() => {
                                    currentActivity = null;
                                    dispatch(changeCurrentActivity(null));
                                }}
                            >
                                MyLifetracker<span>_</span>
                            </div>
                        </Link>
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
                        {isVisible && (
                            <TrackingForm
                                isVisible={isVisible}
                                activity={currentActivity}
                            ></TrackingForm>
                        )}
                        {currentActivity && (
                            <Route
                                exact
                                path={`/${currentActivity}`}
                                render={() => (
                                    <ChartsComponent
                                        currentActivity={currentActivity}
                                    />
                                )}
                            ></Route>
                        )}
                        <Route
                            exact
                            path="/"
                            render={() => <ChartsComponent activity={null} />}
                        ></Route>
                    </div>

                    <div className="stats"></div>
                </section>
            </div>
        </Router>
    );
}
