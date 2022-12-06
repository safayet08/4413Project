import Item from "./itemCard";
import { getItems } from "../services/fakeItemService";
import React, { useState, useEffect } from "react";

const ItemList = () => {
    const [items, setItems] = useState(getItems());
    const [filters] = useState(() => {
        let filterSet = new Set();
        filterSet.add("ALL");
        items.forEach((item) => {
            filterSet.add(item.category);
        });
        return [...filterSet];
    });
    const [selectedFilter, setSelectedFilter] = useState("ALL");

    const filterProduct = (cat) => {
        setSelectedFilter(cat);
        console.log(cat);
        setItems(
            cat === "ALL"
                ? getItems()
                : getItems().filter((item) => item.category === cat)
        );
    };

    return (
        <>
            <div className="buttons text-center py-5">
                {filters.map((filter) => {
                    return (
                        <button
                            className="btn btn-secondary m-2"
                            key={filter}
                            onClick={() => filterProduct(filter)}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>
            <div className="row" key={5}>
                {items.map((item) => (
                    <Item key={item._id} item={item} />
                ))}
            </div>
        </>
    );
};

export default ItemList;
