import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {

        const token =
            localStorage.getItem("token");

        // Solo permite agregar si está logueado
        if (!token) {

            alert(
                "Debes iniciar sesión para agregar productos al carrito"
            );

            return;
        }

        const existingProduct =
            cartItems.find(
                item => item.id === product.id
            );

        if (existingProduct) {

            const updatedCart =
                cartItems.map(item =>

                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                );

            setCartItems(updatedCart);

        } else {

            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    const removeFromCart = (id) => {

        const updatedCart =
            cartItems.filter(
                item => item.id !== id
            );

        setCartItems(updatedCart);
    };

    const clearCart = () => {

        setCartItems([]);
    };

    const updateQuantity = (
        id,
        newQuantity
    ) => {

        const updatedCart =
            cartItems.map(item =>

                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity
                    }
                    : item
            );

        setCartItems(updatedCart);
    };

    const cartTotal =
        cartItems.reduce(
            (total, item) =>
                total +
                item.precio * item.quantity,
            0
        );

    const cartCount =
        cartItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    return (

        <CartContext.Provider
            value={{
                items: cartItems,
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                cartTotal,
                cartCount,
                loading: false
            }}
        >

            {children}

        </CartContext.Provider>
    );
}

export function useCart() {

    return useContext(CartContext);
}