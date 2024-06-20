import React from "react";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/middlesection/Main";
import Leftbar from "../../components/leftbar/Leftbar";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar />
      <Main />
      <Leftbar />
    </div>
  );
};

export default Dashboard;
