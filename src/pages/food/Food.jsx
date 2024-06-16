import React from "react";
import "./food.css";
import { FaRegStar, FaRegHeart, FaRegComment } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShare2Line } from "react-icons/ri";

const Food = ({ product, tokenValid }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="_card">
      {product.isActive ? (
        <div className="transp">
          <p className="_active_title">{product.name}</p>
          {product.activeHours ? (
            <p>
              {product.activeHours[0]}:00 - {product.activeHours[1]}:00
            </p>
          ) : null}
          <p className="_active_title">Saatler arasında servise açıktır</p>
        </div>
      ) : null}
      <div className="_img">
        <img src={product.images[0].url} alt="food" />
      </div>
      <div className="card_text">
        <div className="_text_header">
          <h4 className="title"> {product.name} </h4>
          <p className="price"> {product.price} TL</p>
        </div>
        {tokenValid ? (
          <div className="_star">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        ) : null}
        {tokenValid ? null : (
          <p className="desc">{product.description?.substring(0, 40)}...</p>
        )}
      </div>
      {tokenValid ? (
        <>
          <div className="_icons">
            <SlBadge className="_book" />
            <FaRegHeart className="_like" />
          </div>
          <div className="__icon">
            <AiOutlineLike />
            <RiShare2Line onClick={handleShare} />
            <FaRegComment />

            <AiOutlineDislike />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Food;
