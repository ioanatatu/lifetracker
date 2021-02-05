import React from "react";
import { useForm } from "react-hook-form";
import axios from "../helpers/axios";
import { Link } from "react-router-dom";
/*
 *
 * components
 */
export default function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async function (inputData) {
        const { email, password } = inputData;

        axios
            .post("/login", { email, password })
            .then(({ data }) => {
                if (data.success) {
                    //////////////////////////////////////// IMPORTANT TO KEEP IN MIND //////////////////////////////
                    // because there is a page refresh when using location.replace("/"), redux state is being overwritten
                    // dispatch(addUser(data.userName));
                    // find a way to pass the user name
                    // SOLUTION: use local storage
                    localStorage.setItem("userName", data.userName);
                    location.replace("/");
                } else {
                    console.log("ERROR IN LOGIN");
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    error: true,
                });
            });
    };

    return (
        <div className="login__wrapper">
            <h5>Welcome back!</h5>
            <p className="explanation">
                This is a project that is based on entering data on a longer
                period of time. You can, therefore, create your own account and
                enter data, or use the demo user to see data that has already
                been tracked: <br />
                <br />
                user: user@usersson.com
                <br />
                password: usersson
            </p>
            <div className="login-form__container">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="tracking-form login-form"
                >
                    <input
                        className="login_input"
                        name="email"
                        // value={this.state.email}
                        type="email"
                        placeholder="email"
                        autoComplete="off"
                        required
                        ref={register}
                    ></input>
                    <input
                        className="login_input"
                        name="password"
                        // value={this.state.password}
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                        required
                        ref={register}
                    ></input>
                    <input
                        className="tracking-form__submit-button login-button"
                        type="submit"
                        value="log in"
                    />
                </form>
            </div>
            <span style={{ textAlign: "center" }}>
                <h5 className="login-link">Don&apos;t have an account?</h5>
                <br />
                <div className="login-link">
                    <Link to="/register">Create your account</Link> and start
                    tracking
                </div>
            </span>
        </div>
    );
}
