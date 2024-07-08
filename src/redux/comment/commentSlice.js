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

export const addComment = createAsyncThunk(
    'comment/addComment',
    async (comment) => {
        const response = await axiosInstance.post(`user/comment/post/${comment.postId}`, comment)
        console.log(response.data);
        return response.data.comment
    }
)

export const likeComment = createAsyncThunk(
    'comment/likecomment',
    async (id) => {
        const response = await axiosInstance.post(`user/comment/like/${id}`)
        return response.data
    }
)


const initialState = {
    comment: null,
    addComment: null,
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
            }).addCase(addComment.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
            })
            .addCase(addComment.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default commentSlice.reducer;
