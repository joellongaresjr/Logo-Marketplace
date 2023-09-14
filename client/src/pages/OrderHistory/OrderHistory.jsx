import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const OrderHistory = () => {
  const { data } = useQuery(QUERY_USER);
  let user;
  console.log(data);

  if (data) {
    user = data.user;
    console.log(user);
    console.log(user.username);
    console.log(user.orders);
    console.log(user.orders);
    console.log(user.orders._id)
  }


  return (
    <>
      {user ? (
        <div>
          <div className="order-history">
            <div className="order-history-container">
              <div className="order-history-title">
                <h1>Order History for {user.username} </h1>
                        </div>
                    <div className="order-history-grid">
                        {user.orders.map((order) => (
                            <div key={order._id} className="order-history-item">
                             <div className="order-number">
                               <h3>Order Number: 1</h3>
                             </div>
                             <div className="order-date">
                               <h3>Order Date: 1/1/2021</h3>
                             </div>
                             <div className="order-total">
                               <h3>Order Total: $100</h3>
                             </div>
                             <div className="order-details">
                               <h3>Order Details</h3>
                               <div className="order-details-grid">
                                 <div className="order-details-item">
                                   <h3>Product Name</h3>
                                   <h3>Product image</h3>
                                   <h3>Product Price</h3>
                                 </div>
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
