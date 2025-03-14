import React from "react";
import logo from "../assets/img/Logo-alt.svg";
import "../styles/NavBar.css";
import { FaBars, FaTimes } from "react-icons/fa"; 

function NavBar({ sidebarToggle, setSidebarToggle }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img className="logo" src={logo} alt="logo" width="40" height="40" />
          <h1 className="navbar-title" >
            Shop.ly
          </h1>
        </div>
        <div className="navbar-right">
          {sidebarToggle ? (
            <FaTimes
              className="menu-icon shifted"
              onClick={() => setSidebarToggle(false)}
            />
          ) : (
            <FaBars
              className="menu-icon "
              onClick={() => setSidebarToggle(true)}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
