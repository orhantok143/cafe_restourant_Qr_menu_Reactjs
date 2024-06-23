import React from "react";
import "./main.css";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { SiGooglepubsub } from "react-icons/si";
import { FaCommentDots } from "react-icons/fa6";

const Main = () => {
  return (
    <main className="main">
      <div className="cards">
        <div className="card">
          <div className="up_card">
            <AiFillProduct />
            <p>Ürünler</p>
          </div>
          <div className="down_card">
            <p>Ürün sayısı</p>
            <span>100</span>
          </div>
        </div>
        <div className="card">
          <div className="up_card">
            <MdCategory />
            <p>Kategoriler</p>
          </div>
          <div className="down_card">
            <p>Kategori sayısı</p>
            <span>100</span>
          </div>
        </div>
        <div className="card">
          <div className="up_card">
            <SiGooglepubsub />
            <p>Şubeler</p>
          </div>
          <div className="down_card">
            <p>Şube sayısı</p>
            <span>100</span>
          </div>
        </div>
        <div className="card">
          <div className="up_card">
            <FaCommentDots />
            <p>Yorumlar</p>
          </div>
          <div className="down_card">
            <p>Yorum sayısı</p>
            <span>100</span>
          </div>
        </div>
      </div>
      <div className="lists">list</div>
    </main>
  );
};

export default Main;
