import "./ItemContainerStyles.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";

const ItemContainer = (props) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const [, dispatch] = useStoreContext();

  const addToCart = () => { 
    dispatch({ type: "ADD_TO_CART", product: props });
  };


  let dollarString = new Intl.NumberFormat("en-US", formatting_options).format(
    props.price
  );

  console.log("here are the:", props)
  return (
    <Card>
      <Card.Body>
        <Link to={props.link} className="card-link">
          <Card.Img variant="top" src={props.imgUrl} alt="alt-text" />
          <Card.Text>{props.name}</Card.Text>
        </Link>
        <Card.Text>{dollarString}</Card.Text>
        <button onClick={addToCart} className="btn">Add to Cart</button>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;
