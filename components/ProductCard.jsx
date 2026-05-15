import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onBuy, children }) {
  // Función para formatear el precio a moneda
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculamos el descuento si existe precio original
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="meli-card">
      <div className="meli-card-image-container">
        <img src={product.image} alt={product.title} className="meli-card-image" />
      </div>
      <div className="meli-card-info">
        <h3 className="meli-card-title">{product.title}</h3>
        
        <div className="meli-card-price-section">
          {product.originalPrice && (
            <span className="meli-card-original-price">{formatPrice(product.originalPrice)}</span>
          )}
          <div className="meli-card-current-price-row">
            <span className="meli-card-price">{formatPrice(product.price)}</span>
            {discount > 0 && <span className="meli-card-discount">{discount}% OFF</span>}
          </div>
          {product.installments && (
            <span className="meli-card-installments">{product.installments}</span>
          )}
          {product.shipping && (
            <span className="meli-card-shipping">{product.shipping}</span>
          )}
          {product.seller && (
            <span className="meli-card-seller">Por {product.seller}</span>
          )}
        </div>
        
        <div className="meli-card-actions">
          <button className="meli-card-buy-btn" onClick={() => onBuy(product)}>
            Comprar ahora
          </button>
        </div>
        
        {/* Renderizado de prop children */}
        {children && (
          <div className="meli-card-children">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
