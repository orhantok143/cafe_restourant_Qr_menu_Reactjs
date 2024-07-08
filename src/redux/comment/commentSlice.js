// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllComment = createAsyncThunk(
    'comment/getAll',
    async () => {
        const response = await axiosInstance.get("user/comment")
        return response.data

    }
);
const initialState = {
    comment: null,
    success: false,
    loading: false,
    error: false,
    message: ""
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllComment.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(getAllComment.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.comment = action.payload
            })
            .addCase(getAllComment.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default commentSlice.reducer;
