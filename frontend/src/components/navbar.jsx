import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "./cartContext";
import CartProduct from "./CartProduct";
import Form from "react-bootstrap/Form";
import {useRef} from 'react';
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user }) => {
    const cart = useContext(CartContext);
    const navigate = useNavigate();

    const textFieldRef= useRef(null)
    const filterFieldRef= useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick=(e)=>{
        // console.log(textFieldRef.current.value)
        // console.log(searchFilter)
        const query= textFieldRef.current.value
        const filter= searchFilter==="Filter" ? "name" : searchFilter==="By Brand"? "brand" : "category"
        
        navigate(`/search?query=${query}&filter=${filter}`)

    }
    const productsCount = cart.items.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    };

    const orderSummary = () => {
        const shippingCost = 30;
        return (
            <div className="col-md-12">
                <div className="card mb-4">
                    <div className="card-header py-3 bg-light">
                        <h5 className="mb-0">Order Summary</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Products ({productsCount})
                                <span>
                                    $
                                    {Math.round(cart.getTotalCost().toFixed(2))}
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                Shipping
                                <span>${shippingCost}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                    <strong>Total amount</strong>
                                </div>
                                <span>
                                    <strong>
                                        $
                                        {Math.round(
                                            cart.getTotalCost() + shippingCost
                                        ).toFixed(2)}
                                    </strong>
                                </span>
                            </li>
                        </ul>

                        <Link
                            to="/checkout"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={handleClose}
                        >
                            Go to checkout
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const cartModal = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            {cart.items.map((currentProduct, index) => (
                                <CartProduct
                                    id={currentProduct.id}
                                    quantity={currentProduct.quantity}
                                    key={index}
                                />
                            ))}
                            {orderSummary()}
                        </>
                    ) : (
                        <h3>There are no items in your cart</h3>
                    )}
                </Modal.Body>
            </Modal>
        );
    };

    const [searchFilter, setSearchFilter] = useState("Filter");
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
                    {" "}
                    OffSale E-commerce
                </NavLink>
                <button
                    className="navbar-toggler mx-2"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <Form className="d-flex">
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={searchFilter}
                                    menuVariant="dark"
                                    ref={filterFieldRef}
                                >
                                    <NavDropdown.Item
                                        onClick={() =>
                                            setSearchFilter("By Brand")
                                        }
                                    >
                                        By Brand
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() =>
                                            setSearchFilter("By Category")
                                        }
                                    >
                                        By Category
                                    </NavDropdown.Item>


                                </NavDropdown>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    ref={textFieldRef}
                                />

                                <Button onClick={handleClick} variant="outline-secondary">
                                    <i 

                                        className="fa fa-search"
                                        aria-hidden="true"
                                    ></i>
                                                                        

                                </Button>
                            </Form>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                About Us{" "}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/item">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {console.log("inside navbar")}
                        {console.log(user.name)}
                        {!user.name && (
                            <>
                                <NavLink
                                    to="/login"
                                    className="btn btn-dark m-2"
                                    onClick={routeChange}
                                >
                                    <i className="fa fa-sign-in mr-1"></i> Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="btn btn-dark m-2"
                                >
                                    <i className="fa fa-user-plus mr-1"></i>{" "}
                                    Register
                                </NavLink>
                            </>
                        )}
                        {user.name && (
                            <>
                                <NavLink to="/" className="btn btn-dark m-2">
                                    {user.name}
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="btn btn-dark m-2"
                                >
                                    <i
                                        class="fa fa-sign-out"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    Logout
                                </NavLink>
                            </>
                        )}
                        <Button
                            className="btn btn-dark m-2"
                            onClick={handleShow}
                        >
                            <i className="fa fa-shopping-cart mr-1"></i>Cart(
                            {productsCount})
                        </Button>
                    </div>
                </div>
            </div>

            {cartModal()}
        </nav>
    );
};

export default NavBar;
