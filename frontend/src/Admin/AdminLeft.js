import { useState } from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdAddBox, MdOutlineReviews } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import '../Admin/Assets/AdminSidebar.css';

function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
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
