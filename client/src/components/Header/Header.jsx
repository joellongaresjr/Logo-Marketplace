import "./HeaderStyles.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";
import Logo from "../../assets/images/LOGO_MARKETPLACE.SVG"

const Header = () => {
  const [burgerClick, setBurgerClick] = useState(false);
  const { pathname } = useLocation();

  const burgerToggle = () => {
    setBurgerClick(!burgerClick);
  };

  useEffect(() => {
    setBurgerClick(false);
  }, [pathname]);

    
//  Create Our Nav Links Here   
    
  return (
    <header>
      <div className="logo-heading">
     <Link to="/">
          <div className="logo-container">
          <img src={Logo} alt="Logo" style={{ width: "150px", height: "150px" }} />
          </div>
      </Link>
      <Link to="/">
        <h1>Logo Market Place</h1>
      </Link>
      </div>
      <ul className={burgerClick ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link
            to="/"
            className={pathname === "/" ? "current-page" : "nav-item"}
          >
            About Me
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={pathname === "/projects" ? "current-page" : "nav-item"}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/resume"
            className={pathname === "/resume" ? "current-page" : "nav-item"}
          >
            Resume
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={pathname === "/contact" ? "current-page" : "nav-item"}
          >
            Contact Me
          </Link>
        </li>
      </ul>
      <div className="burger" onClick={burgerToggle}>
        {burgerClick ? (
          <FaTimes size={25} style={{ color: "#FFF" }} />
        ) : (
          <FaBars size={25} style={{ color: "#FFF" }} />
        )}
      </div>
    </header>
  );
};

export default Header;
