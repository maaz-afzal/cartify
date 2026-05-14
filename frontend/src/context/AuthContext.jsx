import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setIsLoggedin(true);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      if (storedUser === "undefined" || storedUser === "null") {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const saveAuth = (userData, token) => {
    if (!userData || !token) return;
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
    <AuthContext.Provider value={{ isLoggedin, user, login: saveAuth, signup: saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;