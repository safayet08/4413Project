import Item from "./itemCard";
import * as ItemService from "../services/fakeItemService";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ItemList = () => {
  // const [items, setItems] = useState(getItems());

  // const [filters] = useState(() => {
  //     let filterSet = new Set();
  //     filterSet.add("ALL");
  //     items.forEach((item) => {
  //         filterSet.add(item.category);
  //     });
  //     return [...filterSet];
  // });

  const [items, setItems] = useState([]);
  const[displayedItems, setDisplayedItems]= useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const a = await ItemService.getItems();
      setItems(a);
      setDisplayedItems(a)
      console.log(a);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const getFilters = async () => {
      const filterSet = new Set();
      filterSet.add("ALL");
      items.forEach((item) => {
        filterSet.add(item.category);
        // filterSet.add(item.brand);
      });
      setFilters([...filterSet]);
    };
    getFilters();
  }, [items]);

  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filterProduct = (cat) => {
    setSelectedFilter(cat);
    console.log(cat);
    setDisplayedItems(
      cat === "ALL"
        ? items
        : items.filter((item) => item.category === cat)
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
        {displayedItems.map((item) => (
        // <Link   to={"/item/" + item._id}>
          <Item key={item._id} item={item} />
        //   </Link>
        ))}
      </div>
    </>
  );
};

export default ItemList;
