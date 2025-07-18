import React, { useState, useEffect } from 'react';
import {Card, Spinner } from 'react-bootstrap';
import { FaBox, FaLayerGroup, FaStar, FaComments, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { getprod, getProductReviews, getAllOrders } from "../Services/api";
import '../Admin/Assets/AdminHome.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';

const CHART_COLORS = ['#00ffe5', '#ff9500', '#007bff', '#af52de', '#28a745', '#ffc107', '#fd7e14', '#dc3545'];

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  });
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getprod();
        const productData = result?.data || result || [];
        setProducts(productData);
        // Fetch all orders for sales report
        const orderData = await getAllOrders();
        setOrders(orderData.orders || orderData);
        // Count products by category
        const categoryCount = productData.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setCategories(categoryCount);
        // Fetch and calculate review statistics
        let totalReviews = 0;
        let totalRating = 0;
        const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        for (const product of productData) {
          try {
            const reviewData = await getProductReviews(product._id);
            const reviews = reviewData.reviews || [];
            totalReviews += reviews.length;
            reviews.forEach(review => {
              totalRating += review.rating;
              ratingDist[review.rating]++;
            });
          } catch (error) {
            console.error(`Error fetching reviews for product ${product._id}:`, error);
          }
        }
        setReviewStats({
          totalReviews,
          averageRating: totalReviews > 0 ? totalRating / totalReviews : 0,
          ratingDistribution: ratingDist
        });
        // Real sales/orders data for the last 7 days
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (6 - i));
          return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        const salesOrdersByDate = {};
        orders.forEach(order => {
          const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (!salesOrdersByDate[date]) salesOrdersByDate[date] = { date, orders: 0, sales: 0 };
          salesOrdersByDate[date].orders += 1;
          salesOrdersByDate[date].sales += order.totalPrice || 0;
        });
        const salesData = last7Days.map(date => salesOrdersByDate[date] || { date, orders: 0, sales: 0 });
        setSalesData(salesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
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

  // Prepare data for charts
  const categoryChartData = Object.entries(categories).map(([name, count], i) => ({ name, count, fill: CHART_COLORS[i % CHART_COLORS.length] }));
  const reviewPieData = Object.entries(reviewStats.ratingDistribution).map(([rating, count], i) => ({ name: `${rating} Star`, value: count, fill: CHART_COLORS[i % CHART_COLORS.length] }));

  // Sales & Inventory calculations
  const totalSales = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const salesByDate = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    salesByDate[date] = (salesByDate[date] || 0) + (order.totalPrice || 0);
  });
  const salesChartData = Object.entries(salesByDate).map(([date, sales]) => ({ date, sales }));
  const inventoryByCategory = {};
  products.forEach(p => {
    const cat = p.category || 'Uncategorized';
    inventoryByCategory[cat] = (inventoryByCategory[cat] || 0) + (p.stock || p.quantity || 0);
  });
  const inventoryChartData = Object.entries(inventoryByCategory).map(([name, stock], i) => ({ name, stock, fill: CHART_COLORS[i % CHART_COLORS.length] }));
  const totalInStock = products.reduce((sum, p) => sum + (p.stock || p.quantity || 0), 0);
  const lowStockProducts = products.filter(p => (p.stock || p.quantity || 0) < 5);
  const outOfStockProducts = products.filter(p => (p.stock || p.quantity || 0) === 0);

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
          {/* Key Metrics */}
          <div className="dashboard-summary">
            <Card className="summary-card sales-card">
              <Card.Body>
                <div className="summary-icon">
                  <FaChartLine />
                </div>
                <div className="summary-content">
                  <h3>Total Products</h3>
                  <h2>{products.length}</h2>
                  <Link to="/admin/ViewProducts" className="view-link">Manage Products</Link>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="summary-card orders-card">
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

            <Card className="summary-card users-card">
              <Card.Body>
                <div className="summary-icon">
                  <FaComments />
                </div>
                <div className="summary-content">
                  <h3>Total Reviews</h3>
                  <h2>{reviewStats.totalReviews}</h2>
                  <Link to="/admin/Reviews" className="view-link">View All Reviews</Link>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-card">
              <h3>Product Categories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#00ffe5" angle={-25} textAnchor="end" interval={0} height={60} />
                  <YAxis stroke="#00ffe5" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count">
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Review Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={reviewPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {reviewPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Orders & Sales (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#00ffe5" />
                  <YAxis stroke="#00ffe5" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#23233a" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#ff9500" strokeWidth={2} />
                  <Line type="monotone" dataKey="sales" stroke="#00ffe5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/admin/AddProducts" className="action-button add-product">
                <FaBox /> Add New Product
              </Link>
              <Link to="/admin/ViewProducts" className="action-button manage-orders">
                <FaShoppingCart /> Manage Products
              </Link>
              <Link to="/admin/Reviews" className="action-button update-inventory">
                <TbTruckDelivery /> View Reviews
              </Link>
              <Link to="/admin/ViewProducts" className="action-button view-analytics">
                <FaChartLine /> View Analytics
              </Link>
            </div>
          </div>

          {/* Review Distribution */}
          <div className="review-distribution">
            <h2>Review Distribution</h2>
            <div className="rating-bars">
              {Object.entries(reviewStats.ratingDistribution).reverse().map(([rating, count]) => (
                <div key={rating} className="rating-bar-item">
                  <div className="rating-label">
                    <span className="stars">
                      {[...Array(parseInt(rating))].map((_, i) => (
                        <FaStar key={i} className="star-filled" />
                      ))}
                    </span>
                    <span className="count">({count})</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${(count / reviewStats.totalReviews) * 100}%`,
                        backgroundColor: rating === '5' ? '#28a745' : 
                                       rating === '4' ? '#17a2b8' :
                                       rating === '3' ? '#ffc107' :
                                       rating === '2' ? '#fd7e14' : '#dc3545'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
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