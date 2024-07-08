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
import { getAllPost } from "../../redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment } from "../../redux/comment/commentSlice";
import {
  selectActiveAuth,
  selectComment,
  selectPost,
} from "../../redux/selectors";
import { checkToken } from "../../redux/login/loginSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [isActive, setisActive] = useState(false);
  const posts = useSelector(selectPost);
  const comments = useSelector(selectComment);
  const { user } = useSelector(selectActiveAuth);

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setisActive(false);
    }
  }, []);

  useEffect(() => {
    dispatch(checkToken());
    dispatch(getAllPost());
    dispatch(getAllComment());
  }, [dispatch]);

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
          <input
            type="textarea"
            className="_textarea"
            placeholder="Write something here..."
          />
        </div>
        <div className="_share_icons">
          <div className="icon">
            <IoImage />
            <IoLocationSharp />
          </div>
          <button type="submit">Paylaş</button>
        </div>
      </div>
      <Post user={user} posts={posts} comments={comments} />
    </main>
  );
};

export default UserDetails;
