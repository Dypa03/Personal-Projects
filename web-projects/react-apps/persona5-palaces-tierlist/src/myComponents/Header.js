import React from "react";
import logo from "../assets/p5r_logo.png"; 
import { adjustPageHeightOnNavClick } from "./scripts/script";

function Header() {
  const handleNavLinkClick = (event, targetId) => {
    event.preventDefault(); 
    adjustPageHeightOnNavClick(targetId, 50); 
  };

  return (
    <header id="header">
      <img src={logo} alt="logo" className="logo" width="100px" />
      <nav className="nav-bar">
        <ul>
          <li><a href="#introduction" onClick={(e) => handleNavLinkClick(e, "introduction")}>Introduction</a></li>
          <li><a href="#palaces-tier" onClick={(e) => handleNavLinkClick(e, "palaces-tier")}>Tier List</a></li>
          <li><a href="#conclusion" onClick={(e) => handleNavLinkClick(e, "conclusion")}>Conclusion</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
