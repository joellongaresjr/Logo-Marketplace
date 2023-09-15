import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import emailjs from "@emailjs/browser";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../../utils/mutations";


import "./SuccessStyles.css";

const Success = () => {
  const [addOrder] = useMutation(ADD_ORDER);
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

  const { data } = useQuery(QUERY_USER);
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);
      console.log(products);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        console.log(productData);
      }
    }
    saveOrder();
  }, [addOrder]);


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

   if (data) {
    console.log("t", data.user.email);
    }
  const sendEmail = async () => {
    const shipping = await idbPromise("shipping", "get");
    const email = data.user.email;
  
    console.log(shipping[0]);

    if (shipping) {
    let full_name = shipping[0].full_name;
    let city = shipping[0].city;
    let address = shipping[0].address;
    let state = shipping[0].state;
    let zip = shipping[0].zip;
    console.log(full_name);
    const templateParams = {
      full_name: full_name,
      email: email,
      city: city,
      address: address,
      state: state,
      zip: zip,
    };
    emailjs
      .send(
        // "service_2znmc3b",
        "template_lu6xg9c",
        templateParams,
        "SSUEEoQVq8ReyXV1r"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    } else {
      return
    }
  };

  window.onload = sendEmail();

  

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