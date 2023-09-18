import { useEffect, useState } from "react";
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
  const [emailSent, setEmailSent] = useState(false);


  const { data } = useQuery(QUERY_USER);
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = await cart.map((item) => item._id);
      const purchaseQuantities = await cart.map((item) => item.purchaseQuantity);
      console.log(purchaseQuantities);
      console.log(products);
      console.log(cart[0].currency);
      console.log(cart);
      if (products.length) {
        console.log(products.currency);
        const { data } = await addOrder({ variables: { products, currency: cart[0].currency, purchaseQuantities } });
        const productData = data.addOrder.products;
        console.log(productData);
        console.log(addOrder)

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

    }
    getCart();
  }, []);







  useEffect(() => {
    // Check if the email has not been sent and the user data is available
    if (!emailSent && data && data.user) {
      sendEmail();
      setEmailSent(true); 
    }
  }, [data, emailSent]);

  const sendEmail = async () => {
    const shipping = await idbPromise('shipping', 'get');
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
        .send('service_funkr13', 
        'template_vp05pxq', 
        templateParams, 
        'H0FuvJUtxgbWKiidH'
        )
        .then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text);
          },
          function (error) {
            console.log('FAILED...', error);
          }
        );
    } else {
      return;
    }
  };
  

  return (
    <div className="success-page">
      <div className="summary">
        <div className="title">
          <h2>Thank you for your purchase!</h2>
          <h3>You will receive an email confirmation shortly.</h3>
        </div>
        <div className="summary-grid">
          {(cart.length === 0) ? (
            <></> ) : (
              <h3> Order Summary:</h3>
          )}
          {cart.map((product) => (
            <div className="ordered-items" key={product._id}>
              <div>
                <p>{product.name}</p>
                <img src={product.imgUrl} alt="deez" />
                {product.currency === "USD" ? (
                   <p>Price: ${product.price}</p> ) : (
                    <p>Price: ₱{product.convertedAmount}</p>
                )}
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