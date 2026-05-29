import { useFavorite } from '../../context/FavoriteContext';
import './FavoriteItem.css';

function FavoriteItem({ product }) {
  const { removeFromFavorite } = useFavorite();

  const image =
    product.imagen_url && product.imagen_url.trim() !== ''
      ? product.imagen_url
      : 'https://placehold.co/120x120?text=Producto';

    const formatPrice = (value) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(value);
    };

  return (
    <div className="favorite-item">
      <div className="favorite-item-image">
        <img src={image} alt={product.nombre} />
      </div>

      <div className="favorite-item-info">
        <h3 className="favorite-item-name">{product.nombre}</h3>
        <p className="favorite-item-description">{product.descripcion}</p>
        <div className="favorite-item-meta">
          <span className="favorite-item-stock">
            {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
          </span>
        </div>
      </div>

      <div className="favorite-item-price">
        <p className="price">{formatPrice(product.precio)}</p>
      </div>

      <div className="favorite-item-actions">
        <button
          className="btn-remove-favorite"
          onClick={() => removeFromFavorite(product.id)}
          title="Quitar de favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Quitar
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
