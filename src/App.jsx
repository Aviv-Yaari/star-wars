import { Alert, LinearProgress, Snackbar } from '@mui/material';

import { useEffect, useMemo, useState } from 'react';
import { FilmDetails } from './cmps/FilmDetails';
import { FilmList } from './cmps/FilmList';
import { filmService } from './services/film.service';
import { storageService } from './services/storage.service';

export function App() {
  const selectedIdCache = useMemo(() => storageService.load('selectedFilmId'), []);
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ title: '' });
  const [sort, setSort] = useState({ release_date: 1 });
  const [selectedFilmId, setSelectedFilmId] = useState(selectedIdCache || 4);

  useEffect(() => {
    const getData = async () => {
      try {
        const films = await filmService.query(filter, sort);
        setFilms(films);
      } catch (error) {
        setError('Could not get film data');
      }
    };
    getData();
  }, [filter, sort]);

  const handleSearch = async ev => {
    const title = ev.target.value.replace('\\', '');
    setFilter({ title });
  };

  const handleSort = async fieldName => {
    setSort(sort => ({ [fieldName]: sort[fieldName] ? sort[fieldName] * -1 : 1 }));
  };

  const handleCloseMessage = () => {
    setError(null);
  };

  const handleFilmClick = id => {
    setSelectedFilmId(id);
    storageService.save('selectedFilmId', id);
  };

  const handleFilmLike = async id => {
    filmService.toggleFavorite(id);
    const films = await filmService.query(filter, sort);
    setFilms(films);
  };

  if (error)
    return (
      <main className="app">
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseMessage}>
          <Alert onClose={handleCloseMessage} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </main>
    );

  if (!films)
    return (
      <main className="app">
        <div className="loading-container">
          <LinearProgress color="secondary" />
          <p>Loading..</p>
          <p>API might be slow sometimes, May the force be with you</p>
        </div>
      </main>
    );
  const selectedFilm = films.find(film => film.episode_id === selectedFilmId);
  return (
    <main className="app">
      {films && (
        <div className="main-container flex">
          <FilmList
            films={films}
            selectedFilmId={selectedFilmId}
            sort={sort}
            onFilmClick={handleFilmClick}
            onFilmLike={handleFilmLike}
            onSearch={handleSearch}
            onSort={handleSort}
          />
          {selectedFilm ? (
            <FilmDetails film={selectedFilm} onFilmLike={handleFilmLike} />
          ) : (
            <div className="film-details" />
          )}
        </div>
      )}
    </main>
  );
}
