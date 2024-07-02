import React, { useEffect, useMemo, useState } from "react";
import "./main.css";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { SiGooglepubsub } from "react-icons/si";
import { FaCommentDots } from "react-icons/fa6";
import List from "../list/List";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveBusinesses,
  selectActiveCategories,
  selectActiveProducts,
} from "../../redux/selectors";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../redux/products/productSlice";
import { getAllCategories } from "../../redux/category/categorySlice";
import { getAllBusinesses } from "../../redux/businesses/businessesSlice";

const Main = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [whichCard, setWhichCard] = useState("Product");
  const products = useSelector(selectActiveProducts);
  const categories = useSelector(selectActiveCategories);
  const branch = useSelector(selectActiveBusinesses);

  const memoizedProductList = useMemo(
    () => ({
      head: "Ürünler",
      header: ["ÜRÜN İSMİ", "ANA KATEGORİ", "FİYAT"],
      items: products.products,
    }),
    [products]
  );

  const memoizedCategoryList = useMemo(
    () => ({
      head: "Kategoriler",
      header: ["KATEGORİ İSMİ", "ALT KATEGORİLER"],
      items: categories.categories,
    }),
    [categories]
  );

  const memoizedBranchList = useMemo(
    () => ({
      head: "Şubeler",
      header: ["İŞLETME İSMİ", "ŞUBELER"],
      items: branch.filter((branch) => branch._id === param.id),
    }),
    [branch, param.id]
  );

  const memoizedCommentList = useMemo(
    () => ({
      head: "Yorumlar",
      header: ["YORUM YAPAN", "ÜRÜN", "YORUM"],
      items: products.products?.map((p) => p.comments).flat(),
    }),
    []
  );

  const handleOnClick = (data) => {
    setWhichCard(data);
  };

  const [header, setHeader] = useState(memoizedProductList);

  useEffect(() => {
    if (whichCard === "Product") {
      setHeader(memoizedProductList);
    }
    if (whichCard === "Category") {
      setHeader(memoizedCategoryList);
    }
    if (whichCard === "Comment") {
      setHeader(memoizedCommentList);
    }
    if (whichCard === "Branch") {
      setHeader(memoizedBranchList);
    }
  }, [
    whichCard,
    memoizedProductList,
    memoizedCategoryList,
    memoizedCommentList,
    memoizedBranchList,
  ]);

  useEffect(() => {
    if (!products?.products) {
      dispatch(getAllProducts());
    }
    if (!categories?.categories) {
      dispatch(getAllCategories());
    }
    if (!branch?.businesses) {
      dispatch(getAllBusinesses());
    }
  }, [dispatch, products.products, categories.categories, branch.businesses]);

  return (
    <main className="main">
      <div className="cards">
        <div className="card" onClick={() => handleOnClick("Product")}>
          <div className="up_card">
            <AiFillProduct />
            <p>Ürünler</p>
          </div>
          <div className="down_card">
            <p>Ürün sayısı</p>
            <span> {memoizedProductList.items?.length} </span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Category")}>
          <div className="up_card">
            <MdCategory />
            <p>Kategoriler</p>
          </div>
          <div className="down_card">
            <p>Kategori sayısı</p>
            <span> {memoizedCategoryList.items?.length} </span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Branch")}>
          <div className="up_card">
            <SiGooglepubsub />
            <p>Şubeler</p>
          </div>
          <div className="down_card">
            <p>Şube sayısı</p>
            <span> {memoizedBranchList.items?.length} </span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Comment")}>
          <div className="up_card">
            <FaCommentDots />
            <p>Yorumlar</p>
          </div>
          <div className="down_card">
            <p>Yorum sayısı</p>
            <span> {memoizedCommentList.items?.length} </span>
          </div>
        </div>
      </div>
      <div className="lists">
        <div className="list_header">
          <h1>{header.head}</h1>
          <div className="controlbar">
            <input type="search" placeholder="Ara..." />
          </div>
        </div>
        <List
          headers={header.header}
          itemsPerPage={5}
          items={header.items}
          head={header.head}
        />
      </div>
    </main>
  );
};

export default Main;
