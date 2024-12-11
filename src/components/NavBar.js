import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import { FaUser } from "react-icons/fa"; // Person icon from react-icons
import "./NavBar.css";

const NavBar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
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
                    <li><a href="/movies">Movies</a></li>
                    {/* <li><a href="reviews">Reviews</a></li> */}
                    <li><a href="/showtimes">Showtimes</a></li>
                    <li><a href="/groups">Groups</a></li>
                    {/* User Dropdown */}
                    <div className="user-dropdown">
                        <button className="user-icon" onClick={toggleDropdown} aria-label="User menu">
                            <FaUser size={20} />
                        </button>
                        {dropdownActive && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/signin">Log in</Link></li>
                                    <li><Link to="/signup">Sign up</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
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
