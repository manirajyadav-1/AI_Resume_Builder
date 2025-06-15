import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (name, email, password) => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/resume/auth/signup",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      toast.success("Registered Successfully!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email already exists!", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error;
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/resume/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const token = response.data.token;
      cookies.set("token", token);
      toast.success("Logged in Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      await fetchUser();
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/resume/logout",
        {},
        { withCredentials: true }
      );
      setUserDetails(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/resume/jwt/success", { 
      headers : {
        Authorization : `Bearer ${cookies.get("token")}`,
      }
    },
      {
        withCredentials: true,
      });
      console.log(res.data);
      
      setUserDetails(res.data);
      setIsAuthenticated(true);
    } catch {
      setUserDetails(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userDetails, isAuthenticated, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
