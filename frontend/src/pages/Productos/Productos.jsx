import { useState, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductCard from "../../components/ProductCard/ProductCard";

import productService from "../../services/productService";

import "./Productos.css";

function Productos() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const data =
                await productService.getAll();

            setProducts(data);

        } catch (err) {

            console.log(err);

            setError(
                "Error al cargar productos"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <MainLayout>

            <div className="productos-page">

                <h1>
                    Productos
                </h1>

                {
                    loading && (

                        <p>
                            Cargando productos...
                        </p>
                    )
                }

                {
                    error && (

                        <p>
                            {error}
                        </p>
                    )
                }

                <div className="productos-grid">

                    {
                        products.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    }

                </div>

            </div>

        </MainLayout>
    );
}

export default Productos;