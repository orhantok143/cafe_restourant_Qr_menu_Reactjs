import "./App.css"
import React from 'react';
import Hero from "./pages/hero/Hero"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/product/Products';
import Login from './pages/login/Login';
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {




  return (
    <BrowserRouter>
      <Routes>
        <ScrollToTop/>
        <Route path="/:id/login" element={<Login />} />
        <Route path="/:id/menu" element={<Products />} />
        <Route path="/:id/anasayfa" element={<Hero />} />
        <Route path="/:id/profile" element={<User />} />
        <Route path="/:id/admin/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

