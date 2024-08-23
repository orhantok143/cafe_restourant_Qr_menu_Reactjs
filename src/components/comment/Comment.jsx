import React, { useState } from "react";
import "./comment.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const Comment = ({ setisComment, user,productId ,handleAddComment}) => {
  const navigate = useNavigate();
  const param = useParams();
  const [comment, setComment] = useState({content:"",productId})
 
  const handleProfile = () => {
    navigate(`/${param.id}/profile`);
  };
  return (
    <div className="comment">
      <div className="comment_head">
        <div className="_profile" onClick={handleProfile}>
          {user?.image ? <img src={user?.image} alt="profile" /> : <FaUser />}
          <p> {user?.username} </p>
        </div>
        <IoCloseOutline onClick={() => setisComment(false)} />
      </div>
      <input type="textarea" placeholder="Yorum yaz..." name="comment"  onChange={(e)=>setComment({...comment,content:e.target.value})}/>
      <button onClick={()=>handleAddComment(comment)}>Yorum Ekle</button>
    </div>
  );
};

export { Comment };
