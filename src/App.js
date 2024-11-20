import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import the NavBar component
import Home from "./screens/Home"; // Import your screens
import Movies from "./screens/Movies";
import Reviews from "./screens/Reviews";
import Profile from "./screens/Profile";
import LoginSignUp from "./screens/LoginSignUp";
import Showtimes from "./screens/Showtimes";
import Groups from "./screens/Groups";
import "./App.css";

const App = () => {
  return (
    <Router>
      <NavBar /> {/* NavBar will appear on all pages */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home */}
          <Route path="/movies" element={<Movies />} /> {/* Route for Movies */}
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
