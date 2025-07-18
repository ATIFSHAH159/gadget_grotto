import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getprod, addReview, getProductReviews } from "../Services/api";
import { Container, Card, Button,Form } from "react-bootstrap";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useContextData } from "../Common/Context";
import "../Assets/Css/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContextData();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        const products = await getprod();
        const foundProduct = products.find((p) => p._id === id);
        setProduct(foundProduct);

        const reviewsData = await getProductReviews(id);
        setReviews(reviewsData.reviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const reviewData = {
        productId: id,
        rating,
        review
      };

      const response = await addReview(reviewData);
      setReviews([response.review, ...reviews]);
      setReview("");
      setRating(0);

      // Refresh product data to get updated rating
      const products = await getprod();
      const updatedProduct = products.find((p) => p._id === id);
      setProduct(updatedProduct);
    } catch (error) {
      alert(error.message || 'Error submitting review');
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );

  if (!product) return (
    <div className="error-container">
      <p>Product not found</p>
    </div>
  );

  return (
    <Container className="product-detail-container" fluid>
      <div className="product-detail-row">
        {/* Product Image Section */}
        <div className="product-image-section">
          <div className="product-image-container">
            <img
              src={`http://localhost:5000/${product.pic}`}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
        </div>
        {/* Product Info Section */}
        <div className="product-info-section">
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">Rs. {product.price}</div>
            <div className="product-stock">Stock: {product.stock}</div>
            <p className="product-description">{product.discription}</p>
            {/* Rating Display */}
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < (product.rating || 0) ? "star-filled" : "star-empty"}
                  />
                ))}
              </div>
              <span className="rating-count">(Based on {product.reviewCount || 0} reviews)</span>
            </div>
            {/* Add to Cart Button */}
            <Button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      {/* Reviews Section - moved below the main row */}
      <div className="product-reviews-section">
        <Card className="reviews-card">
          <Card.Header className="reviews-header">
            <h3>Customer Reviews</h3>
          </Card.Header>
          <Card.Body>
            {/* Review Form */}
            <Form onSubmit={handleReviewSubmit} className="review-form mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Your Rating</Form.Label>
                <div className="rating-input">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={25}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  required
                />
              </Form.Group>
              <Button 
                type="submit" 
                className="submit-review-btn"
                disabled={!rating || !review.trim()}
              >
                {user ? 'Submit Review' : 'Login to Submit Review'}
              </Button>
            </Form>
            {/* Existing Reviews */}
            <div className="existing-reviews">
              <h4>Recent Reviews</h4>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <div className="review-header">
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? "star-filled" : "star-empty"}
                          />
                        ))}
                      </div>
                      <div className="review-meta">
                        <span className="review-author">{review.userName}</span>
                        <br/>
                        <span className="review-date">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="review-text">{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ProductDetail;
