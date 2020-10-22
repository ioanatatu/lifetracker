import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../helpers/axios";
/*
 *
 * components
 */
export default function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async function (inputData) {
        console.log("::::::", inputData);

        const { email, password } = inputData;

        console.log("--> clicked", email, password);

        axios
            .post("/login", { email, password })
            .then(({ data }) => {
                console.log(
                    "inside /login axios data.success with data: ",
                    data
                );
                if (data.success) {
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
        <div>
            <h4>Welcome back!</h4>
            <div className="form">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="tracking-form"
                >
                    <input
                        name="email"
                        // value={this.state.email}
                        type="email"
                        placeholder="email"
                        autoComplete="off"
                        required
                        ref={register}
                    ></input>
                    <input
                        name="password"
                        // value={this.state.password}
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                        required
                        ref={register}
                    ></input>
                    <input
                        className="tracking-form__submit-button"
                        type="submit"
                        value="log in"
                    />
                </form>
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
