import { Card } from "react-bootstrap";
import "./FooterStyles.css";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-text">
        <p className="name">Joel Longares, Karen Shivranyan, Jarell Chinn, Michael Mattingly</p>
        <p className="copyright">Copyright &copy; {year}</p>
        <p>LOGO MarketPlace is a pinoy store. Save time & shop groceries online. Groceries on your schedule for deliver. Skip the lines with Grocery Deliver at Whole Foods Market.</p>
        <Card className="footer-card">
          <Card.Body>
            <Card.Text>LOGO MarketPlace</Card.Text>
            <Card.Text>
              1234 Main Street
              Anytown, USA 12345
            </Card.Text>
            <Card.Text>
              Phone: 1.555.555.5555
              Email: lmp@email.com
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;