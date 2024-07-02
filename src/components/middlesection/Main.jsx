import React, { useEffect, useState } from "react";
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
  const [whichCard, setwhichCard] = useState("Product");
  const products = useSelector(selectActiveProducts);
  const categories = useSelector(selectActiveCategories);
  const branch = useSelector(selectActiveBusinesses);
  const productList = {
    head: "Ürünler",
    header: ["ÜRÜN İSMİ", "ANA KATEGORİ", "FİYAT"],
    items: products.products,
  };
  const categoryList = {
    head: "Kategoriler",
    header: ["KATEGORİ İSMİ", "ALT KATEGORİLER"],
    items: categories.categories,
  };
  const branchList = {
    head: "Şubeler",
    header: ["İŞLETME İSMİ", "ŞUBELER"],
    items: branch?.businesses?.filter((branch) => branch._id === param.id),
  };
  const commentList = {
    head: "Yorumlar",
    header: ["YORUM YAPAN", "ÜRÜN", "YORUM"],
  };
  const handleOnClick = (data) => {
    setwhichCard(data);
  };
  const [header, setHeader] = useState(productList);

  useEffect(() => {
    if (whichCard === "Product") {
      setHeader(productList);
    }
    if (whichCard === "Category") {
      setHeader(categoryList);
    }
    if (whichCard === "Comment") {
      setHeader(commentList);
    }
    if (whichCard === "Branch") {
      setHeader(branchList);
    }
  }, [whichCard]);

  useEffect(() => {
    if (!products?.products) {
      dispatch(getAllProducts());
    }
    if (!categories?.categories) {
      dispatch(getAllCategories());
    }
    if (branch?.bussiness) {
      dispatch(getAllBusinesses());
    }
  }, []);

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
            <span>100</span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Category")}>
          <div className="up_card">
            <MdCategory />
            <p>Kategoriler</p>
          </div>
          <div className="down_card">
            <p>Kategori sayısı</p>
            <span>100</span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Branch")}>
          <div className="up_card">
            <SiGooglepubsub />
            <p>Şubeler</p>
          </div>
          <div className="down_card">
            <p>Şube sayısı</p>
            <span>100</span>
          </div>
        </div>
        <div className="card" onClick={() => handleOnClick("Comment")}>
          <div className="up_card">
            <FaCommentDots />
            <p>Yorumlar</p>
          </div>
          <div className="down_card">
            <p>Yorum sayısı</p>
            <span>100</span>
          </div>
        </div>
      </div>
      <div className="lists">
        <div className="list_header">
          <h1> {header.head} </h1>
          <div className="controlbar">
            <input type="search" placeholder="Ara..." />
            {/* <div className="categoryControl">
              <select name="" id="" className="selection">
                <option value="">Seç</option>
                <option value="">Mutfak</option>
                <option value="">Bar</option>
                <option value="">Tatlı</option>
                <option value="">Nargile</option>
              </select>
              <select name="" id="" className="selection">
                <option value="">Seç</option>
                <option value="">Kahvaltı</option>
                <option value="">Tavuk Yemekleri</option>
                <option value="">Et Yemekleri</option>
              </select>
            </div> */}
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
