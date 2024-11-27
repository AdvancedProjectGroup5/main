import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About CineCraic</h3>
                    <p>Your ultimate destination for movies, reviews, and more!</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="movies">Movies</a></li>
                        <li><a href="reviews">Reviews</a></li>
                        <li><a href="profile">Profile</a></li>
                        <li><a href="showtimes">Showtimes</a></li>
                        <li><a href="groups">Groups</a></li>
                        <li><a href="login">Log in/Sign up</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon">FB</a>
                        <a href="#" className="social-icon">IG</a>
                        <a href="#" className="social-icon">TW</a>
                        <a href="#" className="social-icon">YT</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 CineCraic. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
