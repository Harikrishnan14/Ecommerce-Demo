import { createContext } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart))
        let subT = 0
        let keys = Object.keys(myCart)
        for (let i = 0; i < keys.length; i++) {
            subT += myCart[keys[i]].price * myCart[keys[i]].qty
        }
        setSubTotal(subT)
    }

    const addToCart = (item) => {
        let existingCart;

        try {
            const storedCart = JSON.parse(localStorage.getItem('cart'));
            existingCart = Array.isArray(storedCart) ? storedCart : [];
        } catch (err) {
            existingCart = [];
        }

        const existingIndex = existingCart.findIndex(cartItem =>
            cartItem.title === item.title &&
            cartItem.selectedColor === item.selectedColor &&
            cartItem.selectedSize === item.selectedSize
        );

        if (existingIndex !== -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push({ ...item, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
    };

    return (
        <CartContext.Provider value={{ addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }