import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const cookies = new Cookies();

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
      setLoading(false); 
    };
    initializeUser();
  }, []);

  const signup = async (name, email, password) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/auth/signup`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/resume/logout`,
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
      const token = cookies.get("token");

      let res;
      if (token) {
        res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/resume/jwt/success`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/resume/oauth2/success`,
          {
            withCredentials: true,
          }
        );
      }

      setUserDetails(res.data);
      setIsAuthenticated(true);
      await fetchResume();
    } catch (error) {
      setUserDetails(null);
      setIsAuthenticated(false);
      console.error("User fetch failed:", error.message);
    }
  };

  const saveResume = async (resumeContent, templateType) => {
    try {
      const token = cookies.get("token");

      const config = {
        method: "POST",
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/resume/save`,
        data: { ...resumeContent, templateType },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios(config);

      toast.success("Resume saved to database!");
      return response.data;
    } catch (error) {
      console.error("Resume save failed:", error.message);
      toast.error("Failed to save resume.");
      throw error;
    }
  };

  const fetchResume = async () => {
      try {
        const token = cookies.get("token");
        const config = {
          method: "GET",
          url: `${import.meta.env.VITE_REACT_APP_API_URL}/resume/data`,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios(config);
        setResumeData(response.data);
      } catch (error) {
        console.error("Error fetching resume data:", error.message);
      }
  };

  const deleteResume = async () => {
    try {
      const token = cookies.get("token");
      const config = {
        method: "DELETE",
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/resume/delete`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      await axios(config);
      toast.success("Resume deleted successfully");
      setResumeData(null); 
    } catch (error) {
      console.error("Resume delete failed:", error.message);
      toast.error("Failed to delete resume");
    }
  };


  return (
    <AuthContext.Provider
      value={{
        userDetails,
        isAuthenticated,
        signup,
        login,
        logout,
        saveResume,
        resumeData,
        loading,
        deleteResume
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
