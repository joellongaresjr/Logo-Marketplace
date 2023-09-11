import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import Auth from "../../utils/auth";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Confirmation = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
    setCartOpen(false);
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });

    return sum.toFixed(2);
  }

  function totalItems() {
    let total = 0;
    state.cart.forEach((item) => {
      total += item.purchaseQuantity;
    });

    return total;
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
      setCartOpen(false);
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

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(newQuantity),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(newQuantity) });
    }
  };

  return (
    <div className="cart-and-confirmation">
      <h2>Cart and Confirmation</h2>
      <div className="confirmation-container">
        {state.cart.length ? (
          <>
            {state.cart.map((item) => (
              <div key={item._id} className="confirmation-item">
                <div>
                  {item.name}, ${item.price}
                </div>
                <div>
                  <span>Qty:</span>
                  <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={(e) => updateQuantity(item, e.target.value)}
                  />
                  <span
                    role="img"
                    aria-label="trash"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove Item
                  </span>
                </div>
              </div>
            ))}
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>
                <a href="/confirmation">Submit Order</a>
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </>
        ) : (
          <h3>Nothing in your cart yet!</h3>
        )}
      </div>
      <div className="confirmation-total">
        <h3>Total: ${calculateTotal()}</h3>
        <h3>Total Items: {totalItems()}</h3>
      </div>
    </div>
  );
};

export default Confirmation;
