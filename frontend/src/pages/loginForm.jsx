// import React from "react";
// import Joi from "joi-browser";
// import Form from "../components/common/form";
// import { Link , useNagivate} from "react-router-dom";
// import { loginService } from "../services/userService";
// import { browserHistory } from 'react-router';

// class LoginForm extends Form {
//     state = {
//         data: { Username: "", Password: "" },
//         errors: {},
//     };

//     schema = {
//         Username: Joi.string().required().label("Username"),
//         Password: Joi.string().required().label("Password"),
//     };

//     doSubmit = async () => {
//         try {
//             const { data } = this.state;
//             const response = await loginService(data.Username, data.Password);
//             const accessToken = response.data.user;
//             console.log(">" + accessToken);
//             localStorage.setItem("accToken", accessToken);
//             this.props.router.push('/')
//         } 
//             catch (ex) {
//             if (ex.response && ex.response.status === 401) {
//                 const errors = { ...this.state.errors };
//                 errors.Username = "Incorrect Email or Password";
//                 this.setState({ errors });
//             }
//         }
//     };

//     render() {
//         return (
//             <>
//                 <div className="container my-3 py-3">
//                     <h1 className="text-center">Login</h1>
//                     <hr />
//                     <div className="row my-4 h-100">
//                         <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                             <form onSubmit={this.handleSubmit}>
//                                 {this.renderInput(
//                                     "Username",
//                                     "Email Address",
//                                     "text",
//                                     "name@example.com"
//                                 )}
//                                 {}
//                                 {this.renderInput(
//                                     "Password",
//                                     "Password",
//                                     "password",
//                                     "Password"
//                                 )}
//                                 <div className="my-3">
//                                     <p>
//                                         New Here?{" "}
//                                         <Link
//                                             to="/register"
//                                             className="text-decoration-underline text-info"
//                                         >
//                                             Register
//                                         </Link>{" "}
//                                     </p>
//                                 </div>
//                                 <div className="text-center">
//                                     {this.renderButton("Login")}
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default LoginForm; 


import {React, useState} from 'react'
import Form from "../components/common/Form2.jsx";
import { Link , useNavigate} from "react-router-dom";
import { loginService } from "../services/userService";
import Select from "../components/common/select.jsx";
import Joi from "joi-browser";
import Input from '../components/common/input.jsx'
import { useEffect } from 'react';

const LoginForm = () => {
    const [data, setData]= useState({Username:"", Password: ""})
    const [error, setError]= useState({})
    const navigate= useNavigate();
    useEffect(()=>{
        setData({Username:"", Password: ""})
        setError({})
    },[])
    const     schema = {
                Username: Joi.string().required().label("Username"),
                Password: Joi.string().required().label("Password"),
            };
        
    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const s = { [name]: schema[name] };
        const { error } = Joi.validate(obj, s);
        return error ? error.details[0].message : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        setError ({ errors: errors || {} });
        if (errors) return;
        doSubmit()
    };

    const doSubmit =async () => {
                try {
                    const response = await loginService(data.Username, data.Password);
                    const accessToken = response.data.user;
                    console.log(">" + accessToken);
                    localStorage.setItem("accToken", accessToken);
                    navigate("/")
                    window.location.reload(false);
                } 
                    catch (ex) {
                    if (ex.response && ex.response.status === 401) {
                        const errors = { ...error };
                        errors.Username = "Incorrect Email or Password";
                        setError(errors)
                    }
                }
            };
    const handleChange = ({ currentTarget: input }) => {
        const errors = { ...error };
        const errorMessage = validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        // Clone the data state, get the value typed in, set data to new state
        const d = { ...data };
        d[input.name] = input.value;

        setData(d);
        setError(errors);
    };

    const renderButton=(label) =>{
        return (
            <button
                className="my-2 mx-auto btn btn-dark"
                type="submit"
                disabled={validate()}
            >
                {label}
            </button>
        );
    };


    const  renderSelect=(name, label, options)=> {

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={handleChange}
                error={error[name]}
            />
        );
    }
    const renderInput=(name, label, type, placeholder)=> {
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                className="form-control"
                label={label}
                onChange={handleChange}
                error={error[name]}
                placeholder={placeholder}
            />
        );
    }

        return (
            <>
                <div className="container my-3 py-3">
                    <h1 className="text-center">Login</h1>
                    <hr />
                    <div className="row my-4 h-100">
                        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                            <form onSubmit={handleSubmit}>
                                {renderInput(
                                    "Username",
                                    "Email Address",
                                    "text",
                                    "name@example.com"
                                )}
                                {}
                                {renderInput(
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
                                    {renderButton("Login")}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }


export default LoginForm
