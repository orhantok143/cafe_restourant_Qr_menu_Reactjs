import React from "react";
import "./header.css";
// import { HiOutlineSearch } from "react-icons/hi";
// import { FaUser } from "react-icons/fa6";
// import { SiCoffeescript } from "react-icons/si";
import img from "../../image/hamaloğlu-Photoroom.png-Photoroom.png";

const Header = () => {
  return (
    <div className="_header">
      <div className="_top_header">
        <div className="_logo">
          {/* <SiCoffeescript className="lo" /> */}
          <img className="lo" src={img} alt="" srcset="" />
        </div>
        <div className="_icons">
          <input
            type="search"
            placeholder="Sushi, Milkshake, Supangle..."
          ></input>
          <span className="_table_text">Masa no: 12</span>
          {/* <FaUser className="_user" /> */}
        </div>
      </div>
      {/* <div className="_bottom_header">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          initialSlide={1}
          // effect="carousel"
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        >
          <SwiperSlide>Kahvaltı</SwiperSlide>
          <SwiperSlide>Atıştırmalık</SwiperSlide>
          <SwiperSlide>Tavuk yemekleri</SwiperSlide>
          <SwiperSlide>Et yemekleri</SwiperSlide>
          <SwiperSlide>Balık</SwiperSlide>
          <SwiperSlide>Pizza & Burger</SwiperSlide>
          <SwiperSlide>Makarnalar</SwiperSlide>
          <SwiperSlide>Salatalar</SwiperSlide>
        </Swiper>
      </div> */}
    </div>
  );
};

export default Header;
