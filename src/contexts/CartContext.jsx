import { createContext, useState } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [key, setKey] = useState()

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
        setKey(Math.random())
    };

    return (
        <CartContext.Provider value={{ addToCart, key }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }