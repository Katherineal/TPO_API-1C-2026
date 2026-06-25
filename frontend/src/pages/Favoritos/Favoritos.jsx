import { useNavigate } from 'react-router-dom';
import { useFavorite } from '../../context/FavoriteContext';
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem';
import './Favoritos.css';
import MainLayout from '../../layouts/MainLayout';

function Favoritos() {
  const { favoriteItems } = useFavorite();
  const token = localStorage.getItem('userId');
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="favoritos-container">
        <div className="favoritos-empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>Debes iniciar sesión</h2>
          <p>Inicia sesión para ver tus productos favoritos</p>
          <button
            className="btn-login"
            onClick={() => navigate("/login")}
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="favoritos-container">
      <div className="favoritos-header">
        <h1>Mis Favoritos</h1>
        <p className="favoritos-count">
          {favoriteItems.length} producto{favoriteItems.length !== 1 ? "s" : ""} en favoritos
        </p>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="favoritos-empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>Sin favoritos aún</h2>
          <p>Agrega productos a favoritos para verlos aquí</p>
          <button
            className="btn-continue-shopping"
            onClick={() => navigate("/productos")}
          >
            Ver Productos
          </button>
        </div>
      ) : (
        <div className="favoritos-list">
          {favoriteItems.map(product => (
            <FavoriteItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
    </MainLayout>
  );
}

export default Favoritos;
