import { createContext, useContext, useEffect, useState } from "react";
import favoritoService from "../services/favoritoService";

export const FavoriteContext = createContext();

const mapFavoritoToProduct = (favorito) => ({
  id: favorito.productoId,
  nombre: favorito.productoNombre,
  descripcion: favorito.productoDescripcion,
  precio: favorito.productoPrecio,
  stock: favorito.productoStock,
  imagen_url: favorito.productoImagenUrl,
});

export function FavoriteProvider({ children }) {

  const [favoriteItems, setFavoriteItems] =
    useState([]);

  // Cargamos los favoritos guardados en la base de datos al iniciar sesión / recargar la página
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    favoritoService.getByUsuario(userId)
      .then(data => setFavoriteItems(data.map(mapFavoritoToProduct)))
      .catch(err => console.log("Error cargando favoritos:", err));
  }, []);

  const addToFavorite = async (producto) => {

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const existe =
      favoriteItems.find(
        item => item.id === producto.id
      );

    try {

      if (existe) {

        await favoritoService.remove(userId, producto.id);

        setFavoriteItems(
          favoriteItems.filter(
            item => item.id !== producto.id
          )
        );

      } else {

        await favoritoService.add(userId, producto.id);

        setFavoriteItems([
          ...favoriteItems,
          producto
        ]);
      }

    } catch (err) {
      console.log("Error actualizando favoritos:", err);
    }
  };

  const isFavorite = (productoId) => {

    return favoriteItems.some(
      item => item.id === productoId
    );
  };

  const removeFromFavorite = async (productoId) => {

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {

      await favoritoService.remove(userId, productoId);

      setFavoriteItems(
        favoriteItems.filter(
          item => item.id !== productoId
        )
      );

    } catch (err) {
      console.log("Error quitando favorito:", err);
    }
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
