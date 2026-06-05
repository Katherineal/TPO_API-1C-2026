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
        let data = await api.get('/productos');
        
        // Si no hay productos en la base de datos, creamos 4 productos random de muestra
        if (!data || data.length === 0) {
          data = [
            {
              id: 1,
              nombre: "iPhone 15 Pro Max",
              descripcion: "Titanio forjado. Chip A17 Pro. La cámara más avanzada. Un salto gigantesco en Apple.",
              precio: 1199.00,
              stock: 15,
              imagenUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop"
            },
            {
              id: 2,
              nombre: "MacBook Pro M3 Max",
              descripcion: "Potencia descomunal. Batería que dura todo el día. La laptop más profesional del mundo.",
              precio: 2499.00,
              stock: 8,
              imagenUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop"
            },
            {
              id: 3,
              nombre: "AirPods Max",
              descripcion: "Audio espacial personalizado con seguimiento dinámico. Cancelación activa de ruido.",
              precio: 549.00,
              stock: 30,
              imagenUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop"
            },
            {
              id: 4,
              nombre: "Apple Watch Ultra 2",
              descripcion: "Diseñado para la aventura. GPS de precisión de doble frecuencia. Caja de titanio.",
              precio: 799.00,
              stock: 22,
              imagenUrl: "https://images.unsplash.com/photo-1678393529341-94fc31eaaf97?q=80&w=1964&auto=format&fit=crop"
            }
          ];
        }
        
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
