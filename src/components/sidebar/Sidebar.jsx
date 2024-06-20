import React from "react";
import "./sidebar.css";
import logo from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";
import { RiDashboardFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { LuGitBranchPlus } from "react-icons/lu";
import { SiGooglepubsub } from "react-icons/si";
import { AiOutlineSubnode } from "react-icons/ai";

const Sidebar = () => {
  return (
    <aside className="__header">
      <div className="head">
        <img src={logo} alt="logo" />
        <p>Orhan TOK</p>
        <p className="admin">Admin</p>
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
        </ul>

        <div className="logout">
          <li>
            <MdLogout />
            <p>Çıkış Yap</p>
          </li>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
