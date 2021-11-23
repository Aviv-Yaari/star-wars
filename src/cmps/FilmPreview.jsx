import { Favorite } from './Favorite';

export function FilmPreview({ film, isSelected, onFilmClick, onFilmLike }) {
  const { title, episode_id, release_date, isFavorite } = film;
  return (
    <section
      className={`film-preview flex space-between ${isSelected ? 'selected' : ''}`}
      onClick={() => onFilmClick(episode_id)}>
      <div>
        <h3>{title}</h3>
        <p className="subtitle">
          Episode {episode_id} • {release_date.slice(0, 4)}
        </p>
      </div>
      <Favorite isFavorite={isFavorite} onClick={() => onFilmLike(episode_id)} />
    </section>
  );
}
