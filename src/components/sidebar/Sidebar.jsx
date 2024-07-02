import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";
import { RiDashboardFill } from "react-icons/ri";
import { MdCategory, MdModeStandby } from "react-icons/md";
import { AiFillProduct, AiOutlineSubnode } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { FaKitchenSet, FaSquarePlus } from "react-icons/fa6";
import { SiGooglepubsub } from "react-icons/si";
import { RiMenu2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/login/loginSlice";

const Sidebar = ({ param }) => {
  const [isMenu, setIsmenu] = useState(true);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("çıkış yapıldı");
  };

  return (
    <aside className="__header">
      <RiMenu2Fill
        className="menu_icon"
        style={{
          display: isMenu ? "none" : "block",
        }}
        onClick={() => setIsmenu(!isMenu)}
      />

      <div
        className="sidebar"
        style={{
          display: isMenu ? "block" : "none",
        }}
      >
        <div className="top_menu">
          <div className="head">
            <img src={logo} alt="logo" />
            <div className="txt">
              <p>Orhan TOK</p>
              <span className="admin">Admin</span>
            </div>
          </div>
          <MdClose className="close" onClick={() => setIsmenu(!isMenu)} />
        </div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to={`/${param.id}/menu`}>
                <FaKitchenSet />
                <p>Menu'ye Git</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/dashboard`}>
                <RiDashboardFill />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/products`}>
                <AiFillProduct />
                <p>Ürünler</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/add-product`}>
                <TbCategoryPlus />
                <p>Ürün Ekle</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/categories`}>
                <MdCategory />
                <p>Kategori</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/add-category`}>
                <FaSquarePlus />
                <p>Kategori Ekle</p>
              </NavLink>
            </li>
            <span></span>
          </ul>

          <ul>
            <li>
              <NavLink to={`/${param.id}/admin/branch`}>
                <SiGooglepubsub />
                <p>Şubeler</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${param.id}/admin/add-branch`}>
                <AiOutlineSubnode />
                <p>Şube Ekle</p>
              </NavLink>
            </li>
            <span></span>
          </ul>

          <div className="logout">
            <li onClick={handleLogout}>
              <NavLink to={`/${param.id}/login`}>
                <MdModeStandby />
                <p>Çıkış Yap</p>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
