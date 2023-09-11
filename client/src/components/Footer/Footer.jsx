import { Card } from "react-bootstrap";
import "./FooterStyles.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-text">
        <Card.Body>
          <p>LOGO MarketPlace</p>
          <p>1234 Main Street Anytown, USA 12345</p>
          <p>Phone: 1.555.555.5555 Email: lmp@email.com</p>
          <p>
            LOGO MarketPlace is a pinoy store. Save time & shop groceries
            online. Groceries on your schedule for deliver. Skip the lines with
            Grocery Deliver at Whole Foods Market.
          </p>
          <p className="name">
            Joel Longares, Karen Shivranyan, Jarell Chinn, Michael Mattingly
          </p>
          <p className="copyright">Copyright &copy; {year}</p>
        </Card.Body>
      </div>
    </footer>
  );
};

export default Footer;
