import React, { useCallback, useEffect, useRef, useState } from "react";
import "./products.css";
import Food from "../food/Food";
import BottomBar from "../../components/BottomBar";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import {
  selectActiveCategories,
  selectActiveProducts,
  selectCurrentCategory,
} from "../../redux/selectors";
import { checkToken } from "../../redux/login/loginSlice";
import { useParams } from "react-router-dom";
import {
  addCommentProduct,
  addMyFavorite,
  getAllProducts,
  initialLoad,
  ratingProduct,
} from "../../redux/products/productSlice";
import { getAllCategories } from "../../redux/category/categorySlice";
import { IoCloseOutline } from "react-icons/io5";
import { toPng } from "html-to-image";
import { Comment } from "../../components/comment/Comment";
import { getTop15ProductsForBusiness } from "./productAlgorithm";

const Products = () => {
  const isLogin = true;
  const [isComment, setisComment] = useState(false);
  const productRef = useRef();
  const [detail, setDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const search = useSelector((state) => state.products.search);
  const param = useParams();
  const dispatch = useDispatch();
  const detailRef = useRef();
  const currentCategory = useSelector(selectCurrentCategory);
  const products = useSelector(selectActiveProducts);
  const categories = useSelector(selectActiveCategories);
  const { tokenValid, user } = useSelector((state) => state.auth);
  const [favoritedLocal, setFavoritedLocal] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(0);
  const [commentProduct, setcommentProduct] = useState(null)



  

  const combinedRefs = useCallback((node) => {
    // Refs for both product and detail components
    detailRef.current = node;
    productRef.current = node;
  }, []);

  const handleAddToFavorite = (product) => {
    const updatedFavorites = favoritedLocal.includes(product._id)
      ? favoritedLocal.filter((id) => id !== product._id)
      : [...favoritedLocal, product._id];

    setFavoritedLocal(updatedFavorites);
    dispatch(addMyFavorite(product));
  };

  const handleClickOutside = useCallback((event) => {
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      setDetail(false);
    }
  }, []);

  const handleRating = (ratingValue, id) => {
    const data = { data: { rating: ratingValue, comment: "" }, id: id };

    dispatch(ratingProduct(data));
  };

  const handleShare = async (product) => {
    try {
      const dataUrl = await toPng(productRef.current);
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], "product.png", { type: blob.type });

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
      console.error("Error sharing:", error);
    }
  };

  const handleOnClick = (product, event) => {
    setDetailProduct(product);
    setDetail(!detail);
  };

  const handleClose = () => {
    setDetail(false);
    setDetailProduct(null);
  };

  const handleComment = (product) => {
    setisComment(true);
    setDetail(false);
    setcommentProduct(product);
  };

  const handleAddComment = (data)=>{
    dispatch(addCommentProduct(data))
  }

  useEffect(() => {
    if (user && user.myFavorites) {
      dispatch(initialLoad(user.myFavorites));
      setFavoritedLocal(user.myFavorites);
    }
  }, [user, dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!products.products && !categories.categories) {
      dispatch(getAllProducts());
      dispatch(getAllCategories());
    }else{
    getTop15ProductsForBusiness(param.id,products?.products);  
    }
    
  
  }, [dispatch, products, categories,param]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if the user has rated this product before
    const userRating = detailProduct?.reviews?.find(
      (review) => review.user === user?._id
    );
    setUserRating(userRating ? userRating.rating : null);
  }, [detailProduct, user?._id]);



  const c = categories?.categories
    ?.filter((category) => category.title.includes(currentCategory))
    ?.map((c) => c.subCategory.flat())
    .flat()
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return (
    <div className="_bg">
      {products?.loading || categories?.loading ? <Loading /> : null}
      <Header tokenValid={tokenValid} user={user} />

      {isComment && user ? (
        <Comment 
        setisComment={setisComment} 
        user={user} 
        productId={commentProduct}
        handleAddComment={handleAddComment} />
      ) : null}
      {isLogin &&
        c?.map((c, index) => (
          <React.Fragment key={c._id || index}>
            <div className="category">
              <h4 className="category_title"> {c.title} </h4>
            </div>
            <div className="_products_food">
              {products.products
                ?.filter((p) => c && p.subCategory === c.title)
                ?.filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((product) => (
                  <Food
                    key={product._id}
                    product={product}
                    tokenValid={tokenValid}
                    param={param}
                    handleOnClick={(e) => handleOnClick(product, e)}
                    user={user}
                    favoritedLocal={favoritedLocal}
                    handleAddToFavorite={handleAddToFavorite}
                    handleShare={handleShare}
                    productRef={productRef}
                    handleComment={handleComment}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      {detail ? (
        <div className="_product_details" ref={combinedRefs}>
          <div className="_pic">
            <img src={detailProduct?.images[0].url} alt="product resmi" />
          </div>
          <div className="card_text">
            <div className="_text_header">
              <h4 className="title"> {detailProduct?.name} </h4>
              <p className="price"> {detailProduct?.price} TL</p>
            </div>

            <div className="_star">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                  <div
                    key={index}
                    className="star"
                    onMouseEnter={() => {
                      if (userRating === null) {
                        setHover(ratingValue);
                      }
                    }}
                    onMouseLeave={() => {
                      if (userRating === null) {
                        setHover(0);
                      }
                    }}
                    onClick={() => {
                      if (userRating === null) {
                        handleRating(ratingValue, detailProduct._id);
                      }
                    }}
                    onTouchStart={() => {
                      if (userRating === null) {
                        setHover(ratingValue);
                      }
                    }}
                    onTouchEnd={() => {
                      if (userRating === null) {
                        handleRating(ratingValue);
                      }
                    }}
                  >
                    {userRating !== null ? (
                      ratingValue <= userRating ? (
                        <FaStar className="fillStar" />
                      ) : (
                        <FaRegStar />
                      )
                    ) : ratingValue <= hover ? (
                      <FaStar className="fillStar" />
                    ) : (
                      <FaRegStar />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="desc">{detailProduct.description}</p>
          </div>

          <div className="_icons">
            <IoCloseOutline onClick={handleClose} className="_close" />
            {favoritedLocal?.some((item) => item === detailProduct._id) ? (
              <IoMdHeart
                className="_liked"
                onClick={() => handleAddToFavorite(detailProduct)}
              />
            ) : (
              <IoMdHeartEmpty
                className="_like"
                onClick={() => handleAddToFavorite(detailProduct)}
              />
            )}
          </div>
          <div className="__icon">
            <div className="_timer">
              <IoIosTimer />
              <p className="_mints">12dk</p>
            </div>
            <RiShare2Line onClick={() => handleShare(detailProduct)} />
            <FaRegComment onClick={()=>handleComment(detailProduct?._id)} />
            <p className="_rating"> {detailProduct?.averageRating} </p>
          </div>
        </div>
      ) : null}

      <div className="_buttomGroup">
        <BottomBar />
      </div>
    </div>
  );
};

export default Products;
