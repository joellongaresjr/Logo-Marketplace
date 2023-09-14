import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "./../../utils/mutations";
import { idbPromise } from "../../utils/helpers";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./SuccessStyles.css";
import emailjs from "@emailjs/browser";

const Success = () => {
  const { id } = useParams();
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

  const [addOrderMutation] = useMutation(ADD_ORDER);

  const { data } = useQuery(QUERY_USER);


    if (data) {
    console.log(data.user.email);
    }


  const sendEmail = async () => {
    const shipping = await idbPromise("shipping", "get");
    const email = data.user.email;
    console.log(shipping);
    if (shipping) {
    const templateParams = {
      full_name: shipping.full_name,
      email: email,
      city: shipping.city,
      address: shipping.address,
      state: shipping.state,
      zip: shipping.zip,
    };
    emailjs
      .send(
        "service_2znmc3b",
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
      await idbPromise("shipping", "delete");
    } else {
      return
    }

  };

  window.onload = sendEmail();


  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");

      console.log(stringEmail);
      console.log(stringName);


        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
        console.log(addOrderMutation);
      }
    }

    saveOrder();
  }, [addOrderMutation]);

  return (
    <div className="success-page">
      <div className="summary">
        <div className="title">
          <h2>Thank you for your purchase!</h2>
          {/* <h3>Your order number is: {id}</h3> */}
          <h3>You will receive an email confirmation shortly.</h3>
        </div>
        <div className="summary-grid">
          <h3> Order Summary:</h3>

          {cart
            .filter((product) => product._id !== "shippingInfo")
            .map((product) => (
              <div className="ordered-items">
                <div key={product._id}>
                  <p>{product.name}</p>
                  <img src={product.imgUrl} alt="deez" />

                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.purchaseQuantity}</p>
                  <Link to={`/products/${product._id}`}>
                    <button className="reorder-btn" type="submit">
                      <a href="/pro">Purchase Again!</a>
                    </button>
                  </Link>
                  <button> </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Success;
