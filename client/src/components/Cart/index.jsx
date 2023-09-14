import { QUERY_CHECKOUT } from "../../utils/queries";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/index";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { FaTimes } from "react-icons/fa";
import "./style.css";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";

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
          <h2>Your Cart</h2>
        </div>

        <div className="cart-items">
          {cart.length ? (
            <>
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
              {Auth.loggedIn() ? (
                <div>
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
            <div>
              <Link to="/confirmation" className="centered-text">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Cart;

