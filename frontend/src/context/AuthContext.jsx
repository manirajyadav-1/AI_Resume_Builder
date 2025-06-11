import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/resume/success", {
        withCredentials: true,
      })
      .then((response) => {
        setUserEmail(response.data.email);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUserEmail(null);
        setIsAuthenticated(false);
      });
  }, []);

  const signup = async (email, password) => {
    await axios.post(
      "http://localhost:8080/api/v1/resume/auth/signup",
      { email, password },
      { withCredentials: true }
    );
    await fetchUser();
  };

  const login = async (email, password) => {
    await axios.post(
      "http://localhost:8080/api/v1/resume/auth/login",
      { email, password },
      { withCredentials: true }
    );
    await fetchUser();
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:8080/api/v1/resume/logout",
      {},
      { withCredentials: true }
    );
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/resume/success", {
        withCredentials: true,
      });
      setUserEmail(res.data.email);
      setIsAuthenticated(true);
    } catch {
      setUserEmail(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userEmail, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
