import React, { useEffect } from "react";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/middlesection/Main";
import { Routes, Route, useNavigate } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import { useParams } from "react-router-dom";
import ProductList from "../../components/productList/ProductList";
import AddProduct from "../../components/addProduct/AddProduct";
import AddCategory from "../../components/addCategory/AddCategory";
import CategoryList from "../../components/categoryList/CategoryList";
import { useDispatch } from "react-redux";
import { checkToken } from "../../redux/login/loginSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    } else {
      navigate(`/${param.id}/login`);
    }
  }, [dispatch, navigate, param.id]);

  return (
    <div className="container">
      <Sidebar param={param} />
      <Routes>
        <Route exact path="/dashboard" element={<Main />} />
        <Route path="products" element={<ProductList param={param} />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="categories" element={<CategoryList param={param} />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="branches" element={<CategoryList />} />
        <Route path="add-branch" element={<Main />} />
      </Routes>
      <Leftbar />
    </div>
  );
};

export default Dashboard;
