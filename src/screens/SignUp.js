import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Get Started</h2>
      <p>Create your account to get access</p>
      <form className="signup-form">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Enter your full name" required />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Create a password" required />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          required
        />

        <div className="options">
          <label>
            <input type="checkbox" required /> I agree to the{" "}
            <a href="#" className="terms-link">
              Terms & Conditions
            </a>
          </label>
        </div>

        <button type="submit" className="btn">
          Sign Up
        </button>

        <div className="divider">or</div>

        <p className="signin-text">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
