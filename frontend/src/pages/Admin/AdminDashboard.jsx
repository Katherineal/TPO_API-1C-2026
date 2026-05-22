import { useState, useEffect } from "react";

import productService
    from "../../services/productService";

import AdminLayout
    from "../../layouts/AdminLayout";

import "./AdminDashboard.css";

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

        <AdminLayout>

            <div className="admin-page">

                <h1>
                    Panel Administrador
                </h1>

                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Producto</th>

                            <th>Precio</th>

                            <th>Stock</th>

                            <th>Acción</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.map((product) => (

                                <tr
                                    key={product.id}
                                >

                                    <td>
                                        {product.id}
                                    </td>

                                    <td>
                                        {product.nombre}
                                    </td>

                                    <td>
                                        $
                                        {product.precio}
                                    </td>

                                    <td>

                                        {
                                            editingId ===
                                            product.id ? (

                                                <input
                                                    type="number"
                                                    value={stock}
                                                    onChange={(e) =>
                                                        setStock(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            ) : (

                                                product.stock
                                            )
                                        }

                                    </td>

                                    <td>

                                        {
                                            editingId ===
                                            product.id ? (

                                                <button
                                                    onClick={() =>
                                                        handleSave(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Guardar
                                                </button>

                                            ) : (

                                                <button
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
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
}

export default AdminDashboard;