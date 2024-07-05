import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../../redux/login/loginSlice";
import ProductEdit from "../../components/productEdit/ProductEdit";
import { selectActiveAuth } from "../../redux/selectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(selectActiveAuth);

  useEffect(() => {
    if (token) {
      dispatch(checkToken(token)).finally(() => {
        setLoading(false);
      });
    } else {
      navigate(`/${param.id}/login`);
    }
  }, [dispatch, navigate, param.id, token]);

  useEffect(() => {
    if (!loading) {
      if (user?.role !== "Admin" && token) {
        navigate(`/${param.id}/menu`);
      }
    }
  }, [navigate, param.id, user?.role, loading, token]);
  return (
    <div className="container">
      <Sidebar param={param} />
      <Routes>
        <Route exact path="/dashboard" element={<Main />} />
        <Route path="products" element={<ProductList param={param} />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product" element={<ProductEdit />} />
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
