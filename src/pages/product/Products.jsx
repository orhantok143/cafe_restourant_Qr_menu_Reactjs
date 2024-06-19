import React, { useCallback, useEffect, useRef, useState } from "react";
import "./products.css";
import Food from "../food/Food";
import BottomBar from "../../components/BottomBar";
import Header from "../../components/header/Header";
// import SubCategory from "../../components/SubCategory";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  selectActiveCategories,
  selectActiveProducts,
  selectCurrentCategory,
} from "../../redux/selectors";
import { checkToken } from "../../redux/login/loginSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMyFavorite,
  getAllProducts,
  initialLoad,
} from "../../redux/products/productSlice";
import { getAllCategories } from "../../redux/category/categorySlice";
import { IoCloseOutline } from "react-icons/io5";

const Products = () => {
  const isLogin = true;
  const [detail, setDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const search = useSelector((state) => state.products.search);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailRef = useRef();
  const currentCategory = useSelector(selectCurrentCategory);
  const products = useSelector(selectActiveProducts);
  const categories = useSelector(selectActiveCategories);
  const { tokenValid, logedUser } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [favoritedLocal, setFavoritedLocal] = useState([]);

  const handleAddToFavorite = (product) => {
    const updatedFavorites = favoritedLocal.includes(product._id)
      ? favoritedLocal.filter((id) => id !== product._id)
      : [...favoritedLocal, product._id];

    setFavoritedLocal(updatedFavorites); // Local state'i güncelle
    dispatch(addMyFavorite(product)); // Redux store ve veritabanı için favori ekleme/çıkarma aksiyonunu dispatch et
  };

  const handleClickOutside = useCallback((event) => {
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      setDetail(false);
    }
  }, []);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleShare = async (product) => {
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

  const handleOnClick = (product, event) => {
    setDetailProduct(product);
    setDetail(!detail);
  };

  const handleClose = () => {
    setDetail(false);
    setDetailProduct(null);
  };

  useEffect(() => {
    if (logedUser && logedUser.myFavorites) {
      dispatch(initialLoad(logedUser.myFavorites));
      setFavoritedLocal(logedUser.myFavorites); // Local state'i logedUser.myFavorites ile başlat
    }
  }, [logedUser, dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
    ?.filter((category) => category.title.includes(currentCategory))
    ?.map((c) => c.subCategory.flat())
    .flat()
    .sort((a, b) => {
      // Tarihlerin karşılaştırılması için getTime() kullanılıyor
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  return (
    <div className="_bg">
      {products?.loading || categories?.loading ? <Loading /> : null}
      <Header tokenValid={tokenValid} logedUser={logedUser} />
      {isLogin &&
        c?.map((c, index) => (
          <React.Fragment key={c._id || index}>
            <div className="category">
              <h4 className="category_title"> {c.title} </h4>
            </div>
            <div className="_products_food">
              {products.products
                ?.filter((p) => c && p.subCategory.title === c.title)
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
                    logedUser={logedUser}
                    favoritedLocal={favoritedLocal}
                    handleAddToFavorite={handleAddToFavorite}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      {detail ? (
        <div className="_product_details" ref={detailRef}>
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
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleRating(ratingValue)}
                    onTouchStart={() => setHover(ratingValue)}
                    onTouchEnd={() => handleRating(ratingValue)}
                  >
                    {ratingValue <= (hover || rating) ? (
                      <FaStar className="fillStar" />
                    ) : (
                      <FaRegStar />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero eos
              accusamus, qui omnis eveniet nisi quos aliquid officiis ut ipsa.
            </p>
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
            <p className="_rating"> {detailProduct?.averageRating} </p>
            <RiShare2Line onClick={() => handleShare(detailProduct)} />
            <div className="_timer">
              <IoIosTimer />
              <p className="_mints">12dk</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="_buttomGroup">
        {/* <SubCategory /> */}
        <BottomBar />
      </div>
    </div>
  );
};

export default Products;
