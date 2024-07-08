import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import loginReducer from './login/loginSlice';
import categoryReducer from './category/categorySlice';
import businessesReducer from './businesses/businessesSlice';
import postReducer from './post/postSlice';
import commentReducer from './comment/commentSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        auth: loginReducer,
        businesses: businessesReducer,
        post: postReducer,
        comment: commentReducer
    }
});