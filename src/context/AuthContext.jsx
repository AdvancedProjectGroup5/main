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
    try {
      const res = await api.post("/auth/login", { email: email, password: password });
      const data = res.data;
      const token = res.headers['authorization'].split(" ")[1];
      setUser(data);
      //save to local storage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.error ? error.response.data.error : error)
    }
  };

  const signUp = async (email, password, userName) => {
    try {
      api.post("/auth/signup", { email: email, password: password, userName: userName });
    } catch (error) {
      alert(error.response.data.error ? error.response.data.error : error);
    }
    
    navigate("/signin");
  };

  const signOut = async () => {
    try {
      const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };
      await api.post("/auth/logout", {}, header);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error ? error.response.data.error : error);
    } 
  };

  const deleteAccount = async () => {
    const userId = user.id;
    const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };
    try {
      await api.delete("/auth/delete/"  + userId, header);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      alert(error.response.data.error ? error.response.data.error : error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
