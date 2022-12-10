import {React, useState, useEffect} from 'react'
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

const Form = () => {

    const [data, setData]= useState()
    const [error, setErrors]= useState()
    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        setErrors({ errors: errors || {} });
        if (errors) return;

        e.doSubmit();
    };
    const renderButton=(label) =>{
        return (
            <button
                className="my-2 mx-auto btn btn-dark"
                type="submit"
                disabled={this.validate()}
            >
                {label}
            </button>
        );
    }

    const  renderSelect=(name, label, options)=> {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    
    
    }
 const renderInput=(name, label, type, placeholder)=> {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                className="form-control"
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
                placeholder={placeholder}
            />
        );
    }
}

export default Form