import { useEffect, useMemo, useState } from 'react';
import { AppError } from './cmps/AppError';
import { AppLoading } from './cmps/AppLoading';
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
        setError('Could not get film data, try to refresh');
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

  const handleFilmClick = id => {
    setSelectedFilmId(id);
    storageService.save('selectedFilmId', id);
  };

  const handleFilmLike = async id => {
    filmService.toggleFavorite(id);
    const films = await filmService.query(filter, sort);
    setFilms(films);
  };

  if (error) return <AppError error={error} />;
  if (!films) return <AppLoading />;
  const selectedFilm = films.find(film => film.episode_id === selectedFilmId);
  return (
    <main className="app">
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
          <div className="film-details grow">
            <h2>No film selected</h2>
          </div>
        )}
      </div>
    </main>
  );
}
