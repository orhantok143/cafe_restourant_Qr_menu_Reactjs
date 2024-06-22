import React from "react";
import "./main.css";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { SiGooglepubsub } from "react-icons/si";

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
            <p>
              Ürün sayısı <span>100</span>{" "}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="up_card">
            <MdCategory />
            <p>Kategoriler</p>
          </div>
          <div className="down_card">
            <p>
              Ürün sayısı <span>100</span>{" "}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="up_card">
            <SiGooglepubsub />
            <p>Şubeler</p>
          </div>
          <div className="down_card">
            <p>
              Ürün sayısı <span>100</span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="lists">list</div>
    </main>
  );
};

export default Main;
