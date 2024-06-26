import React, { useRef } from "react";
import "./food.css";
import { FaRegComment } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { toPng } from "html-to-image";

const Food = ({
  product,
  tokenValid,
  handleOnClick,
  handleAddToFavorite,
  favoritedLocal,
}) => {
  const productRef = useRef();

  const handleShare = async (product) => {
    try {
      const dataUrl = await toPng(productRef.current);

      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], `${product.name}.png`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          title: product.name,
          files: [file],
          text: product.description,
          url: window.location.href,
        });
      } else {
        window.open(dataUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing");
    }

    // if (navigator.share) {
    //   try {
    //     await navigator.share({
    //       title: product.name,
    //       text: product.description,
    //       url: window.location.href,
    //     });
    //     console.log("Shared successfully");
    //   } catch (error) {
    //     console.error("Error sharing:", error);
    //   }
    // } else {
    //   alert("Web Share API is not supported in your browser.");
    // }
  };

  return (
    <div className="_card" ref={productRef}>
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
      <div className="_click_area" onClick={() => handleOnClick(product)}>
        <div className="_img">
          <img src={product.images[0].url} alt="food" />
        </div>
        <div className="card_text">
          <div className="_text_header">
            <h4 className="title"> {product.name} </h4>
            <p className="price"> {product.price} TL</p>
          </div>
          {/* {tokenValid ? (
          <div className="_star">
            <span>
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </span>
            <p className="_rate"> {product.averageRating} </p>
          </div>
        ) : null} */}

          <p className="desc">{product.description?.substring(0, 114)}...</p>
        </div>
      </div>
      {tokenValid ? (
        <>
          <div className="_icons">
            {product.averageRating > 0 ? (
              <p className="_rating"> {product.averageRating} </p>
            ) : (
              <div>{}</div>
            )}
            {favoritedLocal?.some((item) => item === product._id) ? (
              <IoMdHeart
                className="_liked"
                onClick={() => handleAddToFavorite(product)}
              />
            ) : (
              <IoMdHeartEmpty
                className="_like"
                onClick={() => handleAddToFavorite(product)}
              />
            )}
          </div>
          <div className="__icon">
            <div className="_timer">
              <IoIosTimer />
              <p className="_mints">12dk</p>
            </div>
            <RiShare2Line onClick={handleShare} />
            <FaRegComment />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Food;
