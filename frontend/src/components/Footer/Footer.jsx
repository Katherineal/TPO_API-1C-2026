import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">TechStore</div>
          <p className="footer-description">
            Diseño atemporal y tecnología de vanguardia para tu día a día. Calidad premium en cada detalle.
          </p>
          <div className="footer-newsletter">
            <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" />
            <button className="newsletter-btn">→</button>
          </div>
        </div>

        {/* Shop Section */}
        <div className="footer-section">
          <h4 className="footer-title">Tienda</h4>
          <ul className="footer-links">
            <li><Link to="/productos" className="footer-link">Todos los Productos</Link></li>
            <li><Link to="/productos?categoria=laptops" className="footer-link">Laptops & PC</Link></li>
            <li><Link to="/productos?categoria=audio" className="footer-link">Audio Premium</Link></li>
            <li><Link to="/productos?categoria=smartwatches" className="footer-link">Smartwatches</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h4 className="footer-title">Nosotros</h4>
          <ul className="footer-links">
            <li><Link to="#" className="footer-link">Nuestra Historia</Link></li>
            <li><Link to="#" className="footer-link">Sustentabilidad</Link></li>
            <li><Link to="#" className="footer-link">Trabaja con nosotros</Link></li>
            <li><Link to="#" className="footer-link">Prensa</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4 className="footer-title">Soporte</h4>
          <ul className="footer-links">
            <li><Link to="#" className="footer-link">Contacto</Link></li>
            <li><Link to="#" className="footer-link">Preguntas Frecuentes</Link></li>
            <li><Link to="#" className="footer-link">Envíos y Entregas</Link></li>
            <li><Link to="#" className="footer-link">Devoluciones</Link></li>
          </ul>
        </div>

      </div>
      
      {/* Copyright Section */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2026 TechStore Boutique. Todos los derechos reservados.
        </div>
        <div className="footer-legal">
          <Link to="#">Privacidad</Link>
          <Link to="#">Términos</Link>
        </div>
      </div>
    </footer>
  );
}
