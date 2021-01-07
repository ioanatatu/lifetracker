import React from "react";
import { useForm } from "react-hook-form";
import axios from "../helpers/axios";
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
            <div className="form login-form__container">
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
        </div>
    );
}

// <p className="no-account">
//     Don&apos;t have an account?
//     <br />
//     <Link to="/register">Create your account</Link> and start
//     tracking.
// </p>
// <p>
//     Forgot your password? <Link to="/reset">Reset</Link>
// </p>
