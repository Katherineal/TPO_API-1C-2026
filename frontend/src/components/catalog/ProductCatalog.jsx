import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import ProductCard from './ProductCard';
import './Catalog.css';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definimos la función asíncrona dentro del useEffect
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Hacemos el GET al catálogo público
        const response = await api.get('/api/productos');
        const data = response.data || response; // depending on interceptor

        
        setProducts(data);
      } catch (err) {
        setError(`Ocurrió un error al cargar el catálogo de productos. Detalle: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // La ejecutamos
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-container">Cargando productos...</div>;
  }

  if (error) {
    return (
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">

      
      {products.length === 0 ? (
        <p>No hay productos disponibles por el momento.</p>
      ) : (
        <div className="catalog-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
