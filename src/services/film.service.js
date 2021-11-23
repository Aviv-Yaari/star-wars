import { httpService } from './http.service';
import { storageService } from './storage.service';

export const filmService = { query, toggleFavorite };

async function query() {
  const cacheData = storageService.load('films');
  if (cacheData) return cacheData;
  const response = await httpService.get('https://swapi.dev/api/films/?format=json');
  const { results: films } = response;
  for (const film of films) {
    const prms = film.characters.slice(5, 15).map(character => httpService.get(character + '?format=json'));
    const charactersInfo = await Promise.all(prms);
    film.characters = charactersInfo;
  }
  storageService.save('films', films);
  return films;
}

function toggleFavorite(films, filmId) {
  const updatedFilms = films.map(film =>
    film.episode_id === filmId ? { ...film, isFavorite: !film.isFavorite } : film
  );
  storageService.save('films', updatedFilms);
  return updatedFilms;
}
