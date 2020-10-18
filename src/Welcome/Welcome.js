import React from "react";
import { HashRouter, Route } from "react-router-dom";
/*
 *
 * components
 */
import Registration from "./Registration";
import Login from "./Login";

const Welcome = () => {
    return (
        <div className="welcome effect6">
            <div className="intro">
                <header className="header">
                    <h2>Life</h2>
                    <h2>tracker.</h2>
                </header>
                <h4>
                    Journal and visualize your daily routines. Share your
                    progress with your doctor, trainer or friends.
                </h4>
            </div>
            <div className="reg-login">
                <HashRouter>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Registration} />
                </HashRouter>
            </div>
        </div>
    );
};

export default Welcome;

/* <span id="unsplash-link">
                Photo by{" "}
                <a href="https://unsplash.com/@curtismacnewton?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                    Curtis MacNewton
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/s/photos/running?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                    Unsplash
                </a>
            </span> */