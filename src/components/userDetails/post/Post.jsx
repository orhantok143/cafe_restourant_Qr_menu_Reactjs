import React from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import h1 from "../../../image/h3.png";
import post from "../../../image/bg_food.jpg";

const Post = () => {
  return (
    <div className="posts">
      <div className="user">
        <div className="user_text">
          <img src={h1} alt="user_profile" />
          <div className="post_detail">
            <h4>Username</h4>
            <p className="post_time">12:00pm</p>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <div className="post">
        <img src={post} alt="post_picture" />
        <div className="post_icons">
          <div>
            <IoMdHeartEmpty />
            <FaRegCommentDots />
            <IoShareSocialOutline />
          </div>
          <MdOutlineBookmarks />
        </div>
        <div className="post_user">
          <div className="post_title">
            <h4>username</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              quaerat cupiditate quasi qui at impedit!
            </p>
          </div>
          <div className="do_comment">
            <input type="textarea" placeholder="Yorum yaz..." />
            <IoPaperPlaneOutline />
          </div>
          <div className="post_state">
            <h4>username</h4> <p>ve 123 kişi beğendi </p>,
            <p> 123 yorum yapılmış</p>
          </div>
        </div>
        <div className="_comment">
          <div className="user_text">
            <img src={h1} alt="user_profile" />
            <div className="post_detail">
              <h4>Username</h4>
              <p className="post_time">12:00pm</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            cupiditate.
          </p>
          <div>
            <IoMdHeartEmpty />
            <FaRegCommentDots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
