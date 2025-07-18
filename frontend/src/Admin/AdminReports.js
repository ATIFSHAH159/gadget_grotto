import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { getprod, getAllOrders } from "../Services/api";
import '../Admin/Assets/AdminHome.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const CHART_COLORS = ['#00ffe5', '#ff9500', '#007bff', '#af52de', '#28a745', '#ffc107', '#fd7e14', '#dc3545'];

function AdminReports() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getprod();
        const productData = result?.data || result || [];
        setProducts(productData);
        const orderData = await getAllOrders();
        setOrders(orderData.orders || orderData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  // Profit calculations
  let totalProfit = 0;
  const profitByProduct = {};
  const profitByCategory = {};
  orders.forEach(order => {
    (order.orderItems || []).forEach(item => {
      // Use costPrice and sellingPrice if available, otherwise fallback to price
      const cost = item.costPrice !== undefined ? item.costPrice : 0;
      const sell = item.sellingPrice !== undefined ? item.sellingPrice : (item.price || 0);
      const profit = (sell - cost) * (item.quantity || 0);
      totalProfit += profit;
      if (!profitByProduct[item.name]) profitByProduct[item.name] = 0;
      profitByProduct[item.name] += profit;
      if (!profitByCategory[item.category]) profitByCategory[item.category] = 0;
      profitByCategory[item.category] += profit;
    });
  });
  // Normalize category names for stock by category
  function normalizeCategory(cat) {
    return (cat || 'Uncategorized').toLowerCase().replace(/[_\s]+/g, ' ').trim();
  }
  function displayCategoryName(normCat) {
    // Capitalize each word
    return normCat.replace(/\b\w/g, c => c.toUpperCase());
  }
  const normalizedCategoryMap = {};
  products.forEach(p => {
    const normCat = normalizeCategory(p.category);
    if (!normalizedCategoryMap[normCat]) {
      normalizedCategoryMap[normCat] = { name: displayCategoryName(normCat), stock: 0 };
    }
    normalizedCategoryMap[normCat].stock += p.stock || 0;
  });
  const stockByCategory = Object.values(normalizedCategoryMap);

  // Stock by product with category filter
  const [selectedCategory, setSelectedCategory] = useState('All');
  const allCategories = Array.from(new Set(products.map(p => p.category || 'Uncategorized')));
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);
  const stockByProduct = {};
  filteredProducts.forEach(p => {
    stockByProduct[p.name] = p.stock || 0;
  });

  return (
    <div className="admin-dashboard">
      <div className="reports-section">
        <h2>Sales & Inventory Reports</h2>
        <div className="reports-summary">
          <div className="report-card">
            <div className="report-title">Total Sales</div>
            <div className="report-value">Rs.{totalSales.toLocaleString()}</div>
          </div>
          <div className="report-card">
            <div className="report-title">Total Orders</div>
            <div className="report-value">{totalOrders}</div>
          </div>
          <div className="report-card">
            <div className="report-title">Total In Stock</div>
            <div className="report-value">{totalInStock}</div>
          </div>
          <div className="report-card">
            <div className="report-title">Total Profit</div>
            <div className="report-value">Rs.{totalProfit.toLocaleString()}</div>
          </div>
        </div>
        <div className="reports-tables" style={{marginBottom: 24}}>
          <div style={{marginBottom: 18}}>
            <h4 style={{color:'#00ffe5', marginBottom:8}}>Stock by Category</h4>
            <table style={{width:'100%', color:'#fff', background:'#23233a', borderRadius:8, overflow:'hidden', marginBottom:18}}>
              <thead>
                <tr style={{color:'#00ffe5', background:'#18181a'}}>
                  <th style={{padding:8}}>Category</th>
                  <th style={{padding:8}}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockByCategory.map(({ name, stock }) => (
                  <tr key={name}>
                    <td style={{padding:8}}>{name}</td>
                    <td style={{padding:8}}>{stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginBottom: 18}}>
            <h4 style={{color:'#00ffe5', marginBottom:8}}>Stock by Product</h4>
            <div style={{marginBottom: 10}}>
              <label style={{color:'#fff', marginRight:8}}>Filter by Category:</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="All">All</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <table style={{width:'100%', color:'#fff', background:'#23233a', borderRadius:8, overflow:'hidden', marginBottom:18}}>
              <thead>
                <tr style={{color:'#00ffe5', background:'#18181a'}}>
                  <th style={{padding:8}}>Product</th>
                  <th style={{padding:8}}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stockByProduct).map(([name, stock]) => (
                  <tr key={name}>
                    <td style={{padding:8}}>{name}</td>
                    <td style={{padding:8}}>{stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginBottom: 18}}>
            <h4 style={{color:'#00ffe5', marginBottom:8}}>Profit by Product</h4>
            <table style={{width:'100%', color:'#fff', background:'#23233a', borderRadius:8, overflow:'hidden'}}>
              <thead>
                <tr style={{color:'#00ffe5', background:'#18181a'}}>
                  <th style={{padding:8}}>Product</th>
                  <th style={{padding:8}}>Profit (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(profitByProduct).map(([name, profit]) => (
                  <tr key={name}>
                    <td style={{padding:8}}>{name}</td>
                    <td style={{padding:8}}>{profit.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="reports-charts">
          <div className="chart-card">
            <h3>Sales Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#00ffe5" />
                <YAxis stroke="#00ffe5" />
                <CartesianGrid strokeDasharray="3 3" stroke="#23233a" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#00ffe5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <h3>Inventory by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={inventoryChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#00ffe5" angle={-25} textAnchor="end" interval={0} height={60} />
                <YAxis stroke="#00ffe5" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="stock">
                  {inventoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-container">
          <Spinner animation="border" variant="info" />
          <p>Loading reports...</p>
        </div>
      )}
    </div>
  );
}

export default AdminReports; 