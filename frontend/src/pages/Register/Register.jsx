import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import '../Login/Login.css';
import API from "../../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {

      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.name) {

      newErrors.name =
        'El nombre es requerido';

    } else if (
      formData.name.length < 2
    ) {

      newErrors.name =
        'Minimo 2 caracteres';
    }

    if (!formData.apellido) {
      newErrors.apellido = 'El apellido es requerido';
  } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'Minimo 2 caracteres';
  }

    if (!formData.email) {

      newErrors.email =
        'El email es requerido';

    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {

      newErrors.email =
        'Email invalido';
    }

    if (!formData.password) {

      newErrors.password =
        'La contraseña es requerida';

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        'Minimo 6 caracteres';
    }

    if (
      !formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        'Confirma tu contraseña';

    } else if (
      formData.password !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {

      newErrors.terms =
        'Debes aceptar los terminos';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const getPasswordStrength = () => {

    const password =
      formData.password;

    if (!password)
      return {
        level: 0,
        text: '',
        color: ''
      };

    let strength = 0;

    if (password.length >= 6)
      strength++;

    if (password.length >= 8)
      strength++;

    if (/[A-Z]/.test(password))
      strength++;

    if (/[0-9]/.test(password))
      strength++;

    if (/[^A-Za-z0-9]/.test(password))
      strength++;

    if (strength <= 2)
      return {
        level: strength,
        text: 'Debil',
        color: '#ef4444'
      };

    if (strength <= 3)
      return {
        level: strength,
        text: 'Media',
        color: '#f59e0b'
      };

    return {
      level: strength,
      text: 'Fuerte',
      color: '#10b981'
    };
  };

  const passwordStrength =
    getPasswordStrength();

    const handleSubmit = async (e) => {

      e.preventDefault();
  
      if (!validateForm()) return;
  
      try {
  
          setIsLoading(true);
  
          const response = await API.post(
              "/api/auth/register",
              {
                  nombre: formData.name,
                  apellido: formData.apellido,
                  email: formData.email,
                  password: formData.password
              }
          );
  
          console.log(response.data);
  
          alert("Usuario registrado correctamente");
  
          navigate("/login");
  
      } catch (error) {
  
          console.log(error);
  
          setErrors({
              general:
                  error.response?.data ||
                  "Error al registrar usuario"
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
            {
  errors.general && (
    <div className="login-error">
      {errors.general}
    </div>
  )
}
              <h1>
                Crear Cuenta
              </h1>

              <p>
                Unete a TechStore y disfruta de ofertas exclusivas
              </p>

            </div>

            {
              errors.general && (

                <div className="login-error">

                  {errors.general}

                </div>
              )
            }

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >

              <div className="form-group">

                <label htmlFor="name">
                  Nombre
                </label>

                <div className="input-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="input-icon"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={
                      errors.name
                        ? 'error'
                        : ''
                    }
                  />
                </div>

                {
                  errors.name && (
                    <span className="error-message">
                      {errors.name}
                    </span>
                  )
                }

              </div>

              <div className="form-group">
                <label htmlFor="apellido">
                    Apellido
                </label>

                <div className="input-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="input-icon"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>

                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Tu apellido"
                        className={
                            errors.apellido
                                ? 'error'
                                : ''
                        }
                    />
                </div>

                {
                    errors.apellido && (
                        <span className="error-message">
                            {errors.apellido}
                        </span>
                    )
                }
            </div>

              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

                <div className="input-wrapper">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="input-icon"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={
                      errors.email
                        ? 'error'
                        : ''
                    }
                  />

                </div>

                {
                  errors.email && (
                    <span className="error-message">
                      {errors.email}
                    </span>
                  )
                }

              </div>

              <div className="form-group">

                <label htmlFor="password">
                  Contraseña
                </label>

                <div className="input-wrapper">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="input-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4"/>
                  </svg>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crea una contraseña"
                    className={
                      errors.password
                        ? 'error'
                        : ''
                    }
                  />

                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    {
                      showPassword
                        ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                          </svg>
                        )
                        : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )
                    }

                  </button>

                </div>

                {
                  formData.password && (

                    <div className="password-strength">

                      <div className="strength-bars">

                        {
                          [1,2,3,4,5].map(level => (

                            <div
                              key={level}
                              className={`strength-bar ${
                                level <= passwordStrength.level
                                  ? 'active'
                                  : ''
                              }`}
                              style={{
                                backgroundColor:
                                  level <= passwordStrength.level
                                    ? passwordStrength.color
                                    : undefined
                              }}
                            />

                          ))
                        }

                      </div>

                      <span
                        className="strength-text"
                        style={{
                          color:
                            passwordStrength.color
                        }}
                      >

                        {
                          passwordStrength.text
                        }

                      </span>

                    </div>
                  )
                }

                {
                  errors.password && (
                    <span className="error-message">
                      {errors.password}
                    </span>
                  )
                }

              </div>

              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirmar contraseña
                </label>

                <div className="input-wrapper">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="input-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4"/>
                  </svg>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className={
                      errors.confirmPassword
                        ? 'error'
                        : ''
                    }
                  />

                </div>

                {
                  errors.confirmPassword && (
                    <span className="error-message">
                      {
                        errors.confirmPassword
                      }
                    </span>
                  )
                }

              </div>

              <div className="terms-wrapper">

                <label className="checkbox-label">

                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) =>
                      setAcceptTerms(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Acepto los terminos y condiciones
                  </span>

                </label>

                {
                  errors.terms && (
                    <span className="error-message">
                      {errors.terms}
                    </span>
                  )
                }

              </div>

              <button
                type="submit"
                className={`
                  btn-submit
                  ${
                    isLoading
                      ? 'loading'
                      : ''
                  }
                `}
                disabled={isLoading}
              >

                {
                  isLoading
                    ? (
                      <span className="loading-spinner"></span>
                    )
                    : (
                      'Crear Cuenta'
                    )
                }

              </button>

            </form>

            <p className="auth-footer">

              Ya tienes una cuenta? <Link to="/login">Inicia sesion</Link>

            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Register;
