import "./ProductStyles.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ITEM } from "./../../utils/queries";
import { FaPlus, FaMinus } from "react-icons/fa";

import React from "react";

const Product = () => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_ITEM, {
    variables: { _id: id },
  });

  if (loading) return <div>Loading...</div>;
  const product = data.getProduct; // Assuming getProduct returns a single product

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
        <div className="input-section">
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
        </div>
        <button className="add-cart">Add to Cart</button>
      </Container>
    </div>
  );
};

export default Product;
