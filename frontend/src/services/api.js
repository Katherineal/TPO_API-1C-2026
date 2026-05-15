const API_URL = 'http://localhost:8080/api';

/**
 * Función centralizada para hacer peticiones al backend.
 * Automáticamente adjunta el token JWT si existe y maneja errores HTTP.
 * 
 * @param {string} endpoint - La ruta de la API (ej: '/productos')
 * @param {object} options - Opciones de fetch (method, body, etc.)
 */
export async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (err) {
    throw new Error('Error de red o CORS: ' + err.message);
  }

  // Intentamos parsear el JSON, o devolvemos null si no hay cuerpo
  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    // No content (204) o respuesta no JSON
  }

  if (!response.ok) {
    // Construimos un error amigable
    const errorMsg = data?.message || response.statusText || 'Error en la petición';
    throw new Error(errorMsg);
  }

  return data;
}

// Métodos de conveniencia
export const api = {
  get: (endpoint) => fetchApi(endpoint),
  post: (endpoint, body) => fetchApi(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => fetchApi(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => fetchApi(endpoint, { method: 'DELETE' })
};
