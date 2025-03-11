import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "@/utils/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize cartProducts from localStorage if available
  const getInitialCart = () => {
    try {
      const savedCart = localStorage.getItem("userCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  };

  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartProducts, setCartProducts] = useState(getInitialCart);
  const [userNameNav, setUserNameNav] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log("User Context: Login successful!");
        console.log("User Context: Token:" + response);
        // Store token in localStorage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Store user data
        setUser(response.data.data);
        setIsLoggedin(true);
        setIsAdmin(response.data.data.role === "admin");
        setUserNameNav(response.data.data.name); // Set user name for navbar
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
      setUserNameNav(""); // Clear user name
    }
  };

  const value = {
    user,
    setUser,
    isLoggedin,
    setIsLoggedin,
    isAdmin,
    setIsAdmin,
    userNameNav, // Add this line
    setUserNameNav, // Add this line
    cartProducts,
    setCartProducts,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
