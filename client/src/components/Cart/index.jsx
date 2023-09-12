import { useEffect } from "react";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CartItem from "../CartItem/index";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";



const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const cartOpen = useSelector((state) => state.cartOpen);
  const dispatch = useDispatch();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });

    }
    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

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
        <span role="img" aria-label="trash">
          X
        </span>
      </div>
      <div>
        <h2>Your Cart</h2>
      </div>

      <div className="cart-items">
        {cart.length ? (
          <>
            {cart.map(item => (
              <CartItem key={item._id} item={item} />
            ))}
            {Auth.loggedIn() ? (
              <button  onClick={submitCheckout}><a href="/confirmation">Checkout</a></button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </>
        ) : (
          <h3>Nothing in your cart yet!</h3>
        )}
      </div>
    </div>
  );
  }
};


export default Cart;
