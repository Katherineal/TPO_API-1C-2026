import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <BrowserRouter>

            <CartProvider>

                <FavoriteProvider>

                    <App />

                </FavoriteProvider>

            </CartProvider>

        </BrowserRouter>

    </React.StrictMode>
);
