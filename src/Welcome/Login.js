import React from "react";
import { Link } from "react-router-dom";
// import axios from "../helpers/axios";
/*
 *
 * components
 */
import FormInput from "../Components/FormInput";

export default function Login() {
    return (
        <div>
            <h4>Welcome back!</h4>
            <div className="form">
                {/*
    <ErrorMessage error={this.state.error} /> */}
                <FormInput
                    name="email"
                    // value={this.state.email}
                    type="email"
                    placeholder="email"
                    autoComplete="off"
                    required
                ></FormInput>
                <FormInput
                    name="password"
                    // value={this.state.password}
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    required
                ></FormInput>
                <button>log in</button>
                <h5>
                    Don&apos;t have an account?{" "}
                    <Link to="/register">Create your account</Link> and start
                    tracking.
                </h5>
                <p>
                    Forgot your password? <Link to="/reset">Reset</Link>
                </p>
            </div>
        </div>
    );
}
