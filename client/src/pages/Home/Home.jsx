import "./Home.css";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Hero from "../../components/Hero/Hero.jsx";
import ItemContainer from "../../components/ItemContainer/ItemContainer";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_PAGINATED } from "./../../utils/queries";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const containerRef = useRef();
  const { loading, data } = useQuery(QUERY_PRODUCTS_PAGINATED, {
    variables: { limit: 12, offset: pageNumber * 12 },
  });

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (containerRef.current) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) {
          observer.observe(node);
        }
      }
    },
    [loading]
  );

  useEffect(() => {
    if (!loading && data) {
      setLoadedProducts((prevProducts) => [...prevProducts, ...data.getProducts]);
    }
  }, [loading, data]);

  return (
    <>
      <Hero />
      <Container ref={containerRef}>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <div className="item-grid">
              {loadedProducts.map((product, index) => (
                <div
                  ref={index === loadedProducts.length - 1 ? lastProductRef : null}
                  key={product._id}
                >
                  <ItemContainer
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.imageUrl}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
