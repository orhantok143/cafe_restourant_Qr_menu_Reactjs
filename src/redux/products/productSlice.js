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

export const addMyFavorite = createAsyncThunk(
    "product/addMyFavorite",
    async (product) => {
        const response = await axiosInstance.post(`product/${product._id}/addtofavorites`)
        return response.data.user.myFavorites
    }
)

export const addProduct = createAsyncThunk(
    "product/add-product",
    async (data) => {
        const response = await axiosInstance.post("product/create", data)
        return response.data
    }
)


export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async (id) => {
        const response = await axiosInstance.delete(`product/${id}`)
        return response.data
    }
)


const initialState = {
    products: null,
    success: false,
    loading: false,
    error: false,
    message: "",
    search: "",
    favorited: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        initialLoad: (state, action) => {
            state.favorited = action.payload;
        }
    },


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
            }).addCase(addMyFavorite.pending, (state) => {
                state.loading = true
            })
            .addCase(addMyFavorite.fulfilled, (state, action) => {

                state.favorited = action.payload
            })
            .addCase(addMyFavorite.rejected, (state, action) => {

                state.message = action.error
            }).addCase(addProduct.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
            }).addCase(deleteProduct.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = state.error
            });
    }
});


export const { setSearch, initialLoad } = productSlice.actions

export default productSlice.reducer;
