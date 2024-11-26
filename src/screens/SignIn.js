import React from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <h2>Welcome back</h2>
      <p>Please enter your details</p>
      <form className="signin-form">
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <div className="options">
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn">
          Sign in
        </button>

        <div className="divider">or</div>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
