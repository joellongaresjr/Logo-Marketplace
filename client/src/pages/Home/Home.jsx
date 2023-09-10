import "./Home.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import  Hero  from "../../components/Hero/Hero.jsx";
import ProductList from "../../components/ProductList";

const Home = () => {
 

  return (
    <>
      <Hero />
      <ProductList />
    </>
  );
};

export default Home;
