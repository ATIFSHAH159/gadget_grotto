import { useEffect, useState } from "react";
import { getproductByCategory } from "../Services/api";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaPlus, FaMinus, FaFilter, FaShoppingCart, FaBox } from "react-icons/fa";
import { useContextData } from "../Common/Context";
import "../Assets/Css/ProductPages.css";
import { Link } from "react-router-dom";

function HardDrives() {
  const [hardDriveData, setHardDriveData] = useState([]);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  const { sliderValue, handleSliderChange, addToCart } = useContextData();
  const category = "Hard Drives & SSDs";

  useEffect(() => {
    getProductDetail(category);
  }, [category]);

  const getProductDetail = async (category) => {
    try {
      const result = await getproductByCategory(category);
      setHardDriveData(result.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const filteredData = hardDriveData.filter((item) => item.price <= sliderValue);

  const toggleFilter = () => {
    setFilterCollapsed(!filterCollapsed);
  };

  return (
    <div className="product-page">
      <div className="product-header">
        <Container>
          <h1 className="product-title">Hard Drives & SSDs</h1>
          <p className="product-subtitle">Store your data with reliable and high-speed storage solutions</p>
        </Container>
      </div>
      
      <div className="product-layout">
        <button className="mobile-filter-toggle" onClick={toggleFilter}>
          <FaFilter /> {filterCollapsed ? "Show Filters" : "Hide Filters"}
        </button>
        
        {/* Filter Sidebar */}
        <div className={`product-filter ${filterCollapsed ? 'collapsed' : ''}`}>
          <h2 className="filter-title">Filters</h2>
          
          <div className="filter-section">
            <div 
              className={`filter-toggle ${showPriceFilter ? 'active' : ''}`} 
              onClick={() => setShowPriceFilter(!showPriceFilter)}
            >
              <span>Price Range</span>
              <span className="filter-toggle-icon">{showPriceFilter ? <FaMinus /> : <FaPlus />}</span>
            </div>
            
            {showPriceFilter && (
              <div className="filter-content">
                <div className="price-range-label">
                  <span>Maximum Price:</span>
                  <span className="price-current">Rs.{sliderValue}</span>
                </div>
                
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="custom-range"
                />
                
                <div className="price-limits">
                  <span>Rs.1000</span>
                  <span>Rs.50000</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="product-grid">
          <div className="product-count">
            Showing <strong>{filteredData.length}</strong> products
          </div>
          
          {filteredData.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon"><FaBox /></div>
              <h3>No Products Found</h3>
              <p>We couldn't find any storage devices matching your filter criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredData.map((item, index) => (
                <Col lg={4} md={6} sm={6} xs={12} key={index}>
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card style={{ 
                      width: '100%', 
                      height: '100%', 
                      backgroundColor: '#151518',
                      border: '1px solid rgba(0, 255, 229, 0.15)',
                      borderRadius: '12px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}>
                      <Card.Img 
                        variant="top" 
                        src={`http://localhost:5000/${item.pic}`}
                        style={{ 
                          height: "280px", 
                          objectFit: "contain",
                          backgroundColor: "#ffffff",
                          borderRadius: '12px 12px 0 0'
                        }}
                      />
                      <Card.Body style={{ backgroundColor: '#151518' }}>
                        <Card.Title style={{ 
                          color: '#00FFE5', 
                          fontFamily: 'Orbitron, sans-serif',
                          fontWeight: '600'
                        }}>{item.name}</Card.Title>
                        <Card.Text style={{ color: '#B0B0B8' }}>
                          {item.discription}
                        </Card.Text>
                        <Card.Text style={{ 
                          color: '#00FFE5', 
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          Price: Rs.{item.price}
                        </Card.Text>
                        <Button 
                          variant="primary" 
                          style={{
                            background: 'linear-gradient(135deg, #00FFE5 0%, #7B5CFF 100%)',
                            border: 'none',
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: '600'
                          }}
                          onClick={() => addToCart(item)}
                        >
                          <FaShoppingCart /> Add to Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default HardDrives;
