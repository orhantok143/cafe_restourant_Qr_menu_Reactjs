import React from "react";
import "./header.css";
import img from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";
import { FaUser } from "react-icons/fa";

const Header = ({ logedUser, tokenValid }) => {
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
          ></input>
          {/* <span className="_table_text">Masa no: 12</span> */}
          {tokenValid ? <FaUser className="_user" /> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
