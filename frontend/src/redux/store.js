import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Configura el store centralizado de Redux para la aplicación.
// Aquí se registran todos los reducers (como el cartReducer) que manejarán el estado global.
export const store = configureStore({
    reducer: {
        // Asocia el estado del carrito al reducer que definimos en cartSlice.js
        cart: cartReducer,
    },
});

export default store;
