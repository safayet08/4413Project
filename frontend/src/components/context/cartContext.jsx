import { createContext, useState } from "react";
import { getItem } from "../../services/fakeItemService";
import { useEffect } from "react";
import { getCart, addToCart } from "../../services/cartService";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    incrementCartItem: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    getCartFromServer: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        getCartFromServer();
    }, []);

    const getCartFromServer = async () => {
        const cart = getCart();
        const array = cart.data.items;
        console.log(cart.data.items);
        if (!array) {
            setCartProducts([]);
        } else {
            const newCart = [];
            for (var i = 0; i < array.length; i++) {
                const item = await getItem(array[i].itemId);
                const quantity = array[i].quantity;
                newCart.push({
                    item: item,
                    quantity: quantity,
                });
            }
            setCartProducts(newCart);
        }
    };

    function getProductQuantity(id) {
        const quantity = cartProducts.find((i) => i.item._id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }
    const addToBackend = async (item, quantity) => {
        addToCart(
            {
                itemId: item._id,
                quantity: quantity,
            },
            {
                Accept: "application/json",
                "Access-Control-Allow-Origin": true,
            }
        );
    };

    const addToBackendId = async (itemId, quantity) => {
        addToCart(
            {
                itemId: itemId,
                quantity: quantity,
            },
            {
                Accept: "application/json",
                "Access-Control-Allow-Origin": true,
            }
        );
    };

    function addOneToCart(item) {
        const a = item;
        const id = item._id;
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
                    i.item._id === id ? { ...i, quantity: i.quantity + 1 } : i
                )
            );
        }
        addToBackend(item, 1);
        // console.log(cartProducts)
    }

    function incrementCartItem(id) {}
    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map((i) =>
                    i.item._id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
            );
        }
        addToBackendId(id, -1);
    }
    function deleteFromCart(id) {
        setCartProducts(
            cartProducts.filter((product) => product.item._id !== id)
        );
    }
    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach((cartItem) => {
            const productData = cartItem.item;
            totalCost += productData.price * cartItem.quantity;
        });

        // console.log(totalCost)

        return totalCost;
    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        incrementCartItem,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        getCartFromServer,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
