import axios from "axios";

const API = axios.create({
    baseURL: ""
});

// API.interceptors.request.use(

//     (config) => {

//         const token =
//             localStorage.getItem("token");

//         if (token && token !== "undefined" && token !== "null") {

//             config.headers.Authorization =
//                 `Bearer ${token}`;
//         }

//         return config;
//     }
// );

API.defaults.withCredentials = true;

// Profe: Interceptor para atrapar errores 401 o 403 (No autorizado) desde el backend.
// Si el token expiró o la sesión es inválida, borramos el localStorage y forzamos el login.
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error("Sesión expirada o inválida. Cerrando sesión automáticamente...");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;
