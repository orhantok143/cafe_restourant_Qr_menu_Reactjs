import "./App.css"
import React, { useEffect } from 'react';
import Hero from "./pages/hero/Hero"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import FoodDetail from './pages/food/FoodDetail';
import Products from './pages/product/Products';
import Login from './pages/login/Login';
import { useDispatch } from "react-redux";
import { getAllBusinesses } from "./redux/businesses/businessesSlice";
import { getAllCategories } from "./redux/category/categorySlice";
import { getAllProducts } from "./redux/products/productSlice";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBusinesses())
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id/login" element={<Login />} />
        <Route path="/:id/admin" element={<Dashboard />} />
        <Route path="/:id/menu" element={<Products />} />
        <Route path="/:id/anasayfa" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

