import { useEffect, useState } from "react";
import axios from "axios";
import "./Reviews.css";

export default function Reviews() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    fetchReviews();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setItemsPerPage(1);
    } else if (window.innerWidth <= 900) {
      setItemsPerPage(2);
    } else if (window.innerWidth <= 1200) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reviews`, {
        params: { domainName: DOMAIN_NAME }
      });

      let reviewsData = [];

      if (Array.isArray(response.data)) {
        reviewsData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        reviewsData = response.data.data;
      } else if (response.data?.reviews) {
        reviewsData = response.data.reviews;
      }

      setReviews(reviewsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= reviews.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, reviews.length - itemsPerPage) : prev - 1
    );
  };

  const getVisibleReviews = () => {
    return reviews.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const toggleExpand = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #2e7d32, #66bb6a)',
      'linear-gradient(135deg, #1b5e20, #4caf50)',
      'linear-gradient(135deg, #0d47a1, #42a5f5)',
      'linear-gradient(135deg, #880e4f, #ec407a)',
      'linear-gradient(135deg, #bf360c, #ff7043)',
      'linear-gradient(135deg, #4a148c, #ab47bc)',
      'linear-gradient(135deg, #004d40, #26a69a)',
      'linear-gradient(135deg, #b71c1c, #ef5350)',
      'linear-gradient(135deg, #f57f17, #ffca28)',
      'linear-gradient(135deg, #1a237e, #5c6bc0)',
    ];
    
    if (!name) return colors[0];
    
    const firstLetter = name.charAt(0).toUpperCase();
    const charCode = firstLetter.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    
    return colors[colorIndex];
  };

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="reviews-loading">Loading Reviews...</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  const visibleReviews = getVisibleReviews();

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        {/* Header */}
        <div className="reviews-header">
          <h2 className="reviews-title">What Our Clients Say</h2>
          <p className="reviews-subtitle">
            Trusted by industries worldwide for quality and reliability
          </p>
        </div>

        {/* Carousel Wrapper with Arrows and Grid */}
        <div className="reviews-carousel-wrapper">
          {/* Navigation Arrow - Left */}
          {reviews.length > itemsPerPage && (
            <button
              className="review-arrow prev"
              onClick={prevSlide}
              aria-label="Previous reviews"
            >
              ‹
            </button>
          )}

          {/* Reviews Grid - Single Row */}
          <div className="reviews-grid">
            {visibleReviews.map((review, index) => {
              // Handle multiple possible field names for review text
              const reviewText = review.feedback || review.reviewText || review.comment || review.review || review.message || '';
              // Handle location
              const location = review.location || review.city || review.country || review.place || '';
              // Handle date
              const reviewDate = review.date || review.createdAt || review.reviewDate || '';
              // Format date if it exists
              const formattedDate = reviewDate ? new Date(reviewDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }) : '';
              
              const reviewId = review._id || `${currentIndex}-${index}`;
              const isExpanded = expandedReviews[reviewId] || false;
              // Truncate text if not expanded
              const displayText = reviewText.length > 100 && !isExpanded 
                ? reviewText.substring(0, 100) + '...' 
                : reviewText;
              const clientName = review.clientName || review.name || 'Valued Client';
              const avatarColor = getAvatarColor(clientName);

              return (
                <div
                  key={reviewId}
                  className="review-card"
                >
                  {/* Client Info - Top Section */}
                  <div className="review-client-top">
                    <div className="client-avatar" style={{ background: avatarColor }}>
                      {clientName.charAt(0).toUpperCase()}
                    </div>
                    <div className="client-info">
                      <h4 className="client-name">
                        {clientName}
                      </h4>
                      {location && (
                        <p className="client-location">{location}</p>
                      )}
                      {formattedDate && (
                        <p className="client-date">{formattedDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="review-rating">
                    {getRatingStars(review.rating || 5)}
                  </div>

                  {/* Review Text with View More/Less */}
                  {reviewText && (
                    <div className="review-text-wrapper">
                      <p className="review-text">
                        "{displayText}"
                      </p>
                      {reviewText.length > 100 && (
                        <button 
                          className="view-toggle-btn"
                          onClick={() => toggleExpand(reviewId)}
                        >
                          {isExpanded ? 'View Less' : 'View More'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow - Right */}
          {reviews.length > itemsPerPage && (
            <button
              className="review-arrow next"
              onClick={nextSlide}
              aria-label="Next reviews"
            >
              ›
            </button>
          )}
        </div>

        {/* Navigation Dots */}
        {reviews.length > itemsPerPage && (
          <div className="reviews-dots">
            {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === Math.floor(currentIndex / itemsPerPage) ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
