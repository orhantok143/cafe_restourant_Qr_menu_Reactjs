import React from "react";
import "./header.css";
import img from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";
import { FaUser } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/products/productSlice";
import { selectfavorited } from "../../redux/selectors";

const Header = ({ user, tokenValid }) => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const favorited = useSelector(selectfavorited);

  const handleLogin = () => {
    if (!tokenValid && !user) {
      navigate(`/${param.id}/login`);
    }
  };

  const handleOnChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="_header">
      <div className="_top_header">
        <div className="_logo">
          <img className="lo" src={img} alt="" srcSet="" />
        </div>
        <div className="_icons">
          <input
            type="search"
            placeholder="Sushi, Milkshake, Supangle..."
            onChange={handleOnChange}
          ></input>
          {/* <span className="_table_text">Masa no: 12</span> */}
          {tokenValid && favorited.length > 0 ? (
            <IoMdHeart className="_cart" />
          ) : null}
          {tokenValid ? (
            user?.image ? (
              // <img src={logedUser?.image} />
              <> {} </>
            ) : (
              <FaUser className="_user" />
            )
          ) : (
            <FaUserPlus onClick={handleLogin} className="_user" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
