import { Link } from "react-router-dom";
import "./FooterStyles.css";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-text">
        <p className="name">Joel Longares, Karen Shivranyan, Jarell Chinn, Michael Mattingly</p>
        <p className="copyright">Copyright &copy; {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
