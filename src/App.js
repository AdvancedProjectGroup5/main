import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import the NavBar component
import Home from "./screens/Home"; // Import your screens
import Movies from "./screens/Movies";
import IndividualMovie from "./screens/IndividualMovie.js";
import Reviews from "./screens/Reviews";
import Profile from "./screens/Profile";
import Showtimes from "./screens/Showtimes";
import Auth from "./screens/auth.jsx"; // Import the merged Auth component
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GroupPage from "./screens/GroupPage.js";
import Footer from "./components/Footer.js"; // Import the Footer component
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar /> {/* NavBar will appear on all pages */}
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route for Home */}
            <Route path="/movies" element={<Movies />} /> {/* Route for Movies */}
            <Route path="/movies/:movieId" element={<IndividualMovie />} />
            <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/signin" element={<Auth isSignIn={true} />} /> {/* Sign In Route */}
            <Route path="/signup" element={<Auth isSignIn={false} />} /> {/* Sign Up Route */}
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/groups" element={<GroupPage />} />
          </Routes>
        </div>
        <Footer /> {/* Footer will appear on all pages */}
      </AuthProvider>
    </Router>
  );
};

export default App;
