const addItemToCart = (item) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    let itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1,
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

const removeItemFromCart = (item) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    let itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export { addItemToCart, removeItemFromCart };
