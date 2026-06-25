import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Productos from "../pages/Productos/Productos";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Home from "../pages/Home/Home";
import Carrito from "../pages/Carrito/Carrito";
import Favoritos from "../pages/Favoritos/Favoritos";
import ProductDetail from "../pages/Productos/[id]/ProductDetail";
import Perfil from "../pages/Perfil/Perfil";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/productos" element={<Productos />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/carrito" element={<Carrito />} />

            <Route path="/favoritos" element={<Favoritos />} />

            <Route path="/productos/:id" element={<ProductDetail />} /> // enrutamiento dinamico para mostrar el detalle de un 
            producto específico, usando el parámetro :id para identificar el producto

            <Route path="/perfil" element={<Perfil />} />


        </Routes>
    );
}

export default AppRoutes;