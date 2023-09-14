import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import './OrderHistory.css'


const OrderHistory = () => {
  const { data } = useQuery(QUERY_USER);
  let user;
  console.log(data);

  if (data) {
    user = data.user;
    // console.log(user);
    // console.log(user.username);
    // console.log(user.orders);
    // console.log(user.orders);
    // console.log(user.orders._id);
    // console.log(user.orders[0].purchaseDate);
    // console.log(user.orders[0].products);
  }

  return (
    <>
      {user ? (
        <div>
          <div className="order-history">
            <div className="order-history-container">
              <div className="order-history-title">
                <h2>Order History for {user.username} </h2>
              </div>
              <div className="order-history-grid">
                {user.orders.map((order) => (
                  <div key={order._id} className="order-history-item">
                    <div className="order-details">
                    <div className="order-number">
                      <h5> Confirmation: #{order._id}</h5>
                    </div>
                    <div className="order-date">
                      <h5>
                        {" "}
                        {new Date(
                          parseInt(order.purchaseDate)
                        ).toLocaleDateString()}
                      </h5>
                    </div>
                    <h5>Order Details</h5>
                    </div>
                    <div className="order-total">
                      {/* <h3>Order Total: </h3> */}
                    </div>
                    <div className="product-details">
                      <div className="product-details-grid">
                        {order.products.map(
                          ({ _id, imageUrl, name, price }, index) => (
                            <div key={index} className="order-products-item">
                            <div className="order-product-image">
                              <img src={imageUrl} alt="product" />
                                </div>
                                <div className="order-product-name">
                                <p>{name}</p>
                                </div>
                              <div className="order-product-price">
                              <p>Price: {price}</p>
                              </div>

                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderHistory;
