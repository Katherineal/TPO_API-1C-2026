import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <CartProvider>
                        <FavoriteProvider>
                            <App />
                        </FavoriteProvider>
                    </CartProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
