import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../helpers/axios";
/*
 *
 * components
 */
export default function Registration() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async function (inputData) {
        console.log(inputData);

        try {
            const { data } = await axios.post("/register", inputData);
            if (data.success) {
                localStorage.setItem("userName", data.userName);
                location.replace("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login__wrapper">
            <h5>First time here? Join us!</h5>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="tracking-form login-form"
            >
                <input
                    className="login_input"
                    type="text"
                    name="first"
                    placeholder="first name"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
                    className="login_input"
                    type="text"
                    name="last"
                    placeholder="last name"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
                    className="login_input"
                    type="email"
                    name="email"
                    placeholder="email"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
                    className="login_input"
                    type="password"
                    name="password"
                    placeholder="password"
                    ref={register({
                        required: true,
                        minLength: { value: 5, message: "password too short" },
                    })}
                    autoComplete="new-password"
                    required
                />
                {errors.password && <p>Please enter a valid password</p>}
                <input
                    type="hidden"
                    name="_csrf"
                    // value={this.state.csrfToken}
                />
                <input
                    type="submit"
                    className="tracking-form__submit-button login-button"
                />
            </form>
            <span style={{ display: "flex" }}>
                <h5 className="login-link">Already a member? </h5>
                <br />
                <div className="login-link">
                    <Link to="/"> Login</Link>
                </div>
            </span>
        </div>
    );
}

/*ref={register({ required: "password required", minLength: 5 })}
{errors.password && <p>errors.password.message</p>}*/
