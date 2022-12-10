// import React from "react";
// import Joi from "joi-browser";
// import Form from "../components/common/form";
// import { Link } from "react-router-dom";

// import { registerService } from "../services/userService";

// class RegisterForm extends Form {
//     state = {
//         data: { Username: "", Password: "", Name: "" },
//         errors: {},
//     };

//     schema = {
//         Name: Joi.string().required().label("Full Name"),
//         Username: Joi.string().required().email().label("Username/Email"),
//         Password: Joi.string().required().min(5).label("Password"),
//     };

//     doSubmit = async () => {
//         const response = await registerService(
//             this.state.data.Name,
//             this.state.data.Username,
//             this.state.data.Password
//         );

//         console.log(response.data);
//     };

//     render() {
//         return (
//             <>
//                 <div className="container my-3 py-3">
//                     <h1 className="text-center">Register</h1>
//                     <hr />
//                     <div className="row my-4 h-100">
//                         <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//                             <form onSubmit={this.handleSubmit}>
//                                 {this.renderInput(
//                                     "Name",
//                                     "Your Full Name",
//                                     "text",
//                                     "Full Name"
//                                 )}
//                                 {this.renderInput(
//                                     "Username",
//                                     "Email Address",
//                                     "text",
//                                     "name@example.com"
//                                 )}
//                                 {this.renderInput(
//                                     "Password",
//                                     "Password",
//                                     "password",
//                                     "Password"
//                                 )}
//                                 <div className="my-3">
//                                     <p>
//                                         Already have an account?{" "}
//                                         <Link
//                                             to="/login"
//                                             className="text-decoration-underline text-info"
//                                         >
//                                             Login
//                                         </Link>{" "}
//                                     </p>
//                                 </div>
//                                 <div className="text-center">
//                                     {this.renderButton("Register")}
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default RegisterForm;

import { React, useState } from "react";
import Form from "../components/common/Form2.jsx";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/userService";
import Select from "../components/common/select.jsx";
import Joi from "joi-browser";
import Input from "../components/common/input.jsx";
import { useEffect } from "react";
import { registerService } from "../services/userService";

const RegisterForm = () => {
  const [data, setData] = useState({ Username: "", Password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setData({ Username: "", Password: "", Name: "" });
    setError({});
  }, []);
  const schema = {
    Name: Joi.string().required().label("Full Name"),
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
    setError({ errors: errors || {} });
    if (errors) return;
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const response = await registerService(
        data.Name,
        data.Username,
        data.Password
      );

      console.log(response.data);
      navigate("/login")
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...error };
        errors.Username = "Please Provide Credentials";
        setError(errors);
      }else   if (ex.response && ex.response.status === 409) {
        const errors = { ...error };
        errors.Username = "Duplicate Credentials";
        setError(errors);
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

  const renderButton = (label) => {
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

  const renderSelect = (name, label, options) => {
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
  };
  const renderInput = (name, label, type, placeholder) => {
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
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {renderInput("Name", "Your Full Name", "text", "Full Name")}
              {renderInput(
                "Username",
                "Email Address",
                "text",
                "name@example.com"
              )}
              {renderInput("Password", "Password", "password", "Password")}
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
              <div className="text-center">{renderButton("Register")}</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
