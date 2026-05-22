import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import './Login.css';
import API from "../../services/api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contrasena es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {

        setIsLoading(true);

        const response = await API.post(
            "/api/auth/login",
            {
                email: formData.email,
                password: formData.password
            }
        );

        console.log(response.data);

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "role",
            response.data.role
        );

        localStorage.setItem(
            "email",
            formData.email
        );

        if (
            response.data.role === "ADMIN"
        ) {

            navigate("/admin");

        } else {

            navigate("/");
        }

    } catch (error) {

        console.log(error);

        setErrors({
            general:
                "Email o contraseña incorrectos"
        });

    } finally {

        setIsLoading(false);
    }
};

  return (
    <MainLayout>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Iniciar Sesion</h1>
              <p>Bienvenido de nuevo a TechStore</p>
            </div>
            {errors.general && (
  <div className="login-error">
    {errors.general}
  </div>
)}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={errors.email ? 'error' : ''}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contrasena</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tu contrasena"
                    className={errors.password ? 'error' : ''}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <a href="/forgot-password" className="forgot-link">Olvidaste tu contrasena?</a>
              </div>

              <button 
                type="submit" 
                className={`btn-submit ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Iniciar Sesion'
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>o continua con</span>
            </div>

            <div className="social-buttons">
              <button className="btn-social google">
                <span>G</span>
                Google
              </button>
              <button className="btn-social apple">
                <span></span>
                Apple
              </button>
            </div>

            <p className="auth-footer">
              No tienes una cuenta? <Link to="/register">Registrate</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
