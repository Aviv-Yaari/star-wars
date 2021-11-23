import { FilmPreview } from './FilmPreview';

export function FilmList({ films, selectedFilmId, onFilmClick, onFilmLike }) {
  return (
    <aside className="film-list flex column">
      {films.map(film => (
        <FilmPreview
          key={film.episode_id}
          film={film}
          isSelected={selectedFilmId === film.episode_id}
          onFilmClick={onFilmClick}
          onFilmLike={onFilmLike}
        />
      ))}
    </aside>
  );
}
