import React from "react";
import "./user.css";
import UserDetails from "../../components/userDetails/UserDetails";
import BottomBar from "../../components/userDetails/bottombar/BottomBar";

const User = () => {
  return (
    <div className="cafegram">
      <UserDetails />
      <BottomBar />
    </div>
  );
};

export default User;
