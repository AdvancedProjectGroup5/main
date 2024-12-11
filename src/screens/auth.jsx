import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

const Auth = ({ isSignIn = true }) => {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      signIn(email, password);
    } else {
      signUp(email, password, userName);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>{isSignIn ? "Log in" : "Sign Up"}</h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignIn ? "Login in" : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Auth;
