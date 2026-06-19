import { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCart,
    addToCartAsync,
    removeFromCartAsync,
    clearCartAsync,
    updateQuantityAsync,
} from "../redux/cartSlice";

const CartContext = createContext();

export function CartProvider({ children }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Cargar el carrito inicial si el usuario está logueado
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId && isAuthenticated) {
            dispatch(fetchCart(userId));
        }
    }, [dispatch, isAuthenticated]);

    const addToCart = (product) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Debes iniciar sesión para agregar productos al carrito");
            return;
        }
        dispatch(addToCartAsync({ 
            userId, 
            productId: product.id, 
            quantity: product.quantity || 1 
        }));
    };

    const removeFromCart = (id) => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        
        // Find the itemId for this product id
        const item = cartItems.find(item => item.id === id);
        if (item && item.itemId) {
            dispatch(removeFromCartAsync({ userId, itemId: item.itemId }));
        }
    };

    const clearCart = () => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        dispatch(clearCartAsync(userId));
    };

    const updateQuantity = (id, newQuantity) => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const item = cartItems.find(item => item.id === id);
        if (item && item.itemId) {
            dispatch(updateQuantityAsync({ userId, itemId: item.itemId, quantity: newQuantity }));
        }
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
        loading,
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