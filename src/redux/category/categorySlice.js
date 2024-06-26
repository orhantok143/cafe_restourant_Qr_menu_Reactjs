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

export const addCategory = createAsyncThunk(
    "categories/add-category",
    async (data) => {
        const response = await axiosInstance.post("category/create", data)
        return response.data
    }
)


const initialState = {
    categories: null,
    success: false,
    loading: false,
    error: false,
    message: "",
    currentSubCategory: "Kahvaltı",
    currentCategory: "Yemek"
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        currentSubCategory: (state, action) => {
            state.currentSubCategory = action.payload
        },
        currentCategory: (state, action) => {
            state.currentCategory = action.payload

        }
    },


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
            }).addCase(addCategory.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true

            })
            .addCase(addCategory.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});

export const { currentCategory, currentSubCategory } = categoriesSlice.actions

export default categoriesSlice.reducer;
