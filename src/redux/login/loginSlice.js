import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("admin/login", userData);
            localStorage.setItem('token', response.data.token);
            console.log("ResponseFrom Login::", response.data);

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
            localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydet
            console.log("Token From With Google::", response.data);
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
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    logedUser: null,
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
            state.tokenValid = true; // Token geçerliliği ayarlanıyor
            localStorage.setItem('token', action.payload.token); // LocalStorage'a token kaydediliyor
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.tokenValid = false; // Token geçerliliği kaldırılıyor
            localStorage.removeItem('token'); // LocalStorage'dan token kaldırılıyor
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
                state.logedUser = action.payload.user;
                state.token = action.payload.token
                state.isAuthenticated = true; // Kullanıcı giriş yaptı
                state.tokenValid = true; // Token geçerli
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.isAuthenticated = false; // Giriş başarısız
                state.tokenValid = false; // Token geçersiz
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
                state.logedUser = action.payload;
                state.isAuthenticated = true; // Google ile giriş yaptı
                state.tokenValid = true; // Token geçerli
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.isAuthenticated = false; // Giriş başarısız
                state.tokenValid = false; // Token geçersiz
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
                state.token = action.payload.token
                state.logedUser = action.payload.userFind
                state.tokenValid = true; // Token doğrulama sonucunu buradan al
                state.isAuthenticated = true; // Doğrulama başarılıysa kullanıcı doğrulanmış olur
            })
            .addCase(checkToken.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.tokenValid = false; // Token geçersiz
                state.isAuthenticated = false; // Kullanıcı doğrulanmamış olur
            });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
