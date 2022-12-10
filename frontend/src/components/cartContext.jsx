import { createContext, useState } from "react";
import { getItem } from "../services/fakeItemService";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    incrementCartItem:()=>{},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find((i) => i.item._id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }
    function addOneToCart(item) {
        const a=item
        const id= item._id
        const quantity = getProductQuantity(id);
        // console.log(quantity)
        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                {
                    item: a,
                    quantity: 1,
                },
            ]);
        } else {
        //     cartProducts.map((i) =>
        //     i.item._id === id
        //         ? console.log({ ...i, quantity: i.quantity + 1 })
        //         : console.log(i.item._id , " " , id)
        // )

            setCartProducts(
                cartProducts.map((i) =>
                    i.item._id === id
                        ? ({ ...i, quantity: i.quantity + 1 })
                        : i
                )
            );
        }
        // console.log(cartProducts)

    }

    function incrementCartItem(id){

    }
    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        }
    }
    function deleteFromCart(id) {
        setCartProducts(cartProducts.filter(product=>product.item._id!==id
        ))
    }
    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach((cartItem) => {
            const productData = cartItem.item;
            totalCost += productData.price * cartItem.quantity;

        });

        // console.log(totalCost)

        return totalCost

    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        incrementCartItem,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
