import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "./item";
import { getItems } from "../services/fakeItemService";

class ItemList extends Component {
    items = getItems(); // dummy call to fakeItemService class

    render() {
        return (
            <>
                <div className="row">
                    {this.items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </>
        );
    }
}

export default ItemList;
