import React, { useState } from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import h1 from "../../../image/h3.png";
import postImage from "../../../image/bg_food.jpg";
import { useDispatch } from "react-redux";
import { addComment, likeComment } from "../../../redux/comment/commentSlice";
import { likePost } from "../../../redux/post/postSlice";

const Post = ({ posts, comments, user }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ content: "", postId: "" });

  const handleLikeComment = (id) => {
    dispatch(likeComment(id));
  };

  const handleLikePost = (id) => {
    dispatch(likePost(id));
  };

  const handleOnChange = (e) => {
    const content = e.target.value;
    comment.content = content;
    setComment(comment);
  };

  const handleComment = (data) => {
    comment.postId = data;
    console.log(comment);
    dispatch(addComment(comment));
  };

  return (
    <div className="posts">
      {posts?.map((post) => (
        <React.Fragment key={post._id}>
          <div className="user">
            <div className="user_text">
              <img src={h1} alt="user_profile" />
              <div className="post_detail">
                <h4>{user.username} </h4>
                <p className="post_time">{post.createdAt} </p>
              </div>
            </div>
            <BsThreeDots />
          </div>

          <div className="post">
            <img src={postImage} alt="post_picture" />
            <div className="post_icons">
              <div>
                <IoMdHeartEmpty onClick={() => handleLikePost(post._id)} />
                <FaRegCommentDots />
                <IoShareSocialOutline />
              </div>
              <MdOutlineBookmarks />
            </div>
            <div className="post_user">
              <div className="post_title">
                <h4>{user.username}</h4>
                <p>{post.content}</p>
              </div>
              <div className="do_comment">
                <input
                  type="textarea"
                  placeholder="Yorum yaz..."
                  onChange={handleOnChange}
                />
                <IoPaperPlaneOutline onClick={() => handleComment(post._id)} />
              </div>
              <div className="post_state">
                <h4>{user.username} </h4>{" "}
                <p>ve {post.likes.length} kişi beğendi </p>
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
              ?.filter((c) => c.postId.toString() === post._id.toString())
              .map((c) => (
                <div className="_comment" key={c._id}>
                  <div className="user_text">
                    <img src={h1} alt="user_profile" />
                    <div className="post_detail">
                      <h4>{user.username} </h4>
                      <p className="post_time">{c.createdAt} </p>
                    </div>
                  </div>
                  <p>{c.content}</p>
                  <div>
                    <IoMdHeartEmpty onClick={() => handleLikeComment(c._id)} />
                    <FaRegCommentDots />
                  </div>
                </div>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Post;
