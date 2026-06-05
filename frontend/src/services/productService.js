import API from "./api";

const productService = {

    getAll: async () => {

        const response =
            await API.get("/api/productos");

        return response.data;
    },

    create: async (productData) => {
        const response = await API.post("/api/productos", productData);
        return response.data;
    },

    updateStock: async (
        productId,
        newStock
    ) => {

        const productResponse =
            await API.get(
                `/api/productos/${productId}`
            );

        const product =
            productResponse.data;

        product.stock = newStock;

        const response =
            await API.put(

                `/api/productos/${productId}`,

                product
            );

        return response.data;
    }
};

export default productService;