import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/login";
      localStorage.removeItem("authToken");
      alert(
        "Session expired or you do not have permission. Please log in again."
      );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
