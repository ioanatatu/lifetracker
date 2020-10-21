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
import StatsCard from "../Components/StatCard";

export default function App() {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);
    const [currentInterval, setCurrentInterval] = useState("currentWeek");
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

    const getIntervalFromChartsComponent = (arg) => {
        console.log("........................");
        setCurrentInterval(arg);
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
                                currentInterval={currentInterval}
                            ></TrackingForm>
                        )}
                        {currentActivity && (
                            <Route
                                exact
                                path={`/${currentActivity}`}
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
                                <ChartsComponent currentActivity={"intro"} />
                            )}
                        ></Route>
                    </div>

                    <div className="stats">
                        <StatsCard
                            title={"Min"}
                            amount={8.5}
                            day={"Tuesday"}
                            quality={"good"}
                            dreams={"had a few"}
                            notes={"tra la la"}
                        ></StatsCard>
                        <StatsCard
                            title={"Max"}
                            amount={8.5}
                            day={"Saturday"}
                            quality={"good"}
                            dreams={"had a few"}
                            notes={"tra la la"}
                        ></StatsCard>
                        <StatsCard
                            title={"Average"}
                            amount={8}
                            day={null}
                            quality={"good"}
                            dreams={"had a few"}
                            notes={"tra la la"}
                        ></StatsCard>
                    </div>
                </section>
            </div>
        </Router>
    );
}
