import { createContext, useState } from "react";
import { getItem } from "../services/fakeItemService";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find((item) => item.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }
    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1,
                },
            ]);
        } else {
            setCartProducts(
                cartProducts.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }
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
        setCartProducts((cartProducts) =>
            cartProducts.filter((currentProduct) => {
                return currentProduct.id !== id;
            })
        );
    }
    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach((cartItem) => {
            const productData = getItem(cartItem.id);
            totalCost += productData.price * cartItem.quantity;
        });

        return totalCost;
    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
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
