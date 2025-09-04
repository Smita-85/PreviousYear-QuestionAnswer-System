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
