import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    clearCart as clearCartAction,
    updateQuantity as updateQuantityAction,
} from "../redux/cartSlice";

const CartContext = createContext();

export function CartProvider({ children }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const addToCart = (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para agregar productos al carrito");
            return;
        }
        dispatch(addToCartAction(product));
    };

    const removeFromCart = (id) => {
        dispatch(removeFromCartAction(id));
    };

    const clearCart = () => {
        dispatch(clearCartAction());
    };

    const updateQuantity = (id, newQuantity) => {
        dispatch(updateQuantityAction({ id, quantity: newQuantity }));
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
    );

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const value = {
        items: cartItems,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartTotal,
        cartCount,
        loading: false,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}