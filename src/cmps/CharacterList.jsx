import { useState } from 'react';
import { ReactComponent as IconNext } from '../assets/img/icon-next.svg';
import { ReactComponent as IconPrev } from '../assets/img/icon-previous.svg';
import { CharacterPreview } from './CharacterPreview';

export function CharacterList({ characters }) {
  const [index, setIndex] = useState(0);

  const handleMove = diff => {
    setIndex(current => current + diff);
  };

  const isStartOfList = index === 0;
  const isEndOfList = index === characters.length - 1;
  return (
    <section className="character-list flex align-center">
      {
        <button className={isStartOfList ? 'disabled' : ''} onClick={() => !isStartOfList && handleMove(-1)}>
          <IconPrev />
        </button>
      }
      {characters.slice(index).map(character => (
        <CharacterPreview key={character.id} character={character} />
      ))}
      {
        <button onClick={() => !isEndOfList && handleMove(1)}>
          <IconNext />
        </button>
      }
    </section>
  );
}
