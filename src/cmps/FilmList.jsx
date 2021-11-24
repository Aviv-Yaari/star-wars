import { FilmListSort } from './FilmListSort';
import { FilmPreview } from './FilmPreview';

export function FilmList({ films, selectedFilmId, sort, onFilmClick, onFilmLike, onSearch, onSort }) {
  return (
    <aside className="film-list flex column">
      <input type="text" placeholder="Search..." onChange={onSearch} />
      <FilmListSort sort={sort} onSort={onSort} />
      {films.map(film => (
        <FilmPreview
          key={film.episode_id}
          film={film}
          isSelected={selectedFilmId === film.episode_id}
          onFilmClick={onFilmClick}
          onFilmLike={onFilmLike}
        />
      ))}
      {films.length === 0 && (
        <div>
          <h3>No films found</h3>
        </div>
      )}
    </aside>
  );
}
