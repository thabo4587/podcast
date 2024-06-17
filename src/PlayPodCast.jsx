import React, { useEffect, useState, useRef } from 'react';

const PlayPodcastComponent = ({ match }) => {
  const { id, seasonId } = match.params;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setShow(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Simulating fetching current season data based on seasonId
    if (show && seasonId) {
      const season = show.seasons.find(season => season.id === seasonId);
      setCurrentSeason(season);
    }
  }, [show, seasonId]);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div className="play-podcast">
      <h1 className="text-3xl font-bold mb-4">{show.title}</h1>
      <img src={show.image} alt={show.title} className="rounded-lg mb-4" />
      <p className="mb-4">{show.description}</p>
      {currentSeason ? (
        <div className="season-detail">
          <h2 className="text-2xl font-semibold mb-2">{currentSeason.title}</h2>
          <img src={currentSeason.image} alt={currentSeason.title} className="rounded-lg mb-4" />
          <h3 className="text-xl font-semibold mb-2">Episodes</h3>
          {currentSeason.episodes.map(episode => (
            <div key={episode.id} className="episode mb-4">
              <h4 className="text-lg font-semibold mb-2">{episode.title}</h4>
              <audio ref={audioRef} className="mb-2">
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="flex space-x-2">
                <button onClick={playAudio} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                  Play
                </button>
                <button onClick={pauseAudio} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xl font-semibold text-red-600">Select a season to view episodes.</div>
      )}
      <h2 className="text-2xl font-semibold mt-8">Seasons</h2>
      {show.seasons.map(season => (
        <div key={season.id} className="season mb-4">
          <h3 className="text-xl font-semibold mb-2">{season.title}</h3>
          <img src={season.image} alt={season.title} className="rounded-lg mb-2" />
          <p className="mb-2">Episodes: {season.episodes.length}</p>
          <a href={`/play/${id}/season/${season.id}`} className="text-blue-500">View Season</a>
        </div>
      ))}
    </div>
  );
};

export default PlayPodcastComponent;
