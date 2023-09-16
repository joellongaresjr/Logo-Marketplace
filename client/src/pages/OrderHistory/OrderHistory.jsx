import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import "./OrderHistory.css";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";
import { convertToPHP } from "../../utils/helpers";
import { useEffect, useState } from "react";
import "animate.css";

const OrderHistory = () => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converted, setConverted] = useState(false);
  const { data, loading } = useQuery(QUERY_USER);
  let user;
  console.log(data);

  // const convertAmount = async (amount) => {
  //  if (converted) {
  //    return;
  //   } else {
  //   setConverted(true);
  //   const newAmountFormatted = await convertToPHP(amount);
  //   const newAmountFormat = await newAmountFormatted.replace(/[₱,]/g, "");
  //   const newAmount = await parseFloat(newAmountFormat);
  //   setConvertedAmount(newAmount);
  //   }
  // };
  const convertPrice = async (price) => {
      const convertedPrice = await convertToPHP(price);
      return `₱${convertedPrice}`;
  };



  if (loading) {
    return <h1 className="wait-screen">Loading...</h1>;
  }

  
  if (data) {
    user = data.user;
    console.log(user);
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
                                <p>{name}</p>
                              </div>
                              <div className="order-product-name"></div>
                              <div className="order-product-price">
                                {order.currency === "USD" ? (
                                  <p>Price: ${price}</p>
                                ) : ( 
                                  <p>
                                    Price: 
                                     <span
                                      value={convertPrice(price)}
                                     >
  
                                       ${price}
                                     </span>
                                  </p>
                                )}
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
      ) : (
        <h1 className="wait-screen">Loading...</h1>
      )}
    </>
  );
};

export default OrderHistory;
