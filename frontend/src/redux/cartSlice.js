import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// Thunks asíncronos para interactuar con el backend

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/api/carrito/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToCartAsync = createAsyncThunk(
    "cart/addToCartAsync",
    async ({ userId, productId, quantity = 1 }, { rejectWithValue }) => {
        try {
            const response = await API.post(`/api/carrito/${userId}/agregar?productoId=${productId}&cantidad=${quantity}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeFromCartAsync = createAsyncThunk(
    "cart/removeFromCartAsync",
    async ({ userId, itemId }, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/api/carrito/${userId}/items/${itemId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearCartAsync = createAsyncThunk(
    "cart/clearCartAsync",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/api/carrito/${userId}/vaciar`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateQuantityAsync = createAsyncThunk(
    "cart/updateQuantityAsync",
    async ({ userId, itemId, quantity }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/api/carrito/${userId}/items/${itemId}/cantidad?nuevaCantidad=${quantity}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Mapea los items del CarritoDto (del backend) al formato que usa el frontend.
// El backend devuelve ItemCarritoDto que tiene: id, productoId, productoNombre, cantidad, precioUnitario, subtotal.
const mapBackendCartToItems = (carritoDto) => {
    if (!carritoDto || !carritoDto.items) return [];
    return carritoDto.items.map(item => ({
        id: item.productoId,
        itemId: item.id, // ID del item en el carrito, necesario para borrar/actualizar cantidad en backend
        nombre: item.productoNombre,
        precio: item.precioUnitario,
        imagen: "", // backend DTO doesn't include image, might need to fetch separately or rely on existing store if possible. For now fallback to empty or handle in UI
        quantity: item.cantidad,
        subtotal: item.subtotal
    }));
};

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Reducer fallback por si el usuario desloguea y se quiere limpiar el estado
        resetCartState: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = mapBackendCartToItems(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // addToCartAsync
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = mapBackendCartToItems(action.payload);
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // removeFromCartAsync
            .addCase(removeFromCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = mapBackendCartToItems(action.payload);
            })
            .addCase(removeFromCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // clearCartAsync
            .addCase(clearCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = mapBackendCartToItems(action.payload);
            })
            .addCase(clearCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateQuantityAsync
            .addCase(updateQuantityAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateQuantityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = mapBackendCartToItems(action.payload);
            })
            .addCase(updateQuantityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
