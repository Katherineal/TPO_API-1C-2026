import API from "./api";

const productService = {

    // Profe: Acá hacemos la petición GET para traer todos los productos de la base de datos
    getAll: async () => {
        const response = await API.get("/api/productos");
        return response.data;
    },

    // Profe: Acá implementamos la creación de un nuevo producto enviando un POST
    create: async (productData) => {
        const response = await API.post("/api/productos", productData);
        return response.data;
    },

    // Profe: Este método actualiza SOLO el stock de un producto (buscándolo primero por ID)
    updateStock: async (productId, newStock) => {
        const productResponse = await API.get(`/api/productos/${productId}`);
        const product = productResponse.data;
        product.stock = newStock;
        
        // Profe: Mandamos el PUT con el producto entero pero con el stock modificado
        const response = await API.put(`/api/productos/${productId}`, product);
        return response.data;
    },

    // Profe: Acá agregamos la función para actualizar TODOS los campos de un producto
    update: async (productId, productData) => {
        const response = await API.put(`/api/productos/${productId}`, productData);
        return response.data;
    },

    // Profe: Por último, esta función manda el DELETE para borrar el producto permanentemente
    delete: async (productId) => {
        const response = await API.delete(`/api/productos/${productId}`);
        return response.data;
    }
};

export default productService;