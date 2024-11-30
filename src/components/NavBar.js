import React, { useState } from "react";
import "./NavBar.css";

const NavBar = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>CineCraic</span>
            </div>
            <button className="hamburger" aria-label="Toggle navigation" onClick={toggleMenu}>
                &#9776;
            </button>
            <div className={`menu ${menuActive ? "active" : ""}`}>
                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="movies">Movies</a></li>
                    <li><a href="reviews">Reviews</a></li>
                    <li><a href="showtimes">Showtimes</a></li>
                    <li><a href="groups">Groups</a></li>
                    <li><a href="profile">Profile</a></li>
                    <li><a href="signin">Log in</a></li>
                    <li><a href="signup">Sign up</a></li>
                </ul>
                <div className="navbar-search">
                    <input type="text" placeholder="Search in site" />
                    <button>
                        <span role="img" aria-label="search">&#128269;</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
