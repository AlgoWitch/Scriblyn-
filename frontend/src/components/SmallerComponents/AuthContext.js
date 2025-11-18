// src/components/SmallerComponents/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check login status on page load
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  // Logout logic
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, setCurrentUser, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
