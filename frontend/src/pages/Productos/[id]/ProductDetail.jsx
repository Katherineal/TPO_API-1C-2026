import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { useCart } from '../../../context/CartContext';
import { useFavorite } from '../../../context/FavoriteContext';
import API from '../../../services/api';

import './ProductDetail.css';

function ProductDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart, cartCount } = useCart();

  const { addToFavorite, isFavorite } =
    useFavorite();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [isAdding, setIsAdding] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const token =
    localStorage.getItem('userId');

  const isFav =
    isFavorite(parseInt(id));

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/productos/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.log('Error fetching product:', err);
      setError('No se pudo cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {

    if (!token) {

      alert(
        'Debes iniciar sesión para agregar productos al carrito.'
      );

      navigate('/login');

      return;
    }

    if (product.stock === 0) return;

    const cartItem = {
      ...product,
      quantity
    };

    addToCart(cartItem);

    setIsAdding(true);

    setTimeout(() => {

      setIsAdding(false);

    }, 2000);
  };

  const handleToggleFavorite = () => {

    if (!token) {

      alert(
        'Debes iniciar sesión para agregar favoritos.'
      );

      navigate('/login');

      return;
    }

    addToFavorite(product);
  };

  const handleQuantityChange = (e) => {

    const value =
      parseInt(e.target.value);

    if (
      value > 0 &&
      value <= product.stock
    ) {

      setQuantity(value);
    }
  };

  const isOutOfStock =
    product?.stock === 0;

  const isLowStock =
    product?.stock > 0 &&
    product?.stock <= 5;

  if (loading) {

    return (

      <MainLayout cartCount={cartCount}>

        <div className="product-detail-container">

          <div className="loading">
            Cargando producto...
          </div>

        </div>

      </MainLayout>
    );
  }

  if (error || !product) {

    return (

      <MainLayout cartCount={cartCount}>

        <div className="product-detail-container">

          <div className="error-message">

            <h2>
              Producto no encontrado
            </h2>

            <p>{error}</p>

            <button
              className="btn-back"
              onClick={() =>
                navigate('/productos')
              }
            >
              Volver a Productos
            </button>

          </div>

        </div>

      </MainLayout>
    );
  }

  const image =
    product.imagen_url &&
      product.imagen_url.trim() !== ""
      ? product.imagen_url
      : "https://placehold.co/600x600?text=Producto";

  return (

    <MainLayout cartCount={cartCount}>

      <div className="product-detail-container">

        <button
          className="btn-back"
          onClick={() =>
            navigate('/productos')
          }
        >
          ← Volver
        </button>

        <div className="product-detail-content">

          <div className="product-detail-image">

            <img
              src={image}
              alt={product.nombre}
            />

          </div>

          <div className="product-detail-info">

            <div className="product-detail-header">

              <h1>
                {product.nombre}
              </h1>

              {
                isOutOfStock && (

                  <span className="badge-stock out-of-stock">
                    Agotado
                  </span>
                )
              }

              {
                isLowStock &&
                !isOutOfStock && (

                  <span className="badge-stock low-stock">
                    Bajo Stock
                  </span>
                )
              }

            </div>

            <div className="product-detail-price">

              <span className="price">
                ${product.precio}
              </span>

            </div>

            <div className="product-detail-description">

              <h3>
                Descripción
              </h3>

              <p>
                {product.descripcion}
              </p>

            </div>

            <div className="product-detail-specs">

              <div className="spec">

                <span className="label">
                  Stock disponible:
                </span>

                <span className="value">
                  {product.stock} unidades
                </span>

              </div>

              <div className="spec">

                <span className="label">
                  Categoría:
                </span>

                <span className="value">
                  {product.categoria}
                </span>

              </div>

            </div>

            <div className="product-detail-actions">

              {
                !isOutOfStock && (

                  <div className="quantity-selector">

                    <label htmlFor="quantity">
                      Cantidad:
                    </label>

                    <select
                      id="quantity"
                      value={quantity}
                      onChange={
                        handleQuantityChange
                      }
                    >

                      {
                        Array.from(
                          {
                            length:
                              product.stock
                          },
                          (_, i) => (

                            <option
                              key={i + 1}
                              value={i + 1}
                            >
                              {i + 1}
                            </option>
                          )
                        )
                      }

                    </select>

                  </div>
                )
              }

              <div className="action-buttons">

                <button
                  className={`
                    btn-add-to-cart
                    ${isAdding
                      ? 'adding'
                      : ''
                    }
                    ${isOutOfStock
                      ? 'disabled'
                      : ''
                    }
                  `}
                  disabled={isOutOfStock}
                  onClick={
                    handleAddToCart
                  }
                >

                  <span>

                    {
                      isAdding
                        ? '✓ Agregado'
                        : 'Agregar al carrito'
                    }

                  </span>

                </button>

                <button
                  className={`
                    btn-favorite
                    ${isFav
                      ? 'active'
                      : ''
                    }
                  `}
                  onClick={
                    handleToggleFavorite
                  }
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={
                      isFav
                        ? 'currentColor'
                        : 'none'
                    }
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

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default ProductDetail;