import React, { createContext, useContext, useEffect, useState } from "react";
import favoriteService from "../services/favoriteService";
import { AuthContext } from "./AuthContext";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedin } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedin) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isLoggedin]);

  const fetchFavorites = async () => {
    try {
      const data = await favoriteService.getFavorites();
      setFavorites(data.products || []);
    } catch (error) {
      console.error("Error while fetching favorites:", error);
      setFavorites([]);
    }
  };

  const addToFavorites = async (productId) => {
    try {
      const data = await favoriteService.addToFavorites(productId);
      setFavorites(data.favorite.products);
      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);

      if (error.response?.data?.message === "Product already in favorites") {
        await fetchFavorites();
        return false;
      }
      return false;
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const data = await favoriteService.removeFromFavorites(productId);

      // AGAR BACKEND POPULATED DATA BHEJ RAHA HAI (Step 1 ke baad):
      if (data && data.favorite && data.favorite.products) {
        setFavorites(data.favorite.products);
      } else {
        // FALLBACK: Agar backend sirf message bheje, toh frontend se manually remove karein
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => {
            // Handle both object ID and string ID cases
            const itemId = item.productId._id
              ? item.productId._id
              : item.productId;
            return itemId !== productId;
          }),
        );
      }
      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => {
      const idToCompare =
        typeof item.productId === "object"
          ? item.productId._id
          : item.productId;
      return idToCompare === productId;
    });
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
