import React from "react";
import "./products.css";
import Food from "../food/Food";
import BottomBar from "../../components/BottomBar";
import Header from "../../components/header/Header";
import { products } from "../../image/data";
import { categories } from "../../image/data";
import SubCategory from "../../components/SubCategory";

const Products = () => {
  // console.log("Categories:", categories);

  // const cat = localStorage.getItem("category");

  const c = categories.map((c) => c.subCategory.flat()).flat();

  return (
    <div className="_bg">
      <Header />
      {c.map((c, index) => (
        <>
          <div key={index} className="category">
            <h4 className="category_title"> {c.subCategory} </h4>
          </div>
          <div key={c.image?.asset_id} className="_products_food">
            {products
              .filter((p) => c.subCategory && p.subCategory === c.subCategory) // Check for c.title before using it
              .map((product) => (
                <Food key={product._id} product={product} />
              ))}
          </div>
        </>
      ))}
      <div className="_buttomGroup">
        <SubCategory />
        <BottomBar />
      </div>
    </div>
  );
};

export default Products;
