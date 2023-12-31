import "../Cart/style.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { FaTimes } from "react-icons/fa";
import { set } from "mongoose";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.purchaseQuantity);

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (value === "0" || !value) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <div className="cart-item-title">
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
        <div className="input-container">
          <div>
          <p>Quantity:</p>
          </div>
          <input
            className="form-input"
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <FaTimes
            className="trash-icon"
            onClick={() => removeFromCart(item)}
            role="img"
            aria-label="trash"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
