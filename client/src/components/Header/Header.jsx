import "./HeaderStyles.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
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
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={pathname === "/projects" ? "current-page" : "nav-item"}
          >
            Stores
          </Link>
        </li>
        <li>
          <Link
            to="/resume"
            className={pathname === "/resume" ? "current-page" : "nav-item"}
          >
            Sign up
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={pathname === "/contact" ? "current-page" : "nav-item"}
          >
            Login
          </Link>
        </li>
        <li>
        <Link to="/">
          <div className="shopping-cart">
          <FaShoppingCart size={30} style={{ color: "#3581b8" }} />
          </div>
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
