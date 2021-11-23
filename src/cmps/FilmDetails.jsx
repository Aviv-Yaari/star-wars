import { useEffect, useState } from 'react';
import { filmService } from '../services/film.service';
import { Favorite } from './Favorite';

export function FilmDetails({ film, onFilmLike }) {
  const { title, episode_id, director, producer, characters, opening_crawl, isFavorite } = film;
  return (
    <article className="film-details grow">
      <h2>
        {title} - Episode {episode_id} <Favorite isFavorite={isFavorite} onClick={() => onFilmLike(episode_id)} />
      </h2>
      <h3>
        Director: <span className="fw-400">{director}</span>
      </h3>
      <h3>
        Producer: <span className="fw-400">{producer}</span>
      </h3>
      <h3>Summary:</h3>
      <p className="summary">{opening_crawl}</p>
      <h3>Notable Characters:</h3> <p>{characters.map(character => character.name).join(', ')}</p>
    </article>
  );
}
