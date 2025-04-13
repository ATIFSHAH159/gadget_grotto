import { useEffect, useState } from "react";
import { searchProducts } from "../Services/api";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { FaShoppingCart, FaBox } from "react-icons/fa";
import { useContextData } from "../Common/Context";
import "../Assets/Css/ProductPages.css";

function SearchResults() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, addToCart } = useContextData();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          setIsLoading(true);
          const results = await searchProducts(searchQuery);
          setFilteredProducts(results);
        } catch (error) {
          console.error("Error searching products:", error);
          setFilteredProducts([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredProducts([]);
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="product-page">
        <div className="product-header">
          <Container>
            <h1 className="product-title">Search Results</h1>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <Spinner animation="border" variant="info" />
            </div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <Container>
          <h1 className="product-title">Search Results</h1>
          <p className="product-subtitle">
            {searchQuery ? `Showing results for: "${searchQuery}"` : "Enter a search term to find products"}
          </p>
        </Container>
      </div>
      
      <div className="product-layout">
        <div className="product-grid">
          <div className="product-count">
            Showing <strong>{filteredProducts.length}</strong> products
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon"><FaBox /></div>
              <h3>No Products Found</h3>
              <p>We couldn't find any products matching your search. Try adjusting your search terms.</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map((item, index) => (
                <Col lg={4} md={6} sm={6} xs={12} key={index}>
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
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults; 