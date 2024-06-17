import React, { useContext } from 'react';
import { FavouritesContext } from './FavouriteContext'; 

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  return (
    <div className="favourites">
      <h1 className="text-3xl font-bold mb-4">Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favourites.map(episode => (
            <div key={episode.id} className="episode-card p-4 border border-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{episode.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Season: {episode.season}</p>
              <p className="text-sm text-gray-500 mb-2">Date Added: {episode.dateAdded}</p>
              <button onClick={() => removeFavourite(episode.id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
