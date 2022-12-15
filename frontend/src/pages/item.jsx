import * as ItemService from "../services/fakeItemService";
import { Link, useParams, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import jwtDecode from "jwt-decode";

const Item = () => {
    const formstyle = {
        padding: "5px",
        width: "50vw",
        borderRadius: "20px",
    };
    const formContainerStyle = {
        padding: "20px",
        width: "60%",
        borderRadius: "20px",
        margin: "auto",
    };
    const params= useParams()
    const [review, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [item, setItem] = useState({});
    const [user, setUser] = useState({});
    const addReviewHandler = async (e) => {    

        e.preventDefault() 
        let reviews = {
            userName: user,
            user:user.email,
            type:"email",
            rating: rating,
            comment: comment,
        };
        try{
        const res= await ItemService.postReview(item._id, reviews, user.email,"email");
        const data= await res.data()
        console.log(data)

        window.location.reload(false)
        }catch(error){
            alert("Error submitting review, this user might already have a review")
        }
    };
    useEffect(() => {

        const GetItemFromServer = async () => {
            const id= params._id
            const item = await ItemService.getItem(id);
            setItem(item);
            setReviews(item.reviews);
        };
        GetItemFromServer();
        try {
            const user = jwtDecode(localStorage.getItem("accToken")).UserInfo;
            setUser(user);
            console.log(user)
        } catch (ex) {
            console.log("no access token");
        }
    }, []);

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
                        {/* <Link to="/cart" className="btn btn-dark mx-3"> */}
                        Go to Cart
                        {/* </Link> */}
                    </div>
                </div>
                {user.name ? (
                    <>
                        <div class="product-reviews" style={formContainerStyle}>
                            <form onSubmit={addReviewHandler}>
                                {/* <Form.Group className="mb-3" controlId="rating"> */}
                                    <label>Rating</label>
                                    <input
                                        value={rating}
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                        type="number"
                                    />
                                {/* </Form.Group> */}
                                {/* <Form.Group
                                    className="mb-3"
                                    controlId="comment"
                                > */}
                                    <label>Comment</label>
                                    <input
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        as="textarea"
                                    />
                                {/* </Form.Group> */}
                                <br></br>
                                <button
                                    type="submit"
                                    style={{ background: "Black" }}
                                >
                                    Add Review
                                </button>
                            </form>
                        </div>
                    </>
                ) : <></>}
                <div>
                    <h4>Reviews: </h4>
                    <br />
                    {review.length > 0 ? (
                        review.map((reviews) => {
                            return (
                                <p>
                                    User: {reviews.userName}
                                    <br /> Rating: {reviews.rating} <br />{" "}
                                    {reviews.comment}
                                </p>
                            );
                        })
                    ) : (
                        <p>No reviews for this product</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Item;
