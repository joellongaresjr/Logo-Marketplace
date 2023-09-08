import "./ItemContainer.css";
import React from "react";
import { Card } from "react-bootstrap";

const ItemContainer = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Link href="#">{props.link}</Card.Link>
        <Card.Img variant="top" src={props.imgSrc} alt="alt-text" />
        <Card.Text>{props.title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;
