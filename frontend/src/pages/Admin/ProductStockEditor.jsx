import { useState } from "react";

import API from "../../services/api";

function ProductStockEditor({ product }) {

    const [stock, setStock] =
        useState(product.stock);

    const actualizarStock = async () => {

        try {

            await API.put(

                `/api/productos/${product.id}`,

                {
                    ...product,
                    stock: stock
                }
            );

            alert("Stock actualizado");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h3>
                {product.nombre}
            </h3>

            <input
                type="number"
                value={stock}
                onChange={(e) =>
                    setStock(e.target.value)
                }
            />

            <button
                onClick={actualizarStock}
            >
                Guardar
            </button>

        </div>
    );
}

export default ProductStockEditor;