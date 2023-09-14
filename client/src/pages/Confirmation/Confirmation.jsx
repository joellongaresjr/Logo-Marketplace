import { useEffect, useState, useRef } from "react";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import {
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../utils/actions";
import Auth from "../../utils/auth";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "./Confirmation.css";
import { Link } from "react-router-dom";
import { FaAddressBook, FaCity, FaUser } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Confirmation = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    full_name: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    _id: "shippingInfo",
  });

  const form = useRef();

  useEffect(() => {
    idbPromise("shipping", "delete", { _id: "shippingInfo" });
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });

    return sum.toFixed(2);
  }

  function totalItems() {
    let total = 0;
    cart.forEach((item) => {
      total += item.purchaseQuantity;
    });

    return total;
  }

  function submitCheckout(event) {
    event.preventDefault();
    const productIds = [];

    idbPromise("shipping", "put", {
      ...shippingInfo,
    });

    
    cart.forEach((item) => {
      idbPromise("cart", "put", { ...item});
      console.log(item);
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (action, item) => {
    const updatedQuantity =
      action === "increment"
        ? item.purchaseQuantity + 1
        : item.purchaseQuantity - 1;

    if (updatedQuantity <= 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: updatedQuantity,
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: updatedQuantity });
    }
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation">
        <div className="confirmation-items">
          <div className="order-items">
            <h2>Order Confirmation</h2>
            <div className="confirmation-container">
              {cart.length ? (
                <>
                  {cart.map((item) => (
                    <div key={item._id} className="confirmation-item">
                      <div className="confirmation-img">
                        <Link to={`/products/${item._id}`}>
                          <img src={item.imgUrl} alt={item.name} />
                        </Link>
                      </div>
                      <div className="item-values">
                        <div>
                          <p>{item.name} </p>
                        </div>

                        <FaMinus
                          className="minus minus-confirmation"
                          onClick={() => onChange("decrement", item)}
                        />
                        <input
                          className="confirmation-input amount-input"
                          placeholder="1"
                          value={item.purchaseQuantity}
                          onChange={onChange}
                        />
                        <FaPlus
                          className=" plus plus-confirmation"
                          onClick={() => onChange("increment", item)}
                        />
                        <div>
                          <div className="price">
                            <p>${item.price}</p>
                          </div>
                        </div>
                        <div className="remove-item">
                          <FaTrash
                            className="trash"
                            onClick={() => removeFromCart(item)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h3>Nothing in your cart yet!</h3>
              )}

              <div className="confirmation-total">
                <h3>Total: ${calculateTotal()}</h3>
                <h3>Total Items: {totalItems()}</h3>
              </div>
            </div>
          </div>
          <form onSubmit={submitCheckout}>
            <div className="confirm-info">
              <div className="confirm-info-container">
                <h2>Billing Info</h2>
                <div className="co-logo">
                  <FaUser className={FaUser} />
                  <label className="name">Name</label>
                </div>
                <input
                  className="name-input"
                  type="text"
                  placeholder="Name"
                  value={shippingInfo.full_name}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      full_name: e.target.value,
                    })
                  }
                  required
                />
                <div className="co-logo">
                  <FaAddressBook />
                  <label className="address">Address</label>
                </div>
                <input
                  className="address-input"
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                  required
                />
                <div className="co-logo">
                  <FaCity className={FaCity} />
                  <label className="city">City</label>
                </div>
                <input
                  className="city-input"
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                  required
                />
                <div className="location-info">
                  <div className="location">
                    <label className="state">State</label>
                    <input
                      className="state-input"
                      type="text"
                      placeholder="State"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          state: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="zip-info">
                    <label className="zip">Zip</label>
                    <input
                      className="zip-input"
                      type="text"
                      placeholder="Zip"
                      value={shippingInfo.zip}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          zip: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {Auth.loggedIn() ? (
              <button className="confirmation-btn" type="submit">
                Confirm
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
