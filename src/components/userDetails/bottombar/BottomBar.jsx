import React from "react";
import "./bottombar.css";
import { NavLink, useParams } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import h1 from "../../../image/h1.png";

const BottomBar = () => {
  const param = useParams();

  return (
    <div className="bottombar">
      <NavLink to={`/${param.id}/menu`}>
        <GoHome />
        <p>Home</p>
      </NavLink>
      <NavLink to="/search">
        <CiSearch />
        <p>Ara</p>
      </NavLink>
      <NavLink to="/share">
        <GoPlus />
        <p>Paylaş</p>
      </NavLink>
      <NavLink to="/like">
        <CiHeart />
        <p>Beğen</p>
      </NavLink>
      <NavLink to="/user">
        <img src={h1} alt="profile" />
        <p>Profile</p>
      </NavLink>
    </div>
  );
};

export default BottomBar;
