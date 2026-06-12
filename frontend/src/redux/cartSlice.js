import { createSlice } from "@reduxjs/toolkit";

// Carga el estado inicial del carrito desde el localStorage del navegador si existe.
// Esto permite que el carrito persista si el usuario recarga la página.
const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        return [];
    }
};

// Define el estado inicial con la lista de items vacía o cargada del storage.
const initialState = {
    items: loadCartFromStorage(),
};

// Crea el slice del carrito que agrupa el estado, los reducers y genera las acciones automáticamente.
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Reducer para agregar un producto al carrito
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === product.id
            );

            // Si el payload contiene una cantidad específica la usa; si no, por defecto agrega 1 item.
            const quantityToAdd = product.quantity || 1;

            if (existingProduct) {
                // Si el producto ya existe en el carrito, incrementa su cantidad.
                existingProduct.quantity += quantityToAdd;
            } else {
                // Si el producto es nuevo, lo agrega al carrito con la cantidad especificada.
                state.items.push({
                    ...product,
                    quantity: quantityToAdd,
                });
            }
            // Guarda los cambios actualizados en localStorage.
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        // Reducer para eliminar un producto del carrito mediante su ID
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            // Guarda los cambios actualizados en localStorage.
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        // Reducer para vaciar por completo el carrito
        clearCart: (state) => {
            state.items = [];
            // Guarda los cambios actualizados en localStorage.
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        // Reducer para actualizar la cantidad específica de un producto en el carrito
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === id
            );

            if (existingProduct && quantity > 0) {
                existingProduct.quantity = quantity;
            }
            // Guarda los cambios actualizados en localStorage.
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
    },
});

// Exporta los creadores de acciones generados automáticamente por Redux Toolkit.
export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
} = cartSlice.actions;

// Exporta el reducer principal del slice para registrarlo en el store.
export default cartSlice.reducer;
