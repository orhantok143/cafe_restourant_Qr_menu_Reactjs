
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config';

// Async thunk to fetch users from an API
export const getAllBusinesses = createAsyncThunk(
    'businesses/getAll',
    async () => {
        const response = await axiosInstance.get("admin")
        return response.data.data
    }
);

export const addBusiness = createAsyncThunk(
    'businesses/addBusiness',
    async(data)=>{
        const response = await axiosInstance.post("admin/create",data)
        console.log(response.data)
        return response.data
    }
)


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
            }).addCase(addBusiness.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(addBusiness.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
            })
            .addCase(addBusiness.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    }
});


export default businessesSlice.reducer;
