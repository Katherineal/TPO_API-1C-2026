import API from "./api";

const favoritoService = {
    getByUsuario: async (usuarioId) => {
        const response = await API.get(`/api/favoritos/usuario/${usuarioId}`);
        return response.data;
    },

    add: async (usuarioId, productoId) => {
        const response = await API.post(`/api/favoritos/usuario/${usuarioId}/producto/${productoId}`);
        return response.data;
    },

    remove: async (usuarioId, productoId) => {
        await API.delete(`/api/favoritos/usuario/${usuarioId}/producto/${productoId}`);
    },
};

export default favoritoService;
