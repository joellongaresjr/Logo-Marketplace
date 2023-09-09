import "./ItemContainerStyles.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemContainer = (props) => {
  return (
    <Card>
      <Card.Body>
        <Link to={props.link} className="card-link">
          <Card.Img variant="top" src={props.imgSrc} alt="alt-text" />
          <Card.Text>{props.title}</Card.Text>
        </Link>
        <Card.Text>{props.price || "1000.00"}</Card.Text>
        <button className="btn">Add to Cart</button>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;
