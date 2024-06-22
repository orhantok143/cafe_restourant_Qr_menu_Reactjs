import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";
import { RiDashboardFill } from "react-icons/ri";
import { MdCategory, MdModeStandby } from "react-icons/md";
import { AiFillProduct, AiOutlineSubnode } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import { SiGooglepubsub } from "react-icons/si";
import { RiMenu2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const [isMenu, setIsmenu] = useState(true);

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
              <RiDashboardFill />
              <p>Dashboard</p>
            </li>
            <li>
              <AiFillProduct />
              <p>Ürünler</p>
            </li>
            <li>
              <TbCategoryPlus />
              <p>Ürün Ekle</p>
            </li>
            <li>
              <MdCategory />
              <p>Kategori</p>
            </li>
            <li>
              <FaSquarePlus />
              <p>Kategori Ekle</p>
            </li>
            <span></span>
          </ul>

          <ul>
            <li>
              <SiGooglepubsub />
              <p>Şubeler</p>
            </li>
            <li>
              <AiOutlineSubnode />
              <p>Şube Ekle</p>
            </li>
            <span></span>
          </ul>

          <div className="logout">
            <li>
              <MdModeStandby />
              <p>Çıkış Yap</p>
            </li>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
