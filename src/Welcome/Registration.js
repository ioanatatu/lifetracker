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
            if (data.success) location.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <h1>First time here? Join us!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="first"
                    placeholder="first name"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
                    type="text"
                    name="last"
                    placeholder="last name"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    ref={register}
                    autoComplete="off"
                    required
                ></input>
                <input
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
                <input type="submit" />
            </form>

            <h5 className="login-link">
                Already a member? <Link to="/"> Login</Link>
            </h5>
        </React.Fragment>
    );
}

/*ref={register({ required: "password required", minLength: 5 })}
{errors.password && <p>errors.password.message</p>}*/
