import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import DashboardRouter from "./DashboardRouter";

import "./style.scss";

const Home = () => (
  <div className="c-app c-default-layout">
    <Sidebar />
    <div className="c-wrapper">
      <Header />
      <div className="c-body">
        <DashboardRouter />
      </div>
      <Footer />
    </div>
  </div>
);

export default Home;
