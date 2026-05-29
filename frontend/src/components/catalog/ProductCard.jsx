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
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
