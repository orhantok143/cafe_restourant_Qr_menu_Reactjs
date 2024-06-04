import React from "react";
import "./food.css";
import { FaRegHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const Food = ({ product }) => {
  return (
    <div className="_card">
      <img src={product.image.secure_url} alt="food" />
      <div className="card_text">
        <div className="_text_header">
          <h4 className="title"> {product.title} </h4>
          <p className="price"> {product.price} TL</p>
        </div>
        <p className="desc">{product.description.substring(0, 80)}...</p>
        {/* <NavLink to="/products/detail">Devam</NavLink> */}
      </div>
      <div className="_icons">
        <FaBookmark className="_book" />
        <FaRegHeart className="_like" />
      </div>
      <div className="__icon">
        <AiOutlineLike className="_like" />
        <AiOutlineDislike className="_like" />
      </div>
    </div>
  );
};

export default Food;
