import { httpService } from './http.service';
import { storageService } from './storage.service';

export const filmService = { query, toggleFavorite };
let gFilms = storageService.load('films');

async function query(filter, sort) {
  const regExp = new RegExp(filter.title, 'i');
  const sortKey = Object.keys(sort)[0];
  if (!gFilms) gFilms = await _getData();
  return gFilms.filter(film => regExp.test(film.title)).sort((a, b) => (a[sortKey] - b[sortKey]) * sort[sortKey]);
}

async function _getData() {
  try {
    const response = await httpService.get('https://swapi.dev/api/films/?format=json');
    // const response = await httpService.get('https://balblablablablaswapi.dev/api/films/?format=json'); // to simulate error
    let { results: films } = response;
    const charactersMap = await _getCharactersData(films);
    for (const film of films) {
      film.release_date = parseInt(film.release_date.slice(0, 4));
      film.characters = film.characters.map(character => {
        const id = character.split('https://swapi.dev/api/people/')[1].split('/')[0];
        return charactersMap[id];
      });
    }
    storageService.save('films', films);
    return films;
  } catch (err) {
    throw err;
  }
}

async function _getCharactersData() {
  const characters = await httpService.get('https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json');
  const map = characters.reduce((map, character) => {
    map[character.id] = character;
    return map;
  }, {});
  return map;
}

function toggleFavorite(filmId) {
  for (const film of gFilms) {
    if (film.episode_id === filmId) {
      film.isFavorite = !film.isFavorite;
      break;
    }
  }
  storageService.save('films', gFilms);
  return gFilms;
}
