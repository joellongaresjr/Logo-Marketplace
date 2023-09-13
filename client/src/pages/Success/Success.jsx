import "./SuccessStyles.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT_BY_CATEGORY, QUERY_USER } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../utils/auth";

const Success = () => {
  const token = localStorage.getItem("id_token");
  const decoded = Auth.getProfile(token);

  console.log(decoded);

  useEffect(() => {
    if (!decoded) {
      window.location.assign("/");
    }

    if (decoded) {
      

  }, [decoded]);

  return <div>Loading...</div>;

  return (
    <div className="success-page">
      <h2>Thank you for your purchase!</h2>
      <h3>Your order number is: {id}</h3>
      <h3>You will receive an email confirmation shortly.</h3>
      <div className="item-grid">
        {products.map((product) => (
          <div key={product._id}>
            <ItemContainer
              name={product.name}
              price={product.price}
              imgUrl={product.imageUrl}
              _id={product._id}
              featured={product.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success;
