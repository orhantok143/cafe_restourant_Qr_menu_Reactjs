
import React from 'react';
import Hero from "./pages/hero/Hero"
import Food from "./pages/food/Food"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FoodDetail from './pages/food/FoodDetail';
import Products from './pages/product/Products';



const App = () => {
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path="detail" element={<FoodDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

