import React from "react";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/middlesection/Main";
import { Routes, Route } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import { useParams } from "react-router-dom";
import List from "../../components/list/List";
import ProductList from "../../components/productList/ProductList";
import AddProduct from "../../components/addProduct/AddProduct";
import AddCategory from "../../components/addCategory/AddCategory";

const Dashboard = () => {
  const param = useParams();
  return (
    <div className="container">
      <Sidebar param={param} />
      <Routes>
        <Route exact path="/dashboard" element={<Main />} />
        <Route path="products" element={<ProductList param={param} />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="categories" element={<List />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="branches" element={<List />} />
        <Route path="add-branch" element={<Main />} />
      </Routes>
      <Leftbar />
    </div>
  );
};

export default Dashboard;
