import "./HeaderStyles.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";

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
      <div className="nav-title">
        <Link to="/">
          <img
            src={logo}
            style={{ width: "4rem", height: "auto" }}
            className="logo"
          />
        </Link>
        <h1>Logo MarketPlace</h1>
      </div>
      <ul className={burgerClick ? "nav-menu active" : "nav-menu"}>
        <li>
          <form className="nav-search">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">Submit</button>
          </form>
        </li>
        <li>
          <Link
            to="/projects"
            className={pathname === "/projects" ? "current-page" : "nav-item"}
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/resume"
            className={pathname === "/resume" ? "current-page" : "nav-item"}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={pathname === "/contact" ? "current-page" : "nav-item"}
          >
            Cart
          </Link>
        </li>
      </ul>
      <div className="burger" onClick={burgerToggle}>
        {burgerClick ? (
          <FaTimes size={25} style={{ color: "#3a2e39" }} />
        ) : (
          <FaBars size={25} style={{ color: "#3a2e39" }} />
        )}
      </div>
    </header>
  );
};

export default Header;
