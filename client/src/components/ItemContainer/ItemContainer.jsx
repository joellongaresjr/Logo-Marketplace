import "./ItemContainerStyles.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const ItemContainer = (props) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const [state, dispatch] = useStoreContext();

  const {cart} = state;

  // console.log(props._id)

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === props._id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: props._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...props, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...props, purchaseQuantity: 1 });
    }
  };



  let dollarString = new Intl.NumberFormat("en-US", formatting_options).format(
    props.price
  );

  // console.log("here are the:", props)
  return (
    <Card>
      <Card.Body>
        <Link to={`products/${props._id}`} className="card-link">
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
