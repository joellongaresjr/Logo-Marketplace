import { FaAngleRight, FaStore, FaTag } from 'react-icons/fa';
import './Sidebar.css'
import { Link } from 'react-router-dom'
import 'animate.css'
 


const Sidebar = () => {
    return (
        <div className='fluid sidebar'>
            <div className='row mr-0'>

                <div style={{backgroundColor: '#35393e'}} className='col-auto col-md-1.5 vh-100 sidebar-container'>
                <Link to='/Best-Sellers'>
                <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='fs-4 mt-5 p-3 fw-bold flex-grow-1'>Best Sellers</span>
                </a>
                </Link>
                <Link to='/Featured-Products'>
                <a className='text-decoration-none text-white d-flex align-itemcenter'>
                        <span className='fs-4 mt-5 p-3 fw-bold flex-grow-1 hover-pointer'>Featured Products</span>
                </a>
                </Link>
                <ul className='nav flex-column mt-5'>
                    <li className='sidebar-item categories'>
                        <Link to='/Categories'>
                        <a className='nav-link text-white fs-5'>
                          <FaAngleRight className='categories-icon' size={15} style={{ color: "#3581b8" }}/> Categories
                        </a>
                        </Link>
                    </li>
                    <li className='sidebar-item mt-3'>
                        <Link to='/Prices'>
                        <a className='nav-link text-white fs-5'>
                        <FaTag size={15} style={{ color: "#3581b8" }}/> Prices
                        </a>
                        </Link>

                    </li>
                    <li className='sidebar-item mt-3 fs-5'>
                        <Link to='/Stores'>
                        <a className='nav-link text-white'>
                           <FaStore size={15} style={{ color: "#3581b8" }}/> Stores
                        </a>
                        </Link>
                    </li>


                            
                </ul>
        </div>
        </div>
        </div>

    )
}
    
 



export default Sidebar;
