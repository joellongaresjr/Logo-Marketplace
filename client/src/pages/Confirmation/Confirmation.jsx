import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Confirmation = () => {
    const state = useSelector((state) => {
        return state;
    });
    const dispatch = useDispatch();
    const [checkoutCompleted, setCheckoutCompleted] = useState(false); // Track checkout completion
    
    const [getCheckout, { data, loading }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function saveOrder() {
            const order = data.checkout.session;
            console.log(order);
            dispatch({ type: "ADD_MULTIPLE_TO_CART", products: [] });
            order.products.forEach((item) => {
                idbPromise("cart", "delete", item);
            });
            setCheckoutCompleted(true); // Mark checkout as completed
        }


    }, [data, loading, getCheckout, dispatch]);

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });
    }

    function totalItems(cart) {
        return cart.reduce((sum, i) => sum + i.quantity, 0);
    }

    function calculateTotal(cart) {
        return cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
    }

    return (
        <div className="container">
            <h2>Checkout</h2>
            <h3>
                {state.cart.length
                    ? `Order ${totalItems(state.cart)} item(s) for ${calculateTotal(
                          state.cart
                      )}`
                    : "Your cart is empty"}
            </h3>
            {state.cart.length ? (
                <button onClick={submitCheckout}>Checkout</button>
            ) : null}
            {checkoutCompleted && (
                <div>
                    <h2>Thank you for your purchase!</h2>
                    <h3>
                        You will now be redirected to the payment page. If you are not
                        redirected, please click the button below.
                    </h3>
                    <button onClick={() => getCheckout()}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Confirmation;
