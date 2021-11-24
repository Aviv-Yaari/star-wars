import { useEffect, useState } from 'react';
import { Favorite } from './Favorite';
import { CharacterList } from './CharacterList';

export function FilmDetails({ film, onFilmLike }) {
  const [characterIndex, setCharacterIndex] = useState(0);
  const { title, episode_id, director, producer, characters, opening_crawl, isFavorite } = film;

  const handleMove = diff => {
    setCharacterIndex(current => current + diff);
  };

  useEffect(() => {
    setCharacterIndex(0);
  }, [film]);

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
      <h3>Characters:</h3>
      <CharacterList characters={characters} index={characterIndex} onMove={handleMove} />
    </article>
  );
}
