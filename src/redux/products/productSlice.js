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
        console.log(response.data);   
        return response.data
    }
)


export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async (id) => {
        const response = await axiosInstance.delete(`product/${id}`)  
        console.log(response.data.deletedProduct);
              
        return response.data.deletedProduct
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
            return response.data.updatedProduct
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCommentProduct = createAsyncThunk(
    "Product/commentProduct",
    async (data) => {
        const response = await axiosInstance.post(`product/${data.productId}/comment`, data)
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
                state.favorited=action.payload
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
                state.products.push(action.payload)

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
                state.products = state.products?.filter(p => p._id !== action.payload._id);
            
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
            
                // Find the index of the product to be updated
                const index = state.products?.findIndex((product) => product._id === action.payload._id);
            
                // Update the product if it exists
                if (index !== -1 && index !== undefined) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });;
    }
});


export const { setSearch, initialLoad, editProduct } = productSlice.actions

export default productSlice.reducer;
