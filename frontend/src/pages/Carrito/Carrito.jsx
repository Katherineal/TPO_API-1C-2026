import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MainLayout from '../../layouts/MainLayout';
import './Carrito.css';

function Carrito() {
  const { items, loading, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal } = useCart();
  
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
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
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <h2>Tu carrito esta vacio</h2>
            <p>Agrega productos para comenzar tu compra</p>
            <Link to="/productos" className="btn-continue-shopping">
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
          <span className="carrito-count">{cartCount} producto{cartCount !== 1 ? 's' : ''}</span>
        </header>

        <div className="carrito-container">
          <div className="carrito-items">
            {items.map(item => (
              <article key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image || item.imagen} alt={item.name || item.nombre} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name || item.nombre}</h3>
                  <p className="cart-item-description">{item.description || item.descripcion}</p>
                  <span className="cart-item-price-mobile">{formatPrice(item.price || item.precio)}</span>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Disminuir cantidad"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-price">
                  <span className="price-unit">{formatPrice(item.price || item.precio)}</span>
                  {item.quantity > 1 && (
                    <span className="price-total">{formatPrice((item.price || item.precio) * item.quantity)}</span>
                  )}
                </div>

                <button 
                  className="cart-item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Eliminar ${item.name || item.nombre} del carrito`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </article>
            ))}

            <div className="carrito-actions">
              <button className="btn-clear-cart" onClick={handleClearCart}>
                Vaciar carrito
              </button>
              <Link to="/productos" className="btn-continue">
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
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
              </span>
            </div>

            {shipping > 0 && (
              <p className="shipping-notice">
                Agrega {formatPrice(50 - cartTotal)} mas para envio gratis
              </p>
            )}
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button className="btn-checkout">
              Proceder al pago
            </button>

            <div className="payment-methods">
              <span className="payment-label">Metodos de pago:</span>
              <div className="payment-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
            </div>

            <div className="security-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Compra 100% segura</span>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}

export default Carrito;
