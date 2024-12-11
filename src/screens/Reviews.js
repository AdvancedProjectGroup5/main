import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import api from '../utils/api';
import './Reviews.css';

const Reviews = () => {
    // const [recentReviews, setRecentReviews] = useState([
    //     { id: 1, user: "User1", text: "Amazing movie, a must-watch!", rating: 5 },
    //     { id: 2, user: "User2", text: "Disappointing plot twists.", rating: 3 },
    //     { id: 3, user: "User3", text: "Great cinematography and soundtrack.", rating: 4.5 },
    // ]);

    const navigate = useNavigate()
    const location = useLocation();
    const movieDetails = location.state;
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        movieTitle: movieDetails.title,
        movieId: movieDetails.id,
        userName: user.userName,
        userId: user.id,
        rating: 0,
        comments: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newReview = {
                //id: recentReviews.length + 1,
                userId: formData.userId,
                movieId: formData.movieId,
                comment: formData.comments,
                rating: formData.rating,
            };
            const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };
            api.post('/reviews', newReview, header);
            //setRecentReviews([newReview, ...recentReviews]);
            setFormData({ movieTitle: '',movieId: 0,  userName: '', userId: 0, rating: 0, comments: '' });
            navigate('/movies/' + movieDetails.id);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="reviews-page">
            {/* Welcome Section */}
            {/* <div className="welcome-section">
                <div className="welcome-text">
                    <h1>Welcome to Movie Reviews</h1>
                    <p>Browse, review, and share your thoughts on the latest movies.</p>
                </div>
                <div className="welcome-image"></div>
            </div> */}

            {/* Recent Reviews Section */}
            {/* <div className="recent-reviews-container">
                <div className="header">
                    <h2>Recent Reviews</h2>
                    <p>See what others are saying about the movies they've watched.</p>
                </div>
                <div className="reviews">
                    {recentReviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="user-icon"></div>
                                <span className="user-name">{review.user}</span>
                                <div className="rating">
                                    {'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}
                                </div>
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Add Your Review Section */}
            <div className="add-review-section">
                <h2>Add Your Review</h2>
                <p>Share your review with the community.</p>
                <form className="review-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Movie Title</label>
                        <input
                            type="text"
                            name="movieTitle"
                            value={movieDetails.title}
                            readOnly
                            // placeholder="Enter movie title"
                            // value={formData.movieTitle}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={user.userName}
                            readOnly
                            // placeholder="Enter your name"
                            // value={formData.userName}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="rating-options">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`rating-star ${formData.rating >= star ? 'selected' : ''}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    {'★'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea
                            name="comments"
                            placeholder="Share your thoughts"
                            value={formData.comments}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Reviews;
