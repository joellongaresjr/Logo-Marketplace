import "./ProductStyles.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ITEM } from "./../../utils/queries";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { FaPlus, FaMinus } from "react-icons/fa";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === product._id);
    const newQuantity = itemInCart
      ? count + parseInt(itemInCart.purchaseQuantity)
      : count;
  
    if (count > 0) {
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: product._id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + count,
        });
  
        idbPromise("cart", "put", {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + count,
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          product: { ...product, purchaseQuantity: count },
        });
  
        idbPromise("cart", "delete", { ...product, purchaseQuantity: count });
      }
    }
  };
  
  const { loading, data } = useQuery(QUERY_ITEM, {
    variables: { _id: id },
  });

  if (loading) return <div>Loading...</div>;

  const product = data.getProduct;

  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  let dollarString = new Intl.NumberFormat("en-US", formatting_options).format(
    product.price
  );

  const amountChangeHandler = (event) => {
    setCount(event.target.value);
  };

  return (
    <div className="product-container">
      <Container className="product-card">
        <img
          className="product-img"
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="text-container">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <b>Price: {dollarString}</b>
          </p>
          <p>In Stock: {product.stockQuantity} units</p>
        </div>
        <form className="input-section" id="add-to-cart">
          <FaMinus
            className="minus"
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
              }
            }}
          />
          <input
            value={count}
            onChange={amountChangeHandler}
            className="amount-input"
          ></input>
          <FaPlus
            className="plus"
            onClick={() => {
              if (count < product.stockQuantity) {
                setCount(count + 1);
              }
            }}
          />
        </form>
        <button className="add-cart" onClick={addToCart}>
          Add to Cart
        </button>
      </Container>
    </div>
  );
};

export default Product;
