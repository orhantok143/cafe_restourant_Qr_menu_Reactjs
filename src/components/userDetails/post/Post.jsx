import React from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import h1 from "../../../image/h3.png";
import postImage from "../../../image/bg_food.jpg";

const Post = ({ posts, comments }) => {
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
      {posts?.map((post) => (
        <div className="post" key={post._id}>
          <img src={postImage} alt="post_picture" />
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
              <p>{post.content}</p>
            </div>
            <div className="do_comment">
              <input type="textarea" placeholder="Yorum yaz..." />
              <IoPaperPlaneOutline />
            </div>
            <div className="post_state">
              <h4>username</h4> <p>ve {post.likes.length} kişi beğendi </p>
              <p>
                {comments?.filter(
                  (c) => c.postId.toString() === post._id.toString
                ).length > 0
                  ? "," +
                    comments?.filter(
                      (c) => c.postId.toString() === post._id.toString
                    ).length +
                    " yorum yapılmış"
                  : null}
              </p>
            </div>
          </div>
          {comments
            ?.filter((c) => c.postId.toString() === post._id.toString)
            .map((c) => (
              <div className="_comment" key={c._id}>
                <div className="user_text">
                  <img src={h1} alt="user_profile" />
                  <div className="post_detail">
                    <h4>Username</h4>
                    <p className="post_time">{c.createdAt} </p>
                  </div>
                </div>
                <p>{c.content}</p>
                <div>
                  <IoMdHeartEmpty />
                  <FaRegCommentDots />
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Post;
