import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";

import "./ProductCard.css";

function ProductCard({ product }) {

    const { addToCart } = useCart();
    const { addToFavorite, isFavorite } = useFavorite();
    const navigate = useNavigate();

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // El token ya no se guarda en localStorage; la sesión se detecta por userId
    const isLoggedIn = !!localStorage.getItem("userId");

    const favorite = isFavorite(product.id);

    const image =
        product.imagen_url && product.imagen_url.trim() !== ""
            ? product.imagen_url
            : product.imagenUrl && product.imagenUrl.trim() !== ""
            ? product.imagenUrl
            : "https://placehold.co/600x600?text=Producto";

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    const handleToggleFavorite = () => {
        if (!isLoggedIn) {
            alert("Debes iniciar sesión para agregar favoritos.");
            navigate("/login");
            return;
        }
        addToFavorite(product);
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            navigate("/login");
            return;
        }

        if (isOutOfStock) return;

        addToCart(product);
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 800);
    };

    console.log(product);
    return (
        <article className="product-card">

            {isLowStock && !isOutOfStock && (
                <span className="product-badge low-stock">
                    Últimas unidades
                </span>
            )}

            <div className="product-image-container">
                <Link to={`/productos/${product.id}`} className="product-image-link">
                    <div className={`product-image-wrapper ${imageLoaded ? "loaded" : ""}`}>
                        <img
                            src={image}
                            alt={product.nombre}
                            className="product-image"
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x600?text=Sin+Imagen";
                            }}
                        />
                    </div>
                </Link>

                {isOutOfStock && (
                    <div className="out-of-stock-overlay">
                        <span>Agotado</span>
                    </div>
                )}
            </div>

            <div className="product-content">
                <Link to={`/productos/${product.id}`} className="product-name-link">
                    <h3 className="product-name">{product.nombre}</h3>
                </Link>

                <p className="product-description">{product.descripcion}</p>

                <div className="product-pricing">
                    <span className="product-price">${product.precio}</span>
                </div>

                <div className="product-stock">
                    <span className={`stock-indicator ${isOutOfStock ? "out" : isLowStock ? "low" : "available"}`} />
                    <span className="stock-text">
                        {isOutOfStock ? "Sin stock" : `${product.stock} disponibles`}
                    </span>
                </div>

                <div className="product-actions">
                    <button
                        className={`add-to-cart-btn ${isAdding ? "adding" : ""} ${isOutOfStock ? "disabled" : ""}`}
                        disabled={isOutOfStock}
                        onClick={handleAddToCart}
                    >
                        <span className="btn-icon">{isAdding ? "✓" : ""}</span>
                        <span className="btn-text">{isAdding ? "Agregado" : "Agregar al carrito"}</span>
                    </button>

                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={handleToggleFavorite}
                        title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                        aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={favorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
