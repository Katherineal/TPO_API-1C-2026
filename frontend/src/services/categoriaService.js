import API from "./api";

const categoriaService = {
    getAll: async () => {
        const response = await API.get("/api/categorias");
        return response.data;
    },
};

export default categoriaService;
