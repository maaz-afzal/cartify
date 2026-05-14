import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import favoriteService from "../services/favoriteService";
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedin } = useContext(AuthContext);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await favoriteService.getFavorites();
      setFavorites(data.products || []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isLoggedin, fetchFavorites]);

  const addToFavorites = async (productId) => {
    try {
      const data = await favoriteService.addToFavorites(productId);
      setFavorites(data.favorite.products);
      return true;
    } catch (error) {
      if (error.response?.data?.message === "Product already in favorites") {
        await fetchFavorites();
      }
      return false;
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const data = await favoriteService.removeFromFavorites(productId);
      if (data?.favorite?.products) {
        setFavorites(data.favorite.products);
      } else {
        setFavorites((prev) =>
          prev.filter((item) => {
            const id = typeof item.productId === "object" ? item.productId._id : item.productId;
            return id !== productId;
          })
        );
      }
      return true;
    } catch {
      return false;
    }
  };

  const isFavorite = (productId) =>
    favorites.some((item) => {
      const id = typeof item.productId === "object" ? item.productId._id : item.productId;
      return id === productId;
    });

  return (
    <FavoriteContext.Provider value={{ favorites, fetchFavorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;