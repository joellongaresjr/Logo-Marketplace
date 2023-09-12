import "./ItemContainerStyles.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemContainer = (props) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  let dollarString = new Intl.NumberFormat("en-US", formatting_options).format(
    props.price
  );

  return (
    <Card>
      <Card.Body>
        <Link to={props.link} className="card-link">
          <Card.Img variant="top" src={props.imgUrl} alt="alt-text" />
          <Card.Text>{props.name}</Card.Text>
        </Link>
        <Card.Text>{dollarString}</Card.Text>
        <button className="btn">Add to Cart</button>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;
