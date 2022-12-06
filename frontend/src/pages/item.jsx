import { getItem } from "../services/fakeItemService";
import { Link, useParams } from "react-router-dom";

const Item = () => {
    const itemID = useParams()._id;
    const item = getItem(itemID);

    const ShowItem = () => {
        return (
            <>
                <div className="container my-5 py-2">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 py-3">
                            <img
                                className="img-fluid"
                                src={item.image}
                                alt={item.name}
                                width="400px"
                                height="400px"
                            />
                        </div>
                        <div className="col-md-6 col-md-6 py-5">
                            <h4 className="text-uppercase text-muted">
                                {item.category}
                            </h4>
                            <h1 className="display-5">{item.title}</h1>
                            <p className="lead">
                                {item.rating && item.rating.rate}{" "}
                                <i className="fa fa-star"></i>
                            </p>
                            <h3 className="display-6  my-4">item </h3>
                            <p className="lead">{item.description}</p>
                            <button
                                className="btn btn-outline-dark"
                                //onClick={() => addProduct(product)}
                            >
                                Add to Cart
                            </button>
                            <Link to="/cart" className="btn btn-dark mx-3">
                                Go to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <ShowItem />
        </>
    );
};

export default Item;
