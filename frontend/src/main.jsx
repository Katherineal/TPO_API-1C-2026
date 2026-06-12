import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
// Importa el Provider de react-redux y el store configurado
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <BrowserRouter>

            {/* Proveedor global de Redux para dar acceso al store a toda la aplicación */}
            <Provider store={store}>

                <CartProvider>

                    <FavoriteProvider>

                        <App />

                    </FavoriteProvider>

                </CartProvider>

            </Provider>

        </BrowserRouter>

    </React.StrictMode>
);
