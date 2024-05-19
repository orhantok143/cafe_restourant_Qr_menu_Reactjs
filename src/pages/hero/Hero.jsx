import React from "react";
import "./Hero.css";
import hero_img from "../../image/indir (7).jpg";
import h1 from "../../image/h1.png";
// import { Link } from "react-router-dom";
// import h3 from "../../image/h3.png";

const Hero = () => {
  return (
    <div className="_hero">
      <div className="_hero_bg">
        <img src={hero_img} alt="hero_bg" srcSet="" />
      </div>
      <div className="__hero">
        <div className="_hero_left">
          <h3 className="_title">Hoşgeldiniz</h3>
          <p className="_text">
            Hamaloğlu Kafe, günlük hayatın koşuşturmasından uzaklaşmak
            isteyenler için huzurlu bir kaçış noktasıdır. Özenle hazırladığımız
            taze ve lezzetli atıştırmalıklar, özel kahve çeşitlerimiz ve modern,
            rahat atmosferimizle sizi bekliyoruz.
          </p>
          <a href="/">Başla</a>
        </div>

        <div className="circle-container _hero_right">
          <svg
            width="350"
            height="350"
            viewBox="0 0 300 300"
            className="rotating-svg"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
              />
            </defs>
            <image
              href={h1} // Resminizi burada kullanın
              x="50"
              y="50"
              width="200"
              height="200"
              clipPath="circle(100px at center)"
              className="rotating-img"
            />
            <text fontSize="22" fill="#dbdbdbe4">
              <textPath href="#circlePath" startOffset="0" className="text_rot">
                HAMALOĞLUDAYIZ
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
