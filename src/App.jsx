import { useEffect, useState } from 'react';
import { FilmDetails } from './cmps/FilmDetails';
import { FilmList } from './cmps/FilmList';
import { filmService } from './services/film.service';
import { storageService } from './services/storage.service';

export function App() {
  const [films, setFilms] = useState(null);
  const [selectedFilmId, setSelectedFilmId] = useState(4);

  useEffect(() => {
    const getData = async () => {
      const films = await filmService.query();
      setFilms(films);
      setSelectedFilmId(storageService.load('selectedFilmId') || 4);
    };
    getData();
  }, []);

  const handleFilmClick = id => {
    setSelectedFilmId(id);
    storageService.save('selectedFilmId', id);
  };

  const handleFilmLike = id => {
    const updatedFilms = filmService.toggleFavorite(films, id);
    setFilms(updatedFilms);
  };

  if (!films) return <div>Loading...</div>;
  const selectedFilm = films.find(film => film.episode_id === selectedFilmId);
  return (
    <main className="app">
      <div className="main-container flex">
        <FilmList
          films={films}
          selectedFilmId={selectedFilmId}
          onFilmClick={handleFilmClick}
          onFilmLike={handleFilmLike}
        />
        <FilmDetails film={selectedFilm} onFilmLike={handleFilmLike} />
      </div>
    </main>
  );
}
