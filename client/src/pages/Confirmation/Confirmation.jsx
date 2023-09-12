import { useEffect } from "react";
import { useQuery } from "@apollo/client";
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

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Confirmation = () => {
const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
const cart = useSelector((state) => state.cart);


  const dispatch = useDispatch();
 

  useEffect(() => {
    if (data) {
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

    cart.forEach((item) => {
        console.log(item)
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
    <div className="confirmation">
      <h2>Confirmation</h2>
      <div className="confirmation-container">
        {state.cart.length ? (
          <>
            {state.cart.map((item) => (
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
            {Auth.loggedIn() ? (
              <button className="confirmation-btn" onClick={submitCheckout}>
                <a href="/confirmation">Checkout</a>
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
