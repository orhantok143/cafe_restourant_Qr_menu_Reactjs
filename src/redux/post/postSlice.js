// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllPost = createAsyncThunk(
    'post/getAll',
    async () => {
        const response = await axiosInstance.get("user/post")
        return response.data
    }
);
const initialState = {
    post: null,
    success: false,
    loading: false,
    error: false,
    message: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.post = action.payload
            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default postSlice.reducer;
