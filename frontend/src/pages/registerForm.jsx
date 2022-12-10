import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { Link } from "react-router-dom";

import { registerService } from "../services/userService";

class RegisterForm extends Form {
    state = {
        data: { Username: "", Password: "", Name: "" },
        errors: {},
    };

    schema = {
        Name: Joi.string().required().label("Full Name"),
        Username: Joi.string().required().email().label("Username/Email"),
        Password: Joi.string().required().min(5).label("Password"),
    };

    doSubmit = async () => {
        const response = await registerService(
            this.state.data.Name,
            this.state.data.Username,
            this.state.data.Password
        );

        console.log(response.data);
    };

    render() {
        return (
            <>
                <div className="container my-3 py-3">
                    <h1 className="text-center">Register</h1>
                    <hr />
                    <div className="row my-4 h-100">
                        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput(
                                    "Name",
                                    "Your Full Name",
                                    "text",
                                    "Full Name"
                                )}
                                {this.renderInput(
                                    "Username",
                                    "Email Address",
                                    "text",
                                    "name@example.com"
                                )}
                                {this.renderInput(
                                    "Password",
                                    "Password",
                                    "password",
                                    "Password"
                                )}
                                <div className="my-3">
                                    <p>
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-decoration-underline text-info"
                                        >
                                            Login
                                        </Link>{" "}
                                    </p>
                                </div>
                                <div className="text-center">
                                    {this.renderButton("Register")}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RegisterForm;
