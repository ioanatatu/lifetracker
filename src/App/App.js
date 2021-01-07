import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeCurrentActivity } from "../Redux/actions";
/*
 *
 * components
 */
import ChartsComponent from "./ChartsComponent";
import TrackingForm from "../Components/TrackingForm";
import ActivitiesMenu from "./ActivitiesMenu";
import StatsDisplay from "./StatsDisplay";

export default function App() {
    const [currentInterval, setCurrentInterval] = useState("currentWeek");

    let currentActivity = useSelector(
        (state) => state && state.currentActivity
    );

    useEffect(() => {}, []);

    const logout = () => {
        axios
            .get("/logout")
            .then((result) => {
                console.log(result);
                location.replace("/");
            })
            .catch((error) => console.log(error));
    };

    const getIntervalFromChartsComponent = (arg) => {
        setCurrentInterval(arg);
    };

    return (
        <Router>
            <div id="container">
                <aside className="menu">
                    <div className="menu-top">
                        <p className="menu__user-name">
                            welcome
                            <br />
                            back,
                            <br /> tea
                        </p>

                        <Link to={"/"}>
                            <div
                                className="logo"
                                onClick={() => {
                                    currentActivity = "intro";
                                    dispatch(changeCurrentActivity("intro"));
                                }}
                            >
                                MyLifetracker
                                <span className="color-accent">_</span>
                            </div>
                        </Link>
                    </div>
                    <div className="menu-bottom">
                        <ActivitiesMenu
                            currentActivity={currentActivity}
                        ></ActivitiesMenu>

                        <ul className="network">
                            <li>Friends</li>
                            <li>Doctors</li>
                            <li>Trainers</li>
                        </ul>
                    </div>
                </aside>

                <section className="main">
                    <div className="top-bar">
                        <div
                            className="logout"
                            onClick={() => {
                                logout();
                            }}
                        >
                            logout
                        </div>
                    </div>
                    <div className="charts-area">
                        <TrackingForm
                            currentInterval={currentInterval}
                            // currentActivity={currentActivity}
                        ></TrackingForm>
                        {currentActivity && (
                            <Route
                                exact
                                path={`/${currentActivity.name}`}
                                render={() => (
                                    <ChartsComponent
                                        currentActivity={currentActivity}
                                        getIntervalFromChartsComponent={
                                            getIntervalFromChartsComponent
                                        }
                                    />
                                )}
                            ></Route>
                        )}
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <ChartsComponent
                                    currentActivity={{ name: "intro" }}
                                />
                            )}
                        ></Route>
                    </div>
                    <StatsDisplay
                        currentActivity={currentActivity}
                    ></StatsDisplay>
                </section>
            </div>
        </Router>
    );
}
