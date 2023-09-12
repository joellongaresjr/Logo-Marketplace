import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_PRODUCT_BY_CATEGORY } from "../../utils/queries";

import ItemContainer from "../../components/ItemContainer/ItemContainer";
import { Col, Container, Row } from "react-bootstrap";

const CategoryProducts = () => {
  const { id } = useParams();

  console.log(id);

  const { loading, data } = useQuery(QUERY_PRODUCT_BY_CATEGORY, {

    variables: { _id: id },
  });

  if (loading) {

    return <div>Loading...</div>;

  }

  const products = data.getProductsByCategory;

  return (
    <Container className="search-page">
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

export default CategoryProducts;
