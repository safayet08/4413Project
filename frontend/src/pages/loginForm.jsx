import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { Link } from "react-router-dom";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = () => {
        console.log(
            `Submitted: ${this.state.data.username} and ${this.state.data.password}`
        );
    };

    render() {
        return (
            <>
                <div className="container my-3 py-3">
                    <h1 className="text-center">Login</h1>
                    <hr />
                    <div className="row my-4 h-100">
                        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput(
                                    "username",
                                    "Email Address",
                                    "text",
                                    "name@example.com"
                                )}
                                {}
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
                                    {this.renderButton("Login")}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginForm;
