import { useQuery } from "@apollo/client";
import { QUERY_STORES } from "../../utils/queries";
import { useParams } from "react-router-dom";
import "./Stores.css";
import store1 from "../../assets/images/BayaniDelhi.png";
import store2 from "../../assets/images/SunsetShack.png";

const Stores = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_STORES, {
    variables: { _id: id },
  });

  if (loading) return <div>Loading...</div>;
  const stores = data.getStores;
  if (error) return <div>Something Wrong</div>;
  console.log(stores);
  return (
    <div className="store-container">
      <h2>Stores</h2>
      <div className="store-grid">
        {stores.map((store) => (
          <div key={store._id} className="store-card">
            <img
              src={Math.random() < 0.5 ? store1 : store2}
              alt={store.name}
              className="store-icon"
            />
            <h3>{store.name}</h3>
            <h4>Location: {store.location}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
