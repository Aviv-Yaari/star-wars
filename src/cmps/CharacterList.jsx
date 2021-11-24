import { ReactComponent as IconNext } from '../assets/img/icon-next.svg';
import { ReactComponent as IconPrev } from '../assets/img/icon-previous.svg';
import { CharacterPreview } from './CharacterPreview';

export function CharacterList({ characters, index, onMove }) {
  const isStartOfList = index === 0;
  const isEndOfList = index === characters.length - 1;

  return (
    <section className="character-list flex align-center">
      {
        <button className={isStartOfList ? 'disabled' : ''} onClick={() => !isStartOfList && onMove(-1)}>
          <IconPrev />
        </button>
      }
      {characters.slice(index).map(character => (
        <CharacterPreview key={character.id} character={character} />
      ))}
      {
        <button onClick={() => !isEndOfList && onMove(1)}>
          <IconNext />
        </button>
      }
    </section>
  );
}
