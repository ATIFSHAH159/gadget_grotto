import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdAddBox, MdOutlineReviews } from "react-icons/md";
import { FaEye, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import '../Admin/Assets/AdminSidebar.css';
import AuthContext from '../Context/AuthContext';

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
                {/* Admin Profile Section */}
                <div className="admin-profile">
                    <div className="admin-info">
                        <FaUser className="admin-icon" />
                        <div className="admin-details">
                            <span className="admin-name">{user?.name}</span>
                            <span className="admin-role">Administrator</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

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
                        <Link to="/admin/Reviews" className="sidebar-link" onClick={closeSidebar}>
                            <MdOutlineReviews fontSize="24px" /> Reviews
                        </Link>
                    </li>
                    <br/>
                </ul>
            </div>
        </aside>
    );
}

export default AdminSidebar;
