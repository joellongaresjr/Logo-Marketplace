import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import ConfirmationItem  from "../../components/ConfirmationItem/ConfirmationItem";
import { ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART } from "../../utils/actions";
import Auth from "../../utils/auth";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Confirmation = () => {

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

useEffect(() => {
    async function getCart() {
        const cart = await idbPromise("cart", "get");
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }
    if (!state.cart.length) {
        getCart();
    }
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
    });

    getCheckout({
        variables: { products: productIds },
    });
}
    onChange = (e) => {
        const value = e.target.value;
        if (value === "0") {
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
        <div className="confirmation">
            <h2> Confirmation</h2>
            <div className="confirmation-container">
                <div className="confirmation-items">
                    {state.cart.length ? (
                        <>
                            {state.cart.map((item) => (
                                <ConfirmationItem key={item._id} item={item} />
                            ))}
                            {Auth.loggedIn() ? (
                                <button onClick={submitCheckout}>
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
                    <h3>
                        Total: ${calculateTotal()}
                    </h3>
                    <h3>
                        Total Items: {totalItems()}
                    </h3>
                </div>
            </div>
        </div>

                        
    )
}
       
            


export default Confirmation;
