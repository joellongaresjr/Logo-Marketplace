import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ItemContainer from './../../components/ItemContainer';

const cardStyling = {
  title: 'Home',
  text: 'Test Text',
  link: '#',
  imgSrc: 'https://loremflickr.com/320/240',
  altText: 'alt-text',
};

// Need to save database objects to state

const Home = () => {

  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card>
            <ItemContainer {...cardStyling} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
