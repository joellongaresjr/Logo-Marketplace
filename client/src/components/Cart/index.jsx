import { useEffect } from "react";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CartItem from "../CartItem/index";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const cartOpen = useSelector((state) => state.cartOpen);
  const dispatch = useDispatch();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  function submitCheckout() {
    const productIds = [];
  
    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      } 
    });
    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!cartOpen ) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <a className="nav-item" role="img" aria-label="trash">
          Cart
        </a>
      </div>
    );
  }
  if (window.location.pathname !== "/confirmation") {
    return (
      <div className="cart">
        <div className="close " onClick={toggleCart}>
          <FaTimes style={{ cursor: "pointer" }} />
        </div>
        <div>
          <h2 data-step="10" data-intro="This is your shopping cart!">
            Your Cart
          </h2>
        </div>

        <div
          className="cart-items"
          data-step="11"
          data-intro="These are the items in your cart."
        >
          {cart.length ? (
            <>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
              {Auth.loggedIn() ? (
                <div
                  data-step="12"
                  data-intro="Click here to checkout and complete your purchase!"
                >
                  <Link
                    to="/confirmation"
                    type="button"
                    onClick={submitCheckout}
                  >
                    Checkout
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/login" className="centered-text">
                    LogIn to Checkout
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div
              data-step="13"
              data-intro="You can proceed to checkout from here."
            >
              <Link to="/confirmation" className="centered-text">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
};


export default Cart;
