import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext";
import { useContext } from "react";

const ItemCard = (props) => {
    const { item } = props;
    const cart = useContext(CartContext);
    return (

        <div
            id={item.id}
            key={item.id}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        >

            <div className="card text-center h-100" key={item.id}>
            <Link   to={"/item/" + item._id} stlye={{"inline":""}}>
 
                <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                />
            </Link>

                <div className="card-body">
                    <h5 className="card-title">
                        {item.name.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                        {item.description.substring(0, 90)}
                        ...
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {item.price}</li>
                </ul>
                <div className="card-body">
                    <Link
                        to={"/item/" + item._id}
                        className="btn btn-success m-1" state={{item:item}}>
                        Buy Now
                    </Link>
                    <button
                        className="btn btn-warning m-1"
                        onClick={() => cart.addOneToCart(item)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ItemCard;
