import "./App.css"
import React from 'react';
import Hero from "./pages/hero/Hero"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/product/Products';
import Login from './pages/login/Login';
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {




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

