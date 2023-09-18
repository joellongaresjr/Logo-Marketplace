
import { useEffect, useState} from "react";
import "../../pages/OrderHistory/OrderHistory.css";
import { convertToPHP } from "../../utils/helpers";

const OrderDetails = (props) => {
    const [convertedAmount, setConvertedAmount] = useState(null);
    console.log(props.order)
    console.log(props.price)
    useEffect(() => {
        convertToPHP(props.price)
          .then((newAmountFormatted) => {
            setConvertedAmount(newAmountFormatted);
          })
          .catch((error) => {
            console.error("Error converting to PHP:", error);
          });
      }, [props.price]);
      


    return(
        <>
        
        <div className="order-product-price">
                  {props.currency === "USD" ?  (
                    <p>Price: ${props.price}</p>
                  ) : ( 
                    <p>
                      Price: {convertedAmount}
                    </p>
                  )}
                  <div></div>
                </div>

          </>
    )
}

export default OrderDetails;