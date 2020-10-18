import React from "react";
import axios from "../helpers/axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/*
 *
 * components
 */
import Sleep from "./Sleep";
import TrackingForm from "../Components/TrackingForm";

export default function App() {
    const logout = () => {
        axios
            .get("/logout")
            .then((result) => {
                console.log(result);
                location.replace("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <Router>
            <div id="container">
                <TrackingForm></TrackingForm>
                <aside className="menu">
                    <p className="menu__user-name">
                        welcome
                        <br />
                        back,
                        <br /> ioana
                    </p>

                    <div className="logo">
                        MyLifetracker<span>_</span>
                    </div>

                    <ul className="categories">
                        <li>
                            <Link to={`/sleep`}>Sleep</Link>
                        </li>
                        <li>
                            <Link to={`/sleep`}>Fast</Link>
                        </li>
                        <li>
                            <Link to={`/sleep`}>Exercise</Link>
                        </li>
                        <li>
                            <Link to={`/sleep`}>Events</Link>
                        </li>
                    </ul>
                    <div className="new-category">
                        <ion-icon name="add-outline">Add category</ion-icon>
                    </div>

                    <ul className="network">
                        <li>Friends</li>
                        <li>Doctors</li>
                        <li>Trainers</li>
                    </ul>
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
                        <Route exact path="/sleep" component={Sleep}></Route>
                    </div>

                    <div className="stats"></div>
                </section>
            </div>
        </Router>
    );
}
