import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import emailjs from "@emailjs/browser";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

import "./SuccessStyles.css";

const Success = () => {
  const token = localStorage.getItem("id_token");
  const decodedToken = Auth.getProfile(token);
  const globalCart = useSelector((state) => state.cart);
  const storedCart = idbPromise("cart", "get");
  const [formComplete, setFormComplete] = useState(false);
  const [formState, setFormState] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  console.log(decodedToken);

  const [cart, setCart] = useState([]);
  let products = [];

  useEffect(() => {
    async function getCart() {
      const idbcart = await idbPromise("cart", "get");
      idbcart.map((item) => {
        if (item.name) {
          products.push(item);
        }
      });
      setCart(products);
      products.map((item) => {
        idbPromise("cart", "delete", item);
      });
      const stringEmail = JSON.stringify(decodedToken.data.email);
      const stringName = JSON.stringify(decodedToken.data.username);


      console.log(stringEmail);
      console.log(stringName);


      setFormState({
        ...formState,
        user_email: stringEmail,
        user_name: stringName
      });

    }
    getCart();
  }, []);

  console.log("this is the stored cart", storedCart);
  console.log("this is the global", globalCart);
  console.log("this is the local", cart);

  const createMessage = () => {
    const cartItems = cart;
    const cartInfo = [];
    cartItems.forEach((item, index) => {
      cartInfo.push(
        `${index + 1}. ${item.name} - Price: $${item.price}, Quantity: ${item.purchaseQuantity
        }\n`
      );
    });
    const message = `
    Thank you for your purchase!

    ${cartInfo}

    If you have any questions or concerns, please feel free to contact us.`;

    setFormState({ ...formState, message: message });
    return message;
   };

  const sendInvoice = () => {
    const cartItems = cart;
    const cartInfo = [];
    cartItems.forEach((item, index) => {
      cartInfo.push(
        `${index + 1}. ${item.name} - Price: $${item.price}, Quantity: ${item.purchaseQuantity
        }\n`
      );
    });
    const message = `
    Thank you for your purchase!

    ${cartInfo}

    If you have any questions or concerns, please feel free to contact us.`;

    setFormState({ ...formState, message: message });
    console.log(formState)
    emailjs
      .sendForm(
        "service_9v3d86w",
        "template_d90459p",
        formState.current,
        "7Fjxh4cd-qP264EKp"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormState({
            user_name: "",
            user_email: "",
            message: "",
          });
          setFormSubmitted(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="success-page">
      <div className="summary">
        <div className="title">
          <h2>Thank you for your purchase!</h2>
          <h3>You will receive an email confirmation shortly.</h3>
        </div>
        <div className="summary-grid">
          <h3> Order Summary:</h3>
          {cart.map((product) => (
            <div className="ordered-items" key={product._id}>
              <div>
                <p>{product.name}</p>
                <img src={product.imgUrl} alt="deez" />
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.purchaseQuantity}</p>
                <Link to={`/products/${product._id}`}>
                  <button className="reorder-btn" type="submit">
                    Purchase Again!
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Success;
