import "./Success.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";


const Success = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT_BY_CATEGORY, {
    variables: { _id: id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const products = data.getProductsByCategory;

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
