import { Link } from 'react-router-dom';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Tecnología de Última Generación
            </h1>
            
            <p className="hero-subtitle">
              Descubre los productos más innovadores y de mejor calidad. Diseñados para tu estilo de vida moderno.
            </p>

            <div className="hero-buttons">
              <Link to="/productos" className="btn btn-primary">
                Ver Productos
              </Link>
              
              <Link to="/" className="btn btn-secondary">
                Más Información
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img 
              src="https://p.turbosquid.com/ts-thumb/ko/b7tq8g/s6/iphone15andmacbook3/jpg/1698842969/1920x1080/fit_q87/af0b143e1fdd42a50cb2d209395d0e6f8aa60b42/iphone15andmacbook3.jpg" 
              alt="iPhone 15 y MacBook - Última tecnología"
              className="hero-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
