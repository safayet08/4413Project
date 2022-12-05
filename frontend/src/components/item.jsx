import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import ListGroup from "./common/listGroup";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Item extends Component {
    state = {
        item: this.props.item,
    };

    render() {
        const { item } = this.props;
        return (
            <>
                <Card style={{ width: "18rem", margin: 10 }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Button variant="warning">Add to Cart</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Item;
