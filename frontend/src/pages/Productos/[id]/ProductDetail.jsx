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
    localStorage.getItem('token');

  const isFav =
    isFavorite(parseInt(id));

  const getFallbackData = () => [
    {
      id: 1,
      nombre: "iPhone 15 Pro Max",
      descripcion: "Titanio forjado. Chip A17 Pro. La cámara más avanzada. Un salto gigantesco en Apple.",
      precio: 1199.00,
      stock: 15,
      imagen_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      nombre: "MacBook Pro M3 Max",
      descripcion: "Potencia descomunal. Batería que dura todo el día. La laptop más profesional del mundo.",
      precio: 2499.00,
      stock: 8,
      imagen_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      nombre: "AirPods Max",
      descripcion: "Audio espacial personalizado con seguimiento dinámico. Cancelación activa de ruido.",
      precio: 549.00,
      stock: 30,
      imagen_url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      nombre: "Apple Watch Ultra 2",
      descripcion: "Diseñado para la aventura. GPS de precisión de doble frecuencia. Caja de titanio.",
      precio: 799.00,
      stock: 22,
      imagen_url: "https://images.unsplash.com/photo-1678393529341-94fc31eaaf97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      nombre: "iPad Pro M4",
      descripcion: "Increíblemente delgado. Pantalla Ultra Retina XDR. Rendimiento desbordante.",
      precio: 999.00,
      stock: 18,
      imagen_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      nombre: "Mac Studio",
      descripcion: "Potencia asombrosa. M2 Ultra. Todo un estudio creativo en tu escritorio.",
      precio: 1999.00,
      stock: 5,
      imagen_url: "https://images.unsplash.com/photo-1655821568261-26c36f51f49e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 7,
      nombre: "Pro Display XDR",
      descripcion: "Pantalla Retina 6K de 32 pulgadas. Un rango dinámico extremo nunca visto.",
      precio: 4999.00,
      stock: 2,
      imagen_url: "https://images.unsplash.com/photo-1610945264803-c22b6272bc8e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 8,
      nombre: "AirPods Pro 2",
      descripcion: "Cancelación Activa de Ruido el doble de potente. Ajuste adaptable perfecto.",
      precio: 249.00,
      stock: 45,
      imagen_url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 9,
      nombre: "HomePod",
      descripcion: "Audio computacional avanzado. Acústica deslumbrante que llena tu habitación.",
      precio: 299.00,
      stock: 12,
      imagen_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 10,
      nombre: "Magic Keyboard",
      descripcion: "Escritura increíblemente cómoda y precisa. Diseño inalámbrico y recargable.",
      precio: 99.00,
      stock: 60,
      imagen_url: "https://images.unsplash.com/photo-1587826693892-0b1e42b291db?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 11,
      nombre: "Magic Mouse",
      descripcion: "Superficie Multi-Touch. Se desliza a la perfección sobre tu escritorio.",
      precio: 79.00,
      stock: 100,
      imagen_url: "https://images.unsplash.com/photo-1527814050087-17933a3832c6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 12,
      nombre: "Apple TV 4K",
      descripcion: "La mejor televisión y lo mejor de Apple. Experiencia de cine en tu hogar.",
      precio: 129.00,
      stock: 35,
      imagen_url: "https://images.unsplash.com/photo-1593305841991-0537d6cb5e10?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // Bypass for fallback data to allow viewing details of mock premium products
      const fallbackProducts = getFallbackData();
      const fallbackProduct = fallbackProducts.find(p => p.id === parseInt(id));

      if (fallbackProduct) {
        setTimeout(() => {
          setProduct(fallbackProduct);
          setError(null);
          setLoading(false);
        }, 300);
        return;
      }

      // If not in fallback, try hitting the real API
      const response = await API.get(`/api/productos/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.log('Error fetching product:', err);
      setError('No se pudo cargar el producto');
    } finally {
      if (!getFallbackData().find(p => p.id === parseInt(id))) {
        setLoading(false);
      }
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