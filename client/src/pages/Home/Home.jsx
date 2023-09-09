import "./Home.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import  Hero  from "../../components/Hero/Hero.jsx";
import ItemContainer from "../../components/ItemContainer/ItemContainer";

const Home = () => {
  const cardStyling = {
    title: "Home",
    text: "Test Text",
    link: "#",
    imgSrc: "https://loremflickr.com/320/240",
    altText: "alt-text",
  };

  const numberOfItems = 100; // Set the number of items you want to render

  // Create an array of elements to render
  const itemsToRender = Array.from({ length: numberOfItems }, (_, index) => (
    <ItemContainer key={index} {...cardStyling} />
  ));

  return (
    <>
      <Hero />
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="item-grid">{itemsToRender}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
