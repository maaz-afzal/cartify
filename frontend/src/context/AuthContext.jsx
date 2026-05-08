import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (
      token &&
      storedUser &&
      storedUser !== "undefined" &&
      storedUser !== "null"
    ) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedin(true);
        setUser(parsedUser);
      } catch (error) {
        console.log("Error parsing user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedin(false);
        setUser(null);
      }
    } else {
      if (storedUser === "undefined" || storedUser === "null") {
        localStorage.removeItem("user");
      }
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) {
      console.log("Invalid login data");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedin(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
