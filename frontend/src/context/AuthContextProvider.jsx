import { useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || "";
  // const AUTH_USER_BASE_URL = import.meta.env.VITE_USER_API_BASE_URL || "";

  if (!AUTH_API_BASE_URL) {
    console.error(
      "AUTH_API_BASE_URL is not defined. Please check your environment variables."
    );
  }

  const login = async (credentials) => {
    console.log("Login function called with credentials:", credentials);

    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log("Login successful:", data);
      } else {
        console.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const register = async (credentials) => {
    console.log("Register function called with credentials:", credentials);
    try {
      const response = await fetch(`${AUTH_API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration successful:", result);
      } else {
        console.error("Registration failed:", result.message || result);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
