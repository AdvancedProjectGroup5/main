import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
const AuthContext = createContext();

function getUser() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data;
    setUser(data);
    //save to local storage
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  const signUp = (email, password) => {
    api.post("/auth/register", { email, password });
    navigate("/signin");
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
