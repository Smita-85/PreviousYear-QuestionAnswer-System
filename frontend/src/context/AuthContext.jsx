/*
import React, { createContext, useState, useEffect } from "react";

// ✅ Create AuthContext
export const AuthContext = createContext();

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in user details
  const [token, setToken] = useState(null); // JWT token
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  // ✅ Login function
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
*/
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken && storedToken !== "undefined") {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // ✅ Accept full backend response object
  const login = (data) => {
    const { token, ...userData } = data;
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


