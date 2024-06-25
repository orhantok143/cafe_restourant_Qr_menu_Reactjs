import React from "react";
import ReactLoading from "react-loading";
import "./loading.css";
const Loading = ({ type, color }) => (
  <div className="loading">
    <ReactLoading
      type="spinningBubbles"
      color="#c09e00"
      height={50}
      width={50}
      delay={10}
    />
  </div>
);

export default Loading;
