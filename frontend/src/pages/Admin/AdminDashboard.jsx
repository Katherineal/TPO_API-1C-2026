import { useState, useEffect } from "react";

import productService
    from "../../services/productService";

import "./AdminDashboard.css";
import MainLayout from "../../layouts/MainLayout";

function AdminDashboard() {

    const [products, setProducts] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [stock, setStock] =
        useState("");

    useEffect(() => {

        verificarAdmin();

        loadProducts();

    }, []);

    const verificarAdmin = () => {

        const role =
            localStorage.getItem("role");

        if (role !== "ADMIN") {

            window.location.href =
                "/login";
        }
    };

    const loadProducts = async () => {

        try {

            const data =
                await productService.getAll();

            setProducts(data);

        } catch (err) {

            console.log(err);
        }
    };

    const handleEdit = (product) => {

        setEditingId(product.id);

        setStock(product.stock);
    };

    const handleSave = async (id) => {

        try {

            await productService.updateStock(

                id,
                stock
            );

            setEditingId(null);

            loadProducts();

        } catch (err) {

            console.log(err);
        }
    };

    return (
            <MainLayout>
            <div className="admin-page">

                <div className="admin-header">

                    <h1>
                        Panel Administrador
                    </h1>

                    <p>
                        Gestiona productos y stock
                    </p>

                </div>

                <table className="products-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Producto</th>

                            <th>Precio</th>

                            <th>Stock</th>

                            <th>Estado</th>

                            <th>Acción</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.map((product) => {
                                let stockStatus = 'in-stock';
                                if (product.stock === 0) {
                                    stockStatus = 'out-of-stock';
                                } else if (product.stock <= 5) {
                                    stockStatus = 'low-stock';
                                }

                                return (
                                    <tr
                                        key={product.id}
                                    >

                                        <td className="id-cell">
                                            {product.id}
                                        </td>

                                        <td className="product-cell">
                                            <img src={product.imagen_url} alt={product.nombre} />
                                            <span>{product.nombre}</span>
                                        </td>

                                        <td className="price-cell" data-label="Precio">
                                            ${product.precio}
                                        </td>

                                        <td className="stock-cell" data-label="Stock">

                                            {
                                                editingId ===
                                                product.id ? (

                                                    <input
                                                        type="number"
                                                        className="stock-input"
                                                        value={stock}
                                                        onChange={(e) =>
                                                            setStock(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                ) : (

                                                    <span className="stock-value">
                                                        {product.stock}
                                                    </span>
                                                )
                                            }

                                        </td>

                                        <td data-label="Estado" className="no-label">
                                            <span className={`status-badge ${stockStatus}`}>
                                                {stockStatus === 'in-stock' && 'En stock'}
                                                {stockStatus === 'low-stock' && 'Stock bajo'}
                                                {stockStatus === 'out-of-stock' && 'Agotado'}
                                            </span>
                                        </td>

                                        <td className="action-buttons no-label" data-label="Acciones">

                                            {
                                                editingId ===
                                                product.id ? (

                                                    <>
                                                        <button
                                                            className="save-btn"
                                                            onClick={() =>
                                                                handleSave(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            className="cancel-btn"
                                                            onClick={() =>
                                                                setEditingId(null)
                                                            }
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>

                                                ) : (

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            handleEdit(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                )
                                            }

                                        </td>

                                    </tr>
                                );
                            })
                        }

                    </tbody>

                </table>

            </div>
            </MainLayout>
    );
}

export default AdminDashboard;
