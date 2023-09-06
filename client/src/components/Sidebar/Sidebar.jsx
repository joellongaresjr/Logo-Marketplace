import { FaAngleRight, FaStore, FaTag } from 'react-icons/fa';
import './Sidebar.css'
import { Link } from 'react-router-dom'
 


const Sidebar = () => {
    return (
        <div className='fluid'>
            <div className='row'>

                <div style={{backgroundColor: '#35393e'}} className='col-auto col-md-1.5 min-vh-100 '>
                    <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='fs-4 mt-5 fw-bold flex-grow-1'>Best Sellers</span>
                </a>
                <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='fs-4 mt-5 fw-bold flex-grow-1'>Featured Products</span>
                </a>
                <ul className='nav nav-pills flex-column'>
                    <li className='nav-item'>
                        <a className='nav-link text-white' to='/Categories'>
                          <FaAngleRight size={15} style={{ color: "#3581b8" }}/> Categories
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link text-white' to='/Prices'>
                        <FaTag size={15} style={{ color: "#3581b8" }}/> Prices
                        </a>

                    </li>
                    <li className='nav-item'>
                        <a className='nav-link text-white' to='/Stores'>
                           <FaStore size={15} style={{ color: "#3581b8" }}/> Stores
                        </a>
                    </li>


                            
                </ul>
        </div>
        </div>
        </div>

    )
}
    
 



export default Sidebar;
