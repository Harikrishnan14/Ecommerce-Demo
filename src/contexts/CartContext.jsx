import { createContext, useState } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [key, setKey] = useState()

    const addToCart = (item) => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
            let existingWishlist = Array.isArray(storedWishlist) ? storedWishlist : [];

            const wishlistIndex = existingWishlist.findIndex(wishlistItem =>
                wishlistItem.title === item.title &&
                wishlistItem.selectedColor === item.selectedColor &&
                wishlistItem.selectedSize === item.selectedSize
            );

            if (wishlistIndex !== -1) {
                existingWishlist.splice(wishlistIndex, 1);
                localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
            }
        } catch (err) {
        }

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

    const removeFromCart = (item) => {
        let existingCart;

        try {
            const storedCart = JSON.parse(localStorage.getItem("cart"));
            existingCart = Array.isArray(storedCart) ? storedCart : [];
        } catch (err) {
            existingCart = [];
        }

        const updatedCart = existingCart.filter(
            (cartItem) =>
                !(
                    cartItem.title === item.title &&
                    cartItem.selectedColor === item.selectedColor &&
                    cartItem.selectedSize === item.selectedSize
                )
        );

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setKey(Math.random());
    };

    const handleQty = (item, type) => {
        let existingCart;

        try {
            const storedCart = JSON.parse(localStorage.getItem("cart"));
            existingCart = Array.isArray(storedCart) ? storedCart : [];
        } catch (err) {
            existingCart = [];
        }

        const index = existingCart.findIndex(
            (cartItem) =>
                cartItem.title === item.title &&
                cartItem.selectedColor === item.selectedColor &&
                cartItem.selectedSize === item.selectedSize
        );

        if (index === -1) return;

        if (type === "inc") {
            existingCart[index].quantity += 1;
        } else {
            if (existingCart[index].quantity > 1) {
                existingCart[index].quantity -= 1;
            } else {
                existingCart.splice(index, 1);
            }
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        setKey(Math.random());
    };

    const handleWishlist = (item) => {
        let existingWishlist;

        try {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
            existingWishlist = Array.isArray(storedWishlist) ? storedWishlist : [];
        } catch (err) {
            existingWishlist = [];
        }

        const existingIndex = existingWishlist.findIndex(wishlistItem =>
            wishlistItem.id === item.id &&
            wishlistItem.selectedColor === item.selectedColor &&
            wishlistItem.selectedSize === item.selectedSize
        );

        if (existingIndex !== -1) {
            existingWishlist.splice(existingIndex, 1);
        } else {
            const wishlistItem = {
                id: item.id,
                title: item.title,
                images: item.images,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                price: item.price
            };
            existingWishlist.push(wishlistItem);
        }

        localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
        setKey(Math.random());
    };

    return (
        <CartContext.Provider value={{ addToCart, key, removeFromCart, handleQty, handleWishlist }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext }