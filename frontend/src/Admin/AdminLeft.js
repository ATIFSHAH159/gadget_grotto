import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { FaEye, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import '../Admin/Assets/AdminSidebar.css';
import AuthContext from '../Context/AuthContext';
import { NavLink } from "react-router-dom";
import { FaStar, FaShoppingBag, FaChartBar } from "react-icons/fa";

function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-brand">GADGET GROTTO</h2>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            
            <div className={`sidebar-content ${isOpen ? 'open' : ''}`}>
               
                <ul>
                    <li>
                        <Link to="/admin/" className="sidebar-link" onClick={closeSidebar}>
                            <IoHome fontSize="24px" /> Home
                        </Link>
                    </li>
                    <br/>
                    <li>
                        <Link to="/admin/AddProducts" className="sidebar-link" onClick={closeSidebar}>
                            <MdAddBox fontSize="24px" /> Add Products
                        </Link>
                    </li>
                    <br/>
                    <li>
                        <Link to="/admin/ViewProducts" className="sidebar-link" onClick={closeSidebar}>
                            <FaEye fontSize="24px" /> View Products
                        </Link>
                    </li>
                    <br/>
                    <li>
                        <NavLink to="/admin/reviews" className="admin-nav-link" onClick={closeSidebar}>
                            <FaStar /> Reviews
                        </NavLink>
                    </li>
                    <br/>
                    <li>
                        <NavLink to="/admin/orders" className="admin-nav-link" onClick={closeSidebar}>
                            <FaShoppingBag /> Order History
                        </NavLink>
                    </li>
                    <br/>
                    <li>
                        <NavLink to="/admin/reports" className="admin-nav-link" onClick={closeSidebar}>
                            <FaChartBar /> Reports
                        </NavLink>
                    </li>
                    <br/>
                    <li>
                        <NavLink to="/admin/users" className="admin-nav-link" onClick={closeSidebar}>
                            <FaUsers /> Manage Users
                        </NavLink>
                    </li>
                </ul>
            </div>
               <br/>
             {/* Admin Profile Section */}
             <div className="admin-profile">
                    <div className="admin-info">
                        <img
                          src={user?.image && (user.image.startsWith('http') ? user.image : `http://localhost:5000/${user.image}`) || '/default-avatar.png'}
                          alt="Profile"
                          className="navbar-profile-img"
                          style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00FFE5', background: '#222', marginRight: 15 }}
                          onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                        />
                        <div className="admin-details">
                            <span className="admin-name">{user?.name}</span>
                            <span className="admin-email" style={{ color: '#B0B0B8', fontSize: '0.95rem' }}>{user?.email}</span>
                            <span className="admin-role">Administrator</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

        </aside>
    );
}

export default AdminSidebar;
