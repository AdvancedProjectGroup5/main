import React from "react";
import "./Home.css"; // Import the CSS file for styling
import videoBg from "../assets/heroVideo.mp4"; // Adjust the path to your video file

const featuredMovies = [
    { id: 1, category: "Action", title: "Action Movie 1", duration: "2h 30m", posterText: "Action-packed poster" },
    { id: 2, category: "Romance", title: "Romance Film", duration: "1h 45m", posterText: "Romantic poster" },
    { id: 3, category: "Sci-Fi", title: "Sci-fi Adventure", duration: "2h 10m", posterText: "Sci-fi poster" },
    { id: 4, category: "Comedy", title: "Laugh Out Loud", duration: "1h 50m", posterText: "Comedy poster" },
    { id: 5, category: "Drama", title: "Emotional Journey", duration: "2h 15m", posterText: "Drama poster" },
];

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero">
                {/* Background Video */}
                <video className="hero-video" src={videoBg} autoPlay loop muted playsInline />

                {/* Content Overlay */}
                <div className="hero-content">
                    <h1>Welcome to CineCraic</h1>
                    <p>Your ultimate destination for all things movies.</p>
                    <div className="hero-buttons">
                        <a href="/movies" className="btn explore">Explore Movies</a>
                        <a href="/groups" className="btn reviews">Join Groups</a>
                    </div>
                </div>
            </div>

            {/* Featured Movies Section */}
            <div className="featured-movies">
                <h2>Featured Movies</h2>
                <div className="movie-grid">
                    {featuredMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <div className="category-badge">{movie.category}</div>
                            <div className="movie-poster">{movie.posterText}</div>
                            <div className="movie-details">
                                <h3>{movie.title}</h3>
                                <p>{movie.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trending Content Section */}
            <section className="trending-content">
                <h2>Trending Content</h2>
                <div className="trending-grid">
                    <div className="trending-card">
                        <h3>Behind the Scenes</h3>
                        <p>Explore the making of your favorite films</p>
                        <span className="trending-badge">Film Insider</span>
                    </div>
                    <div className="trending-card">
                        <h3>Top Picks of the Week</h3>
                        <p>Check out the must-watch movies of the week</p>
                        <span className="trending-badge">Critic's Choice</span>
                    </div>
                    <div className="trending-card">
                        <h3>Introducing New Releases</h3>
                        <p>Discover the latest movies hitting the big screen</p>
                        <span className="trending-badge">Movie Buff</span>
                    </div>
                </div>
            </section>

            {/* Must-Read Reviews Section */}
            <section className="must-read-reviews">
                <h2>Must-Read Reviews</h2>
                <div className="reviews-grid">
                    <div className="review-card">
                        <h3>Movie Critic X</h3>
                        <h4>Film 1</h4>
                        <p className="stars">★★★★★</p>
                        <p>A riveting masterpiece that leaves you on the edge of your seat</p>
                    </div>
                    <div className="review-card">
                        <h3>Film Buff Y</h3>
                        <h4>Film 2</h4>
                        <p className="stars">★★★★★</p>
                        <p>An emotional rollercoaster that tugs at the heartstrings</p>
                    </div>
                    <div className="review-card">
                        <h3>Cinema Lover Z</h3>
                        <h4>Film 3</h4>
                        <p className="stars">★★★★★</p>
                        <p>A visual spectacle that immerses you in its world</p>
                    </div>
                </div>
            </section>

            {/* Recently Viewed Section */}
            <section className="recently-viewed">
                <h2>Recently Viewed</h2>
                <div className="recently-viewed-grid">
                    <div className="recently-viewed-card">
                        <h3>Action Movie 2</h3>
                        <p>Sequel to the hit action film</p>
                    </div>
                    <div className="recently-viewed-card">
                        <h3>Movie Night Essentials</h3>
                        <p>Get your popcorn ready</p>
                    </div>
                    <div className="recently-viewed-card">
                        <h3>Classic Cinema Collection</h3>
                        <p>Timeless films for every movie buff</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
