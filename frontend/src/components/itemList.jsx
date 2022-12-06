import Item from "./itemCard";
import { getItems } from "../services/fakeItemService";

const ItemList = () => {
    const items = getItems();
    return (
        <>
            <div className="row" key={5}>
                {items.map((item) => (
                    <Item key={item._id} item={item} />
                ))}
            </div>
        </>
    );
};

export default ItemList;
