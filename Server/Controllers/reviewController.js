import Review from '../models/Review.js';
import Productstructuremodel from '../models/ProductsCollection.js';

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;

    const newReview = new Review({
      productId,
      userId,
      userName,
      rating,
      review
    });

    await newReview.save();

    // Update product's average rating
    const productReviews = await Review.find({ productId });
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / productReviews.length;

    await Productstructuremodel.findByIdAndUpdate(productId, {
      rating: averageRating,
      reviewCount: productReviews.length
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId })
      .sort({ date: -1 }); // Sort by date, newest first

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the review author or admin
    if (review.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    // Update product's average rating
    const productReviews = await Review.find({ productId: review.productId });
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;

    await Productstructuremodel.findByIdAndUpdate(review.productId, {
      rating: averageRating,
      reviewCount: productReviews.length
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
}; 