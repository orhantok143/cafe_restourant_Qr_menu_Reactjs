// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async (businessId) => {
        const response = await axiosInstance.get(`product?businessId=${businessId}`)
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

export const ratingProduct = createAsyncThunk(
    "product/rate-product",
    async (data) => {
        const response = await axiosInstance
            .post(`product/${data.id}/rating`, data.data)
        return response.data
    }
)

// Ürünü güncellemek için async thunk
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance
                .put(`product/${productData.id}`, productData.values);
            console.log("response::", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCommentProduct = createAsyncThunk(
    "Product/commentProduct",
    async (data) => {

        const response = await axiosInstance.post(`product/${data.productId}/comment`, data)
        console.log("response::",response.data);

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
    favorited: [],
    editproduct: null
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
        },
        editProduct: (state, action) => {
            state.editproduct = action.payload
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

                state.message = action.error
            }).addCase(addProduct.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false

            })
            .addCase(addProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
            }).addCase(deleteProduct.pending, (state) => {

                state.error = false
                state.success = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = false

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = state.error
            }).addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                // Ürün listesini güncelle
                // const index = state.products?.products?.findIndex((product) => product._id === action.payload._id);

            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });;
    }
});


export const { setSearch, initialLoad, editProduct } = productSlice.actions

export default productSlice.reducer;
