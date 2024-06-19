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

            })
            .addCase(addMyFavorite.fulfilled, (state, action) => {

                state.favorited = action.payload
            })
            .addCase(addMyFavorite.rejected, (state, action) => {

                state.message = action.error.message;
            });
    }
});


export const { setSearch, initialLoad } = productSlice.actions

export default productSlice.reducer;
