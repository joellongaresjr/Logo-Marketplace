import React from "react";

const ItemContainer = () => {
  return (
    <>
      <Card.Body>
        <Card.Link href="#">{cardStyling.link}</Card.Link>
        <Card.Img variant="top" src={cardStyling.imgSrc} alt="alt-text" />
        <Card.Title>{cardStyling.title}</Card.Title>
        <Card.Text>{cardStyling.text}</Card.Text>
      </Card.Body>
    </>
  );
};

export default ItemContainer;
