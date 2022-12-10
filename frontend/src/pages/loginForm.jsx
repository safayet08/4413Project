import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { Link } from "react-router-dom";
import { loginService } from "../services/userService";
class LoginForm extends Form {
    state = {
        data: { Username: "", Password: "" },
        errors: {},
    };

    schema = {
        Username: Joi.string().required().label("Username"),
        Password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            const response = await loginService(data.Username, data.Password);
            const accessToken = response.data.user;
            console.log(">" + accessToken);
            localStorage.setItem("accToken", accessToken);
        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                const errors = { ...this.state.errors };
                errors.Username = "Incorrect Email or Password";
                this.setState({ errors });
            }
        }
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
                                    "Username",
                                    "Email Address",
                                    "text",
                                    "name@example.com"
                                )}
                                {}
                                {this.renderInput(
                                    "Password",
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
