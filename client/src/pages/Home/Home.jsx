import "./Home.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Hero from "../../components/Hero/Hero.jsx";
import ItemContainer from "../../components/ItemContainer/ItemContainer";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_PAGINATED } from "./../../utils/queries";
import introJs from 'intro.js';
import 'intro.js/introjs.css';

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();

  const { data } = useQuery(QUERY_PRODUCTS_PAGINATED, {
    variables: { limit: 10, offset: (pageNumber - 1) * 10 },
    skip: !hasMore,
  });

  useEffect(() => {
    if (!data || !data.getProducts) return;

    const newProducts = data.getProducts;

    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setItems((prevItems) => [...prevItems, ...newProducts]);
      setLoading(false);
    }
  }, [data]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore || !node) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      observer.observe(node);
      return null;
    },
    [loading, hasMore]
  );

  return (
    <>
      <Hero />
      <div className="item-grid">
        {items.map((product, index) => (
          <div
            key={product._id}
            ref={index === items.length - 1 ? lastItemRef : null}
          >
            <ItemContainer
              name={product.name}
              price={product.price}
              imgUrl={product.imageUrl}
              _id={product._id}
              featured={product.featured}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
