import React, { useEffect, useState } from "react";
import "./post.css";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoClose, IoShareSocialOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import h1 from "../../../image/h3.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  likeComment,
} from "../../../redux/comment/commentSlice";

import {
  selectActiveAuth,
  selectComment,
} from "../../../redux/selectors";
import { deletePost} from "../../../redux/post/postSlice";

const Post = ({post,handleLikePost,setLocalPosts,localPosts }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ content: "", postId: "" });
  const comments = useSelector(selectComment);
  const { users } = useSelector(selectActiveAuth);
  const { user } = useSelector(selectActiveAuth);
  const [localComments, setLocalComments] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [action, setAction] = useState(false)

  const handleLikeComment = (id) => {
    dispatch(likeComment(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        const updatedComment = response.payload;
        setLocalComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
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

  // const handleUpdatePost =(data)=>{
  //   dispatch(updatePost(data)).then((response)=>{
  //     const index = localPosts.findIndex(post=>post._id === response._id)
  //     localPosts[index] = response
  //     setLocalPosts(localPosts)
  //   })
  // }

const handleDeletePost = (postId)=>{
    dispatch(deletePost(postId)).then(response=>{
     if (response.meta.requestStatus ==="fulfilled") {
      const newPosts = localPosts.filter(p => p._id !== response.payload._id);
      setLocalPosts([...newPosts]);  // Creating a new array reference
    }

    })
}

  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments]);
  
  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  return (
    <div className="posts">        
          <div className="user">
            <div className="user_text">
              <img src={h1} alt="user_profile" />
              <div className="post_detail">
                <h4>{handleLocalUser(post.author)} </h4>
                <p className="post_time">{post?.createdAt} </p>
              </div>
            </div>
            <BsThreeDots onClick={()=>setAction(true)}/>
          </div>

          {action? <div className="dotsdetails">
            <div className="_action">
            <p className="delete" onClick={()=> handleDeletePost(post._id)} >Sil</p>
            <p> Düzenle </p>
            <p className="block"> Engelle </p>
            </div>
            <IoClose onClick={()=>setAction(false)}/>
          </div>:null
}
          <div className="post">
            <img src={post.media[0]?.url} alt="post_picture" />
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
                    <p>{post?.likes.length} kişi beğendi </p>,
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
    </div>
  );
};

export default Post;
