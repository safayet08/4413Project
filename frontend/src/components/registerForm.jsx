import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    };

    schema = {
        name: Joi.string().required().label("Full Name"),
        username: Joi.string().required().email().label("Username/Email"),
        password: Joi.string().required().min(5).label("Password"),
    };

    doSubmit = () => {
        // Call the server
        console.log(
            `Submitted: ${this.state.data.username}, ${this.state.data.password}` +
                `, ${this.state.data.name}`
        );
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
                                    "name",
                                    "Your Full Name",
                                    "text",
                                    "Full Name"
                                )}
                                {this.renderInput(
                                    "username",
                                    "Email Address",
                                    "text",
                                    "name@example.com"
                                )}
                                {this.renderInput(
                                    "password",
                                    "Password",
                                    "password",
                                    "Password"
                                )}
                                <div className="my-3">
                                    <p>
                                        New Here?{" "}
                                        <Link
                                            to="/register"
                                            className="text-decoration-underline text-info"
                                        >
                                            Register
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
