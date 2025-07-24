import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ textAlign: "center" }}>
  <img
    src={"/logos2.png"}
    alt="SpendWise Logo"
    style={{ height: "80px" }}
  />
</div>
    {/* <div> </div> */}
      <ul className="nav-links">
        <li><NavLink to="/dashboard/spent" className={({ isActive }) => isActive ? "active" : ""}>Spent</NavLink></li>
        <li><NavLink to="/dashboard/lent" className={({ isActive }) => isActive ? "active" : ""}>Lent</NavLink></li>
        <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
