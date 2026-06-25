import { useState, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductCard from "../../components/ProductCard/ProductCard";

import productService from "../../services/productService";

import "./Productos.css";

// ORM para mapear la clase Usuario a una tabla en la base de datos, con campos como id, nombre, apellido, email, password, role, y una relación OneToMany con pedidos. Implementa UserDetails para integración con Spring Security.
// relaciones con cardinalidad (one to many, many to one, many to many )

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
      const data = await productService.getAll();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError("No se pudieron cargar los productos. " + err.message);
      setProducts([]);
      setLoading(false);
    }
  };

  return (

    <MainLayout>

      <div className="productos-page">

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