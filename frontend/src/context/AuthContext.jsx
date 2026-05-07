import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedin(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
