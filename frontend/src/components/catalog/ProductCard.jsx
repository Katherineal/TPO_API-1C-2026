import './Catalog.css';

export default function ProductCard({ product }) {
  // Manejo de imagen por defecto si no tiene URL
  const imageUrl = product.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  return (
    <div className="card product-card">
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.nombre} 
          className="product-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=Enlace+Roto';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">${product.precio.toFixed(2)}</span>
          <span className="product-stock">Stock: {product.stock}</span>
        </div>
        <button className="product-add-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
