import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaCoffee } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import "./bottomBar.css";
import Smoke from "./Smoke";
import { currentCategory } from "../redux/category/categorySlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [activeIcon, setActiveIcon] = useState(0);

  const handleClick = (icon) => {
    setActiveIcon(icon.id);
    if (icon.label === "Home") {
      navigate(`/${param.id}/profile`);
    }

    dispatch(currentCategory(icon.label));
  };

  const dispatch = useDispatch();

  const icons = [
    {
      id: 0,
      icon: <TbToolsKitchen2 />,
      label: "Yemek",
      path: "/products/yemek",
    },
    { id: 1, icon: <FaCoffee />, label: "İçecek", path: "/products/icecek" },
    { id: 2, icon: <TiHome />, label: "Home", path: "/products/home" },
    { id: 3, icon: <GiCakeSlice />, label: "Tatlı", path: "/products/tatli" },
    {
      id: 4,
      icon: <Smoke />,
      label: "Smoke",
      path: "/products/smoke",
    },
  ];

  return (
    <div className="bottom-bar">
      {icons.map((icon, index) => (
        <span
          to={icon.path}
          key={index}
          className={`bottom_icon ${activeIcon === index ? "active" : ""}`}
          onClick={() => {
            handleClick(icon);
          }}
        >
          {icon.icon}
        </span>
      ))}
    </div>
  );
};

export default BottomBar;
