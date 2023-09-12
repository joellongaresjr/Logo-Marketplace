import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT_BY_CATEGORY } from "../../utils/queries";
import ItemContainer from "../../components/ItemContainer/ItemContainer";

const CategoryProducts = () => {
  const { id } = useParams();

  console.log(id);
  const { loading, data } = useQuery(QUERY_PRODUCT_BY_CATEGORY, {
    variables: { _id: id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const products = data.getProductsByCategory;

  return (
    <div className="search-page">
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

export default CategoryProducts;
