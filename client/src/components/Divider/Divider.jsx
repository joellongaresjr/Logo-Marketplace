import './Divider.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Divider = ( {iconClass} ) => {
    console.log(iconClass);
  return (
    <div className="divider">
      <div className="divider-line"></div>
      <div className="divider-icon">
       <FontAwesomeIcon icon={iconClass} />
      </div>
      <div className="divider-line"></div>
    </div>
  );
};

export default Divider;