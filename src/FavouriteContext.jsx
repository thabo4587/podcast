import React, { createContext, useState, useEffect } from 'react';

// Create a context object
const FavouritesContext = createContext();

// Create a provider component
const FavouritesProvider = ({ children }) => {
  // Initialize state for favourites using localStorage
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Update localStorage whenever favourites state changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add a favourite episode to the favourites list
  const addFavourite = episode => {
    setFavourites([...favourites, episode]);
  };

  // Remove a favourite episode from the favourites list
  const removeFavourite = episodeId => {
    setFavourites(favourites.filter(fav => fav.id !== episodeId));
  };

  // Context value object to be provided to consumers
  const contextValue = {
    favourites,
    addFavourite,
    removeFavourite,
  };

  // Provide the context value to children components
  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesContext, FavouritesProvider };
