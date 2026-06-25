import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MainLayout from '../../layouts/MainLayout';
import './Carrito.css';

function Carrito() {

  const {
    items = [],
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount = 0,
    cartTotal = 0
  } = useCart();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(value);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {

    if (newQuantity < 1) return;

    try {

      await updateQuantity(itemId, newQuantity);

    } catch (err) {

      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (itemId) => {

    try {

      await removeFromCart(itemId);

    } catch (err) {

      console.error('Error removing item:', err);
    }
  };

  const handleClearCart = async () => {

    try {

      await clearCart();

    } catch (err) {

      console.error('Error clearing cart:', err);
    }
  };

  if (!isLoggedIn) {

    return (

      <MainLayout cartCount={0}>

        <div className="carrito-page">

          <div className="carrito-empty">

            <h2>Necesitas iniciar sesion</h2>

            <p>
              Debes estar logueado para acceder al carrito
            </p>

            <Link
              to="/login"
              className="btn-continue-shopping"
            >
              Iniciar sesion
            </Link>

          </div>

        </div>

      </MainLayout>
    );
  }

  if (loading) {

    return (

      <MainLayout cartCount={cartCount}>

        <div className="carrito-page">

          <div className="loading-state">

            <div className="spinner"></div>

            <p>Cargando carrito...</p>

          </div>

        </div>

      </MainLayout>
    );
  }

  if (items.length === 0) {

    return (

      <MainLayout cartCount={cartCount}>

        <div className="carrito-page">

          <div className="carrito-empty">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>

            <h2>Tu carrito esta vacio</h2>

            <p>
              Agrega productos para comenzar tu compra
            </p>

            <Link
              to="/productos"
              className="btn-continue-shopping"
            >
              Ver Productos
            </Link>

          </div>

        </div>

      </MainLayout>
    );
  }

  return (

    <MainLayout cartCount={cartCount}>

      <div className="carrito-page">

        <header className="carrito-header">

          <h1>Tu Carrito</h1>

          <span className="carrito-count">

            {cartCount} producto{cartCount !== 1 ? 's' : ''}

          </span>

        </header>

        <div className="carrito-container">

          <div className="carrito-items">

            {items.map(item => (

              <article key={item.id} className="cart-item">

                <div className="cart-item-image">

                  <img
                    src={
                      item.image ||
                      item.imagen ||
                      item.imagen_url
                    }
                    alt={item.name || item.nombre}
                  />

                </div>

                <div className="cart-item-details">

                  <h3 className="cart-item-name">

                    {item.name || item.nombre}

                  </h3>

                  <p className="cart-item-description">

                    {item.description || item.descripcion}

                  </p>

                  <span className="cart-item-price-mobile">

                    {formatPrice(item.price || item.precio)}

                  </span>

                </div>

                <div className="cart-item-quantity">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span className="qty-value">

                    {item.quantity}

                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <div className="cart-item-price">

                  <span className="price-unit">

                    {formatPrice(
                      item.price || item.precio
                    )}

                  </span>

                  {item.quantity > 1 && (

                    <span className="price-total">

                      {formatPrice(
                        (item.price || item.precio)
                        * item.quantity
                      )}

                    </span>
                  )}

                </div>

                <button
                  className="cart-item-remove"
                  onClick={() =>
                    handleRemoveItem(item.id)
                  }
                >
                  X
                </button>

              </article>
            ))}

            <div className="carrito-actions">

              <button
                className="btn-clear-cart"
                onClick={handleClearCart}
              >
                Vaciar carrito
              </button>

              <Link
                to="/productos"
                className="btn-continue"
              >
                Seguir comprando
              </Link>

            </div>

          </div>

          <aside className="carrito-summary">

            <h2>Resumen del pedido</h2>

            <div className="summary-row">

              <span>Subtotal</span>

              <span>{formatPrice(cartTotal)}</span>

            </div>

            <div className="summary-row">

              <span>Envio</span>

              <span>

                {shipping === 0
                  ? 'Gratis'
                  : formatPrice(shipping)
                }

              </span>

            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">

              <span>Total</span>

              <span>{formatPrice(total)}</span>

            </div>

            <button className="btn-checkout">

              Proceder al pago

            </button>

          </aside>

        </div>

      </div>

    </MainLayout>
  );
}

export default Carrito;
