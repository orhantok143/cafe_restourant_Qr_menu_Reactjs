import React from "react";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/middlesection/Main";
import Leftbar from "../../components/leftbar/Leftbar";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const param = useParams();
  return (
    <div className="container">
      <Sidebar param={param} />
      <Main />
      <Leftbar />
    </div>
  );
};

export default Dashboard;
