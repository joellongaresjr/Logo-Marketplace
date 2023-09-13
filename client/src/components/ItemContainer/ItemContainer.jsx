import "./ItemContainerStyles.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { idbPromise } from "../../utils/helpers";

const ItemContainer = (props) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  return (
    <Card>
      <Card.Body>
        {props.featured && <p>Featured ✨ Product</p>}
        <Link to={`/products/${props._id}`} className="card-link">
          <Card.Img
            className="card-img"
            variant="top"
            src={props.imgUrl}
            alt="alt-text"
          />
          <Card.Text className="item-title">{props.name}</Card.Text>
        </Link>
        <Card.Text>{dollarString}</Card.Text>
        <button
          onClick={addToCart}
          className="add-to-cart"
          data-step="9"
          data-intro="Click this to add to cart!"
        >
          Add to Cart
        </button>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;
