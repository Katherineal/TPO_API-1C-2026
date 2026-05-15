import React from 'react';
import ProductCard from './components/ProductCard';
import productsData from './data/products.json';
import './App.css';

function App() {
  const handleBuy = (product) => {
    alert(`Agregaste al carrito: ${product.title}\nPrecio: $${product.price}`);
  };

  return (
    <div className="App" style={{ padding: '20px', backgroundColor: '#ebebeb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontFamily: 'sans-serif' }}>
        Resultados de Búsqueda
      </h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productsData.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onBuy={handleBuy}
          >
            {/* Ejemplo de prop children */}
            <p style={{ margin: 0 }}>
              <strong>Garantía:</strong> 12 meses de fábrica.
            </p>
            <p style={{ margin: '4px 0 0 0', color: '#00a650' }}>
              ✓ Llega mañana
            </p>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;
