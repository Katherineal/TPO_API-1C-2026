import { createContext, useContext, useState } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {

  const [favoriteItems, setFavoriteItems] =
    useState([]);

  const addToFavorite = (producto) => {

    const existe =
      favoriteItems.find(
        item => item.id === producto.id
      );

    if (existe) {

      setFavoriteItems(
        favoriteItems.filter(
          item => item.id !== producto.id
        )
      );

    } else {

      setFavoriteItems([
        ...favoriteItems,
        producto
      ]);
    }
  };

  const isFavorite = (productoId) => {

    return favoriteItems.some(
      item => item.id === productoId
    );
  };

  const removeFromFavorite = (productoId) => {

    setFavoriteItems(
      favoriteItems.filter(
        item => item.id !== productoId
      )
    );
  };

  return (

    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addToFavorite,
        isFavorite,
        removeFromFavorite
      }}
    >

      {children}

    </FavoriteContext.Provider>
  );
}

export function useFavorite() {

  const context =
    useContext(FavoriteContext);

  if (!context) {

    throw new Error(
      "useFavorite debe ser usado dentro de FavoriteProvider"
    );
  }

  return context;
}
