import React, { useEffect, useState } from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import h1 from "../../../image/h3.png";
import postImage from "../../../image/bg_food.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getAllComment,
  likeComment,
} from "../../../redux/comment/commentSlice";
import { getAllPost, likePost } from "../../../redux/post/postSlice";
import { checkToken, getAllUsers } from "../../../redux/login/loginSlice";
import {
  selectActiveAuth,
  selectComment,
  selectPost,
} from "../../../redux/selectors";

const Post = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ content: "", postId: "" });
  const posts = useSelector(selectPost);
  const comments = useSelector(selectComment);
  const { users } = useSelector(selectActiveAuth);
  const { user } = useSelector(selectActiveAuth);
  const [localComments, setLocalComments] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);

  const handleLikeComment = (id) => {
    dispatch(likeComment(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        const updatedComment = response.payload;
        console.log(updatedComment);
        setLocalComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          )
        );
      }
    });
  };

  const handleLikePost = (id) => {
    dispatch(likePost(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        const updatedPost = response.payload.post;
        setLocalPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      }
    });
  };

  const handleOnChange = (e) => {
    const content = e.target.value;
    setComment({ ...comment, content });
  };

  const handleComment = (postId) => {
    const newComment = { content: comment.content, postId };
    dispatch(addComment(newComment)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setLocalComments([...localComments, response.payload]);
        setComment({ content: "", postId: "" });
      }
    });
  };

  const handleLocalUser = (id) => {
    const u = localUsers?.find((user) => user._id === id);
    return u ? u.username : null;
  };

  useEffect(() => {
    dispatch(checkToken());
    if (!posts || !comments) {
      dispatch(getAllPost());
      dispatch(getAllComment());
    }
    dispatch(getAllUsers());
  }, [dispatch, posts, comments]);

  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (posts) {
      setLocalPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  return (
    <div className="posts">
      {localPosts?.map((post) => (
        <React.Fragment key={post._id}>
          <div className="user">
            <div className="user_text">
              <img src={h1} alt="user_profile" />
              <div className="post_detail">
                <h4>{handleLocalUser(post.author)} </h4>
                <p className="post_time">{post?.createdAt} </p>
              </div>
            </div>
            <BsThreeDots />
          </div>

          <div className="post">
            <img src={postImage} alt="post_picture" />
            <div className="post_icons">
              <div>
                {post.likes.some(
                  (like) => like.toString() === user._id.toString()
                ) ? (
                  <IoMdHeart
                    className="_liked"
                    onClick={() => handleLikePost(post?._id)}
                  />
                ) : (
                  <IoMdHeartEmpty onClick={() => handleLikePost(post?._id)} />
                )}

                <FaRegCommentDots />
                <IoShareSocialOutline />
              </div>
              <MdOutlineBookmarks />
            </div>
            <div className="post_user">
              <div className="post_title">
                <h4>{handleLocalUser(post.author)}</h4>
                <p>{post?.content}</p>
              </div>
              <div className="do_comment">
                <input
                  type="textarea"
                  placeholder="Yorum yaz..."
                  value={comment.content}
                  onChange={handleOnChange}
                />
                <IoPaperPlaneOutline onClick={() => handleComment(post?._id)} />
              </div>
              <div className="post_state">
                {post?.likes.length > 0 ? (
                  <>
                    <h4>{handleLocalUser(comment.author)} </h4>
                    <p>ve {post?.likes.length} kişi beğendi </p>,
                  </>
                ) : null}
                <p>
                  {localComments?.filter(
                    (c) => c.postId.toString() === post?._id.toString()
                  ).length > 0
                    ? localComments?.filter(
                        (c) => c.postId.toString() === post?._id.toString()
                      ).length + " kişi yorum yapmış"
                    : null}
                </p>
              </div>
            </div>
            {localComments
              ?.filter(
                (comment) => comment.postId.toString() === post?._id.toString()
              )
              .map((comment) => (
                <div className="_comment" key={comment._id}>
                  <div className="user_text">
                    <img src={h1} alt="user_profile" />
                    <div className="post_detail">
                      <h4>{handleLocalUser(comment.author)} </h4>
                      <p className="post_time">{comment.createdAt} </p>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                  <div>
                    {comment.likes.some(
                      (like) => like.toString() === user._id.toString()
                    ) ? (
                      <IoMdHeart
                        className="_liked"
                        onClick={() => handleLikeComment(comment._id)}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        onClick={() => handleLikeComment(comment._id)}
                      />
                    )}

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
