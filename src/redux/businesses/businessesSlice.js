// features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

// Async thunk to fetch users from an API
export const getAllBusinesses = createAsyncThunk(
    'businesses/getAll',
    async () => {
        const response = await axios.get(baseUrl + "admin")
        return response.data.data
    }
);
const initialState = {
    businesses: null,
    success: false,
    loading: false,
    error: false,
    message: ""
}

const businessesSlice = createSlice({
    name: 'businesses',
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllBusinesses.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(getAllBusinesses.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.businesses = action.payload
            })
            .addCase(getAllBusinesses.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default businessesSlice.reducer;
