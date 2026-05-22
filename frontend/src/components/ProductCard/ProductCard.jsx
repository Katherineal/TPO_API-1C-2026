import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./ProductCard.css";

function ProductCard({ product }) {

    const { addToCart } = useCart();

    const navigate = useNavigate();

    const [imageLoaded, setImageLoaded] =
        useState(false);

    const [isAdding, setIsAdding] =
        useState(false);

    // Verifica si el usuario está logueado
    const token =
        localStorage.getItem("token");

    // Usa la imagen del backend
    const image =
        product.imagen_url &&
        product.imagen_url.trim() !== ""
            ? product.imagen_url
            : "https://placehold.co/600x600?text=Producto";

    const isOutOfStock =
        product.stock === 0;

    const isLowStock =
        product.stock > 0 &&
        product.stock <= 5;

    const handleAddToCart = () => {

        // Si no está logueado
        if (!token) {

            alert(
                "Debes iniciar sesión para agregar productos al carrito."
            );

            navigate("/login");

            return;
        }

        if (isOutOfStock) return;

        addToCart(product);

        setIsAdding(true);

        setTimeout(() => {

            setIsAdding(false);

        }, 800);
    };

    return (

        <article className="product-card">

            {
                isLowStock &&
                !isOutOfStock && (

                    <span
                        className="
                        product-badge
                        low-stock
                    "
                    >
                        Últimas unidades
                    </span>
                )
            }

            <div
                className="
                product-image-container
                "
            >

                <div
                    className={`
                        product-image-wrapper
                        ${
                            imageLoaded
                            ? "loaded"
                            : ""
                        }
                    `}
                >

                    <img
                        src={image}
                        alt={product.nombre}
                        className="
                        product-image
                        "
                        onLoad={() =>
                            setImageLoaded(
                                true
                            )
                        }
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/600x600?text=Sin+Imagen";
                        }}
                    />

                </div>

                {
                    isOutOfStock && (

                        <div
                            className="
                            out-of-stock-overlay
                            "
                        >

                            <span>
                                Agotado
                            </span>

                        </div>
                    )
                }

            </div>

            <div
                className="
                product-content
                "
            >

                <h3
                    className="
                    product-name
                    "
                >

                    {product.nombre}

                </h3>

                <p
                    className="
                    product-description
                    "
                >

                    {product.descripcion}

                </p>

                <div
                    className="
                    product-pricing
                    "
                >

                    <span
                        className="
                        product-price
                        "
                    >

                        $
                        {product.precio}

                    </span>

                </div>

                <div
                    className="
                    product-stock
                    "
                >

                    <span
                        className={`
                            stock-indicator
                            ${
                                isOutOfStock
                                ? "out"
                                : isLowStock
                                ? "low"
                                : "available"
                            }
                        `}
                    />

                    <span
                        className="
                        stock-text
                        "
                    >

                        {
                            isOutOfStock
                            ? "Sin stock"
                            : `${product.stock} disponibles`
                        }

                    </span>

                </div>

                <button
                    className={`
                        add-to-cart-btn
                        ${
                            isAdding
                            ? "adding"
                            : ""
                        }
                        ${
                            isOutOfStock
                            ? "disabled"
                            : ""
                        }
                    `}
                    disabled={
                        isOutOfStock
                    }
                    onClick={
                        handleAddToCart
                    }
                >

                    <span
                        className="
                        btn-icon
                        "
                    >

                        {
                            isAdding
                            ? "✓"
                            : "🛒"
                        }

                    </span>

                    <span
                        className="
                        btn-text
                        "
                    >

                        {
                            isAdding
                            ? "Agregado"
                            : "Agregar al carrito"
                        }

                    </span>

                </button>

            </div>

        </article>
    );
}

export default ProductCard;