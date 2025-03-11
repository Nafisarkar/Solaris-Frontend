import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "@/utils/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/api/user/me");
        if (response.data.success) {
          setUser(response.data.data);
          setIsLoggedin(true);
          setIsAdmin(response.data.data.role === "admin");
        }
      } catch (error) {
        console.log("Not logged in");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Store token in localStorage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Store user data
        setUser(response.data.data);
        setIsLoggedin(true);
        setIsAdmin(response.data.data.role === "admin");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/user/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state even if API call fails
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedin(false);
      setIsAdmin(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedin,
    setIsLoggedin,
    isAdmin,
    setIsAdmin,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
