import { useEffect } from "react";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CartItem from "../CartItem/index";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
import { useLazyQuery } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    getCheckout({
      variables: { products: productIds },
    });
  }
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          Cart
        </span>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          X
        </span>
      </div>
      <div>
        <h2>Your Cart</h2>
      </div>

      <div className="cart-items">
        <div className="cart-item">
          <span className="item-name">Sample Item</span>
          <span className="item-price">$9.99</span>
        </div>
      </div>

      {/* <h3>Nothing in your cart yet!</h3> */}

      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default Cart;
