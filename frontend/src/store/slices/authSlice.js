import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// Thunk para manejar el login
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await API.post("/api/auth/login", credentials);
            
            // Guardamos en localStorage para persistencia básica
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", credentials.email);
            localStorage.setItem("userId", response.data.id);

            return {
                token: response.data.token,
                role: response.data.role,
                email: credentials.email,
                id: response.data.id
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error al iniciar sesión"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        try {
            await API.post("/api/auth/logout");
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor", error);
        } finally {
            dispatch(logoutLocal());
        }
    }
);

const initialState = {
    user: {
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
    },
    token: null, // Ya no guardamos el token
    isAuthenticated: !!localStorage.getItem("userId"), // Usamos el ID como prueba de autenticación
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutLocal: (state) => {
            state.user = { email: null, role: null };
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            localStorage.removeItem("userId");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = {
                    email: action.payload.email,
                    role: action.payload.role
                };
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logoutLocal, clearError } = authSlice.actions;
export default authSlice.reducer;
