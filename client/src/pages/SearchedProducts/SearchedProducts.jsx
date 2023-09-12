import "./SearchedProducts.css";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_FUZZY } from "../../utils/queries";
import ItemContainer from "../../components/ItemContainer/ItemContainer";

const SearchedProducts = () => {
  const { search } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS_FUZZY, {
    variables: { query: search },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const products = data.getProductsFuzzy;

  return (
    <Container className="search-page">
      <h2>Your Search Returned: {products.length} results</h2>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <div className="item-grid">
            {products.map((product) => (
              <div key={product._id}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchedProducts;
