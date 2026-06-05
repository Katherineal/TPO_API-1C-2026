import { Link } from 'react-router-dom';
import './BentoHero.css';

export function BentoHero() {
  return (
    <section className="bento-hero">
      <div className="bento-grid">
        
        {/* Main large item - Professional Unsplash Laptop */}
        <Link to="/productos" className="bento-item item-main">
          <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" alt="Laptops para Profesionales" className="bento-img" />
          <div className="bento-content">
            <h2>Estaciones de Trabajo</h2>
            <p>Descubre nuestra colección curada de laptops de alto rendimiento para creadores y desarrolladores.</p>
            <span className="bento-link">Explorar Laptops</span>
          </div>
        </Link>

        {/* Top right item - Professional Unsplash Headphones */}
        <Link to="/productos" className="bento-item item-secondary">
          <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1888&auto=format&fit=crop" alt="Audio Premium" className="bento-img" />
          <div className="bento-content">
            <h2>Audio de Estudio</h2>
            <p>Sonido envolvente sin distracciones.</p>
            <span className="bento-link">Ver Auriculares</span>
          </div>
        </Link>

        {/* Bottom right item - Professional Unsplash Smartwatch */}
        <Link to="/productos" className="bento-item item-tertiary">
          <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop" alt="Smartwatches" className="bento-img" style={{ filter: 'brightness(0.6)' }} />
          <div className="bento-content">
            <h2>Wearables</h2>
            <p>Monitorea tu salud con precisión milimétrica.</p>
            <span className="bento-link">Ver Relojes</span>
          </div>
        </Link>

      </div>
    </section>
  );
}
