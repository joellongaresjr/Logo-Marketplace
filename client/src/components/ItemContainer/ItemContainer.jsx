import "./ItemContainerStyles.css";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { convertToPHP, idbPromise } from "../../utils/helpers";

const ItemContainer = (props) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  const addToCart = async () => {
 
    try {
      
      const newAmountFormatted = await convertToPHP(props.price);
      const newAmountFormat = await newAmountFormatted.replace(/[₱,]/g, "");
      
      const newAmount = await parseFloat(newAmountFormat);
      console.log(newAmount);
      

      const itemInCart = cart.find((cartItem) => cartItem._id === props._id);


      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: props._id,
          convertedAmount: newAmount,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise("cart", "put", {
          ...itemInCart,
          convertedAmount: newAmount,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...props, convertedAmount: newAmount, purchaseQuantity: 1 },
        });
        idbPromise("cart", "put", {
          ...props,
          convertedAmount: newAmount,
          purchaseQuantity: 1,

        });
      }
    } catch (error) {
      console.error("Error converting to PHP:", error);
    }
  };

  let dollarString = new Intl.NumberFormat("en-US", formatting_options).format(
    props.price
  );

  useEffect(() => {
    convertToPHP(props.price)
      .then((newAmountFormatted) => {
        setConvertedAmount(newAmountFormatted);
      })
      .catch((error) => {
        console.log("Error converting to PHP:", error);
      });
  }, [props.price]);

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
        <Card.Text>{convertedAmount}</Card.Text>
        <button
          onClick={addToCart}
          className="add-to-cart"
          {...(props.showIntro
            ? { "data-step": "9", "data-intro": "Click this to add to cart!" }
            : {})}
        >
          Add to Cart
        </button>
      </Card.Body>
    </Card>
  );
};

export default ItemContainer;