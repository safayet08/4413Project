import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import * as ItemService from "../services/itemService"
import Select from "../components/common/select.jsx";
import Joi from "joi-browser";
import Input from '../components/common/input.jsx'

const AddItemForm = () => {
    const [data, setData]= useState({Username:"", Password: ""})
    const [error, setError]= useState({})
    const navigate= useNavigate();
    useEffect(()=>{
        setData({name:"", description: "", brand: "", category:"",stock:"",price:"",image:""})
        setError({})
    },[])
    const     schema = {
                name: Joi.string().required().label("name"),
                description: Joi.string().required().label("description"),
                brand: Joi.string().required().label("brand"),
                category: Joi.string().required().label("category"),
                stock: Joi.number().required().label("stock"),
                price: Joi.number().required().label("price"),
                image: Joi.string().allow('').optional() ,
 


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

        try{
            const response= await ItemService.addItem(data)
            navigate(`/item/${response.data._id}`)
            window.location.reload(false);
        }catch(err){
            if(err.response && err.response.status===404){
                console.log("error happened")
                const errors={...error}
                errors.name="Object already exists with this name"
                setError(errors)
            }
        }
                // try {
                //     const response = await loginService(data.Username, data.Password);
                //     const accessToken = response.data.user;
                //     console.log(">" + accessToken);
                //     localStorage.setItem("accToken", accessToken);
                //     navigate("/")
                //     window.location.reload(false);
                // } 
                //     catch (ex) {
                //     if (ex.response && ex.response.status === 401) {
                //         const errors = { ...error };
                //         errors.Username = "Incorrect Email or Password";
                //         setError(errors)
                //     }
                // }
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
                    <h1 className="text-center">Add Item</h1>
                    <hr />
                    <div className="row my-4 h-100">
                        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                            <form onSubmit={handleSubmit}>
                                {renderInput(
                                    "name",
                                    "Item Name",
                                    "text",
                                    "Item Name"
                                )}
                                {}
                                {renderInput(
                                    "description",
                                    "Description",
                                    "text",
                                    "Item Description"
                                )}
                                {renderInput(
                                    "brand",
                                    "Brand",
                                    "text",
                                    "Item Brand"
                                )}
                                {renderInput(
                                    "category",
                                    "Category",
                                    "text",
                                    "Item Category"
                                )}


                                {renderInput(
                                    "stock",
                                    "Stock",
                                    "number",
                                    "Item Stock"
                                )}


                                {renderInput(
                                    "price",
                                    "Price",
                                    "number",
                                    "Item Price"
                                )}
                                {renderInput(
                                    "image",
                                    "Image",
                                    "text",
                                    "Please provide a link to an image / leave blank for basic image"
                                )}




                                


                                {/* <div className="my-3">
                                    <p>
                                        New Here?{" "}
                                        <Link
                                            to="/register"
                                            className="text-decoration-underline text-info"
                                        >
                                            Register
                                        </Link>{" "}
                                    </p>
                                </div> */}
                                <div className="text-center">
                                    {renderButton("Add Item")}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }




export default AddItemForm