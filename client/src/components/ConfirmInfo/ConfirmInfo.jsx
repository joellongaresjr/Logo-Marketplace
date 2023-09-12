import {FaAddressBook, FaCity, FaFontAwesome, FaUser } from "react-icons/fa";
import "./ConfirmInfo.css";


const ConfirmInfo = () => {
  return (

      <div className="confirm-info-container">
        <h2>Billing Info</h2>
        <div className="co-logo">
        <FaUser className={FaUser} />
        <label className="name">Name</label>
        </div>
        <input className="name-input" type="text" placeholder="Name" required/>
        <div className="co-logo">
        <FaAddressBook/>
        <label className="address">Address</label>
        </div>
        <input className="address-input" type="text" placeholder="Address" required/>
        <div className="co-logo">
        <FaCity className={FaCity} />
        <label className="city">City</label>
        </div>
        <input className="city-input" type="text" placeholder="City" required/>
        <div className="location-info">
          <div className="location">

            <label className="state">State</label>
            <input className="state-input" type="text" placeholder="State" required/>
          </div>
          <div className="zip-info">
            <label className="zip">Zip</label>
            <input className="zip-input" type="text" placeholder="Zip" required/>
          </div>
        </div>
      </div>
  );
};

export default ConfirmInfo;
