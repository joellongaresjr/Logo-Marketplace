import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { QUERY_USER } from "../../utils/queries";
import "./OrderHistory.css";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { Link } from "react-router-dom";
import "animate.css";

const OrderHistory = () => {
  const { data, loading, refetch } = useQuery(QUERY_USER);
  
  useEffect(() => {
    refetch();
  }, [])
  
  if (loading) {
    return <h1 className="wait-screen">Loading...</h1>;
  }
  
  let user;
  if (data) {
    user = data.user;
    console.log(user);
    console.log(user.orders);
  }

  return (
    <>
      {user && data ? (
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
                      <FaAngleDown />
                    </div>
                    <div className="order-total"></div>
                    <div className="product-details">
                      <div className="product-details-grid">
                        {order.products.map(
                          ({ _id, imageUrl, name, price }, index) => (
                            <div key={index} className="order-products-item">
                              <div className="order-product-image">
                                <Link to={`/products/${_id}`}>
                                  <img src={imageUrl} alt="product" />
                                </Link>
                                <div className="order-product-name">
                                  <p>
                                    {name} x {order.purchaseQuantities[index]}
                                  </p>
                                </div>
                              </div>
                              <OrderDetails
                                price={price}
                                currency={order.currency}
                                purchaseQuantities={
                                  order.purchaseQuantities[index]
                                }
                              ></OrderDetails>
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
      ) : (
        <h1 className="wait-screen">Loading...</h1>
      )}
    </>
  );
};

export default OrderHistory;
