// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async () => {
        const response = await axiosInstance.get("product")
        return response.data
    }
);
const initialState = {
    products: null,
    success: false,
    loading: false,
    error: false,
    message: ""
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default productSlice.reducer;
