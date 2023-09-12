import "./ConfirmInfo.css";

const ConfirmInfo = () => {
  return (

      <div className="confirm-info-container">
        <h2>Billing Info</h2>
        <label className="name">Name</label>
        <input className="name-input" type="text" placeholder="Name" />
        <label className="address">Address</label>
        <input className="address-input" type="text" placeholder="Address" />
        <label className="city">City</label>
        <input className="city-input" type="text" placeholder="City" />
        <div className="location-info">
          <div className="location">
            <label className="state">State</label>
            <input className="state-input" type="text" placeholder="State" />
          </div>
          <div className="zip-info">
            <label className="zip">Zip</label>
            <input className="zip-input" type="text" placeholder="Zip" />
          </div>
        </div>
      </div>
  );
};

export default ConfirmInfo;
