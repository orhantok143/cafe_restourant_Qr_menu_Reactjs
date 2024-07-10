import React, { useCallback, useEffect, useRef, useState } from "react";
import "./userDetails.css";
import { SiCoffeescript } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoImage } from "react-icons/io5";
import h1 from "../../image/h1.png";
import { CgProfile } from "react-icons/cg";
import Post from "./post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../../redux/login/loginSlice";
import { addPost } from "../../redux/post/postSlice";

const UserDetails = () => {
  const ref = useRef();
  const fileInputRef = useRef(null);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);
  const { tokenValid } = useSelector((state) => state.auth);
  const [sharePost, setSharePost] = useState({ content: "", image: null });

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setisActive(false);
    }
  }, []);

  useEffect(() => {
    dispatch(checkToken()).then((res) => {
      const token = localStorage.getItem("token");
      if (res.meta.requestStatus === "fulfilled") {
        if (!token) {
          navigate(`/${param.id}/menu`);
        }
      }
    });
  }, [dispatch, tokenValid, navigate, param]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSharePost((prevSharePost) => ({
        ...prevSharePost,
        image: file,
      }));
    }
  };

  const handleShare = () => {
    const formData = new FormData();
    formData.append("content", sharePost.content);
    if (sharePost.image) {
      formData.append("image", sharePost.image);
    }
    dispatch(addPost(formData));
    setSharePost({
      content: "",
      image: null,
    });
  };

  const handlePostContent = (e) => {
    const content = e.target.value;
    setSharePost((prevSharePost) => ({
      ...prevSharePost,
      content,
    }));
  };

  return (
    <main className="_user_media" onClick={handleClickOutside}>
      <div className="top">
        <div className="_social_logo">
          <SiCoffeescript />
          <p>Cafegram</p>
        </div>
        <div className="_search_items">
          {isActive ? (
            <input
              ref={ref}
              type="search"
              className="_search_area"
              placeholder="Ara..."
            />
          ) : (
            <IoIosSearch onClick={() => setisActive(true)} />
          )}
          <CgProfile className="user" />
        </div>
      </div>

      <div className="_stories">
        <div className="_story">
          <IoAddCircleSharp />
          <p>Ekle</p>
        </div>
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div className="_story" key={index}>
              <img src={h1} alt="story" />
              <p>Orhantok</p>
            </div>
          );
        })}
      </div>
      <div className="_share">
        <div className="_head">
          <img src={h1} alt="user" />

          <div>
            {sharePost.image && (
              <img src={URL.createObjectURL(sharePost.image)} alt="Preview" />
            )}

            <textarea
              className="_textarea"
              placeholder="Write something here..."
              onChange={handlePostContent}
              value={sharePost.content}
            />
          </div>
        </div>

        <div className="_share_icons">
          <div className="icon">
            <IoImage onClick={handleImageClick} />
            <IoLocationSharp />
          </div>
          <button type="button" onClick={handleShare}>
            Paylaş
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <Post />
    </main>
  );
};

export default UserDetails;
