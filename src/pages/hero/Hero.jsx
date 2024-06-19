import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./Hero.css";
import laptop from "../../image/web_hero_1.jpg";
import h1 from "../../image/h3.png";
import mobile from "../../image/mobile_baharat.jpg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkToken } from "../../redux/login/loginSlice";

const Hero = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.auth); // loginState'i alın

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    }
  }, [dispatch, navigate, param.id]);

  useEffect(() => {
    if (loginState.tokenValid) {
      navigate(`/${param.id}/anasayfa`);
    }
  }, [loginState.tokenValid, navigate, param.id]);

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <div className="_hero">
      <div className="_hero_bg">
        <img
          src={
            isDesktopOrLaptop
              ? laptop
              : isTabletOrMobile
              ? mobile
              : isPortrait
              ? laptop
              : null
          }
          alt="hero_bg"
          srcSet=""
        />
      </div>
      <div className="__hero">
        <div className="_hero_left">
          <h3 className="_title">- Garden -</h3>
          <p className="_text">
            Hamaloğlu Kafe’ye hoş geldiniz! Güne enerjik bir kahvaltıyla
            başlayın, zengin ana yemeklerimizle gününüzü tatlandırın.
            Serinletici içeceklerimiz ve nefis tatlılarımızla kendinizi
            şımartın. Her yudumda lezzeti, her lokmada huzuru hissedin.
          </p>
          <NavLink to={`/${param.id}/menu`}>Başla</NavLink>
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
            <text fontSize="22" fill=" #eee">
              <textPath href="#circlePath" startOffset="0" className="text_rot">
                HAMALDAYIZ
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
