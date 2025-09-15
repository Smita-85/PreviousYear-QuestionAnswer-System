// src/context/FavouritesContext.jsx
import { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const toggleFavourite = (question) => {
    const isFav = favourites.some((q) => q.id === question.id);
    let updated;
    if (isFav) {
      updated = favourites.filter((q) => q.id !== question.id);
    } else {
      updated = [...favourites, question];
    }
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
