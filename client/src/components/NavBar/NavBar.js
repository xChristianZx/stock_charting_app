import React from "react";
import "./NavBar.css";
import FaLine from "react-icons/lib/fa/line-chart";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <h1 className="logo-name">
          <FaLine /> ChartIt
        </h1>
      </div>
    </div>
  );
};

export default NavBar;
