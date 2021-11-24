import { httpService } from './http.service';
import { storageService } from './storage.service';

export const filmService = { query, toggleFavorite };

async function query() {
  const cacheData = storageService.load('films');
  if (cacheData) return cacheData;
  const response = await httpService.get('https://swapi.dev/api/films/?format=json');
  let { results: films } = response;
  const charactersMap = await _getCharactersData(films);
  for (const film of films) {
    film.characters = film.characters.map(character => {
      const id = character.split('https://swapi.dev/api/people/')[1].split('/')[0];
      return charactersMap[id];
    });
  }
  storageService.save('films', films);
  return films;
}

async function _getCharactersData() {
  const characters = await httpService.get('https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json');
  const map = characters.reduce((map, character) => {
    map[character.id] = character;
    return map;
  }, {});
  return map;
}

function toggleFavorite(films, filmId) {
  const updatedFilms = films.map(film =>
    film.episode_id === filmId ? { ...film, isFavorite: !film.isFavorite } : film
  );
  storageService.save('films', updatedFilms);
  return updatedFilms;
}
