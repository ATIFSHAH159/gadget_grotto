import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Card, Row, Col, Badge } from 'react-bootstrap';
import { FaTrash, FaStar, FaEye, FaChartLine, FaFilter } from 'react-icons/fa';
import { getProductReviews, deleteReview } from '../Services/api';
import '../Admin/Assets/Css/Admin.css';

const NEON_BG = { backgroundColor: '#1c1c1e', color: '#fff', border: 'none', boxShadow: '0 4px 20px rgba(0,255,229,0.10)' };
const NEON_ACCENT = { color: '#18181a' };
const NEON_BADGE = { background: 'linear-gradient(90deg, #00ffe5 0%, #007bff 100%)', color: '#18181a', fontWeight: 700 };
const NEON_BTN = { borderColor: '#00ffe5', color: '#00ffe5', background: 'transparent', fontWeight: 600 };

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    topRatedProduct: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/Admin/ViewProducts');
      const data = await response.json();
      setProducts(data);
      
      // Calculate statistics
      const totalReviews = data.reduce((sum, product) => sum + (product.reviewCount || 0), 0);
      const totalRating = data.reduce((sum, product) => sum + (product.rating * (product.reviewCount || 0)), 0);
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
      const topRatedProduct = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];

      setStats({
        totalReviews,
        averageRating,
        topRatedProduct
      });
    } catch (error) {
      setError('Error fetching products');
    }
  };

  const fetchReviews = async (productId) => {
    try {
      setLoading(true);
      const response = await getProductReviews(productId);
      setReviews(response.reviews);
      setSelectedProduct(productId);
      setShowModal(true);
    } catch (error) {
      setError('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter(review => review._id !== reviewId));
        fetchProducts(); // Refresh products to update stats
      } catch (error) {
        alert('Error deleting review');
      }
    }
  };

  if (error) return <div className="error-message" style={{ color: '#ff3b30', background: '#18181a', padding: 16, borderRadius: 12 }}>{error}</div>;

  return (
    <Container fluid className="admin-container py-4" style={{ background: '#18181a', minHeight: '100vh' }}>
      <h2 className="admin-title mb-4" style={{ color: '#fff', textShadow: '0 0 10px #00ffe5' }}>Review Management Dashboard</h2>
      
      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="stats-card h-100" style={NEON_BG}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" style={{ color: '#fff' }}>Total Reviews</h6>
                  <h3 className="mb-0" style={{ color: '#fff' }}>{stats.totalReviews}</h3>
                </div>
                <div className="stats-icon" style={{ background: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaChartLine size={24} style={{ color: '#00ffe5' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stats-card h-100" style={NEON_BG}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" style={{ color: '#fff' }}>Average Rating</h6>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0 me-2" style={{ color: '#fff' }}>{stats.averageRating.toFixed(1)}</h3>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.round(stats.averageRating) ? "star-filled" : "star-empty"}
                          style={{ color: i < Math.round(stats.averageRating) ? "#ffc107" : "#e4e5e9" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="stats-icon" style={{ background: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaStar size={24} style={{ color: '#00ffe5' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stats-card h-100" style={NEON_BG}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2" style={{ color: '#fff' }}>Top Rated Product</h6>
                  <h3 className="mb-0 text-truncate" style={{ maxWidth: '200px', color: '#fff' }}>
                    {stats.topRatedProduct?.name || 'N/A'}
                  </h3>
                  <small className="text-muted" style={{ color: 'inherit' }}>
                    <span className="rating-label-black">Rating:</span>{' '}
                    <span className="rating-value-white">{stats.topRatedProduct?.rating?.toFixed(1) || '0.0'}</span>
                  </small>
                </div>
                <div className="stats-icon" style={{ background: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaFilter size={24} style={{ color: '#00ffe5' }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Products Table */}
      <Card className="mb-4" style={NEON_BG}>
        <Card.Header className="bg-white" style={{ background: '#23233a', color: '#18181a', border: 'none' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0" style={{ color: '#18181a' }}>Product Reviews</h5>
            <Badge style={NEON_BADGE} className="px-3 py-2">
              {products.length} Products
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0" style={{ background: '#18181a', color: '#fff' }}>
            <thead className="bg-light" style={{ background: '#23233a', color: '#18181a' }}>
              <tr>
                <th>Product Name</th>
                <th>Total Reviews</th>
                <th>Average Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #23233a' }}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td>
                    <Badge style={product.reviewCount > 0 ? { ...NEON_BADGE, background: 'linear-gradient(90deg, #32d74b 0%, #00ffe5 100%)' } : NEON_BADGE} className="px-3 py-2">
                      {product.reviewCount || 0} Reviews
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="stars me-2">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={index < Math.round(product.rating || 0) ? "star-filled" : "star-empty"}
                            style={{ color: index < Math.round(product.rating || 0) ? "#ffc107" : "#e4e5e9" }}
                          />
                        ))}
                      </div>
                      <span className="rating-text" style={{ color: '#18181a' }}>
                        {product.rating ? product.rating.toFixed(1) : "0.0"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      style={NEON_BTN}
                      onClick={() => fetchReviews(product._id)}
                    >
                      <FaEye className="me-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Reviews Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered contentClassName="neon-modal">
        <Modal.Header closeButton className="bg-light" style={{ background: '#23233a', color: '#18181a', border: 'none' }}>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <FaStar className="text-warning me-2" />
              <span style={{ color: '#18181a' }}>Product Reviews</span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#18181a', color: '#fff' }}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2" style={{ color: '#18181a' }}>Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review) => (
                <Card key={review._id} className="mb-3 review-card" style={NEON_BG}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="stars me-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? "star-filled" : "star-empty"}
                                style={{ color: i < review.rating ? "#ffc107" : "#e4e5e9" }}
                              />
                            ))}
                          </div>
                          <span className="review-author fw-bold" style={{ color: '#18181a' }}>{review.userName}</span>
                          <Badge style={NEON_BADGE} className="ms-2">
                            {new Date(review.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="review-text mb-0" style={{ color: '#fff' }}>{review.review}</p>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ borderColor: '#ff3b30', color: '#ff3b30', background: 'transparent' }}
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <FaStar className="text-muted mb-3" size={48} />
              <h5 style={{ color: '#18181a' }}>No reviews found for this product</h5>
              <p className="text-muted">Be the first to review this product!</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Reviews;