import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import the NavBar component
import Home from "./screens/Home"; // Import your screens
import Movies from "./screens/Movies";
import Reviews from "./screens/Reviews";
import Profile from "./screens/Profile";
//import LoginSignUp from "./screens/LoginSignUp";
import Showtimes from "./screens/Showtimes";
import SignIn from "./screens/signin.jsx";
import SignUp from "./screens/signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Groups from "./screens/Groups";
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
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* <Route path="/login" element={<LoginSignUp />} /> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </div>
        <Footer /> {/* Footer will appear on all pages */}
      </AuthProvider>
    </Router>
  );
};

export default App;