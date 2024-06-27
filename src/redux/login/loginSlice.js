import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("admin/login", userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("user/register", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for login with Google
export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("admin/loginwithgoogle", userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for token checking
export const checkToken = createAsyncThunk(
    'auth/checkToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("admin/checktoken", { token });
            console.log("checktoken::", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    user: null,
    token: null,
    success: false,
    loading: false,
    error: false,
    message: '',
    googleUser: null,
    newUser: null,
    tokenValid: false,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.tokenValid = true;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.tokenValid = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.tokenValid = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.isAuthenticated = false;
                state.tokenValid = false;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.tokenValid = true;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.isAuthenticated = false;
                state.tokenValid = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.newUser = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            })
            .addCase(checkToken.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.userFind;
                state.tokenValid = true;
                state.isAuthenticated = true;
            })
            .addCase(checkToken.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.tokenValid = false;
                state.isAuthenticated = false;
            });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
