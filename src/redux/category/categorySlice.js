// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllCategories = createAsyncThunk(
    'categories/getAll',
    async () => {
        const response = await axiosInstance.get("category")
        return response.data
    }
);
const initialState = {
    categories: null,
    success: false,
    loading: false,
    error: false,
    message: ""
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.categories = action.payload
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default categoriesSlice.reducer;
