import React, { useEffect } from "react";
import "./products.css";
import Food from "../food/Food";
import BottomBar from "../../components/BottomBar";
import Header from "../../components/header/Header";
import SubCategory from "../../components/SubCategory";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

import {
  selectActiveCategories,
  selectActiveProducts,
} from "../../redux/selectors";
import { checkToken } from "../../redux/login/loginSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../../redux/products/productSlice";
import { getAllCategories } from "../../redux/category/categorySlice";

const Products = () => {
  const isLogin = true;
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(selectActiveProducts);
  const categories = useSelector(selectActiveCategories);
  const { tokenValid, logedUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!products.produstc && !categories.categories) {
      dispatch(getAllProducts());
      dispatch(getAllCategories());
    }
  }, [dispatch, products, categories]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    }
  }, [dispatch, param.id, navigate]);

  const c = categories?.categories
    ?.map((c) => c.subCategory.flat())
    .flat()
    .sort((a, b) => {
      // Tarihlerin karşılaştırılması için getTime() kullanılıyor
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return (
    <div className="_bg">
      {products?.loading || categories?.loading ? <Loading /> : null}
      <Header tokenValid={tokenValid} user={logedUser} />
      {isLogin &&
        c?.map((c, index) => (
          <React.Fragment key={c._id || index}>
            <div className="category">
              <h4 className="category_title"> {c.title} </h4>
            </div>
            <div className="_products_food">
              {products?.products
                ?.filter((p) => c && p.subCategory.title === c.title)
                .map((product) => (
                  <Food
                    key={product._id}
                    product={product}
                    tokenValid={tokenValid}
                    param={param}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      <div className="_buttomGroup">
        <SubCategory />
        <BottomBar />
      </div>
    </div>
  );
};

export default Products;
