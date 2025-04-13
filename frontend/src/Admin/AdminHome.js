import React, { useState, useEffect } from 'react';
import {Card, Spinner } from 'react-bootstrap';
import { FaBox, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getprod } from "../Services/api";
import '../Admin/Assets/AdminHome.css';

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await getprod();
        const productData = result?.data || result || [];
        
        setProducts(productData);
        
        // Count products by category
        const categoryCount = productData.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        
        setCategories(categoryCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, []);

  // Get current date in formatted string
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get recent products (last 5 added)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b._id?.getTimestamp?.() || 0) - new Date(a._id?.getTimestamp?.() || 0))
    .slice(0, 5);



  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="date-display">{currentDate}</p>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="info" />
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Key Metrics */}a
          <div className="dashboard-summary">
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-icon">
                  <FaBox />
                </div>
                <div className="summary-content">
                  <h3>Total Products</h3>
                  <h2>{products.length}</h2>
                  <Link to="/admin/ViewProducts" className="view-link">Manage Products</Link>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="summary-card">
              <Card.Body>
                <div className="summary-icon">
                  <FaLayerGroup />
                </div>
                <div className="summary-content">
                  <h3>Product Categories</h3>
                  <h2>{Object.keys(categories).length}</h2>
                  <Link to="/admin/AddProducts" className="view-link">Add New Product</Link>
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Category Breakdown */}
          <div className="category-section">
            <h2>Category Breakdown</h2>
            <div className="category-grid">
              {Object.entries(categories).map(([category, count], index) => (
                <div className="category-item" key={index}>
                  <h3>{category}</h3>
                  <p>{count} products</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Products */}
          {recentProducts.length > 0 && (
            <div className="recent-section">
              <h2>Recently Added Products</h2>
              <div className="table-responsive">
                <table className="recent-products-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="product-image-cell">
                          <img 
                            src={`http://localhost:5000/${product.pic}`} 
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                          <Link 
                            to={`/admin/ViewProducts`}
                            className="view-details-btn"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminHome;