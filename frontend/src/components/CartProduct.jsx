import { CartContext } from "./cartContext";
import { useContext } from "react";
import { getItem } from "../services/fakeItemService";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const quantity = props.quantity;
    const item = props.item;
    const id= item._id


    return (
        <div key={item.id}>
            <div className="row d-flex align-items-center">
                <div className="col-lg-3 col-md-12">
                    <div
                        className="bg-image rounded"
                        data-mdb-ripple-color="light"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={75}
                        />
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <p>
                        <strong>{item.name}</strong>
                    </p>
                </div>

                <div className="col-lg-3 col-md-3">
                    <div className="d-flex mb-2" style={{ maxWidth: "300px" }}>
                        <button
                            className="btn px-3"
                            onClick={() => cart.deleteFromCart(id)}
                        >
                            <i className="fa fa-minus"></i>
                        </button>

                        <p className="mx-4">{quantity}</p>

                        <button
                            className="btn px-3"
                            onClick={() => cart.addOneToCart(item)}
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>

                    <p className="text-center text-md-center">
                        <strong>
                            <span className="text-muted">{quantity}</span> x $
                            {item.price}
                        </strong>
                    </p>
                </div>
            </div>
            <hr className="my-4" />
        </div>
    );
}

export default CartProduct;
