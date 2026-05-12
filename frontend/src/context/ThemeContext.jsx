import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (savedTheme === "dark") {
      setTheme("dark");
      root.classList.add("dark");
    } else if (savedTheme === "light") {
      setTheme("light");
      root.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "light");
      root.classList.remove("dark");
    }
  }, []);

  // toggle theme function
  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      root.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      root.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
