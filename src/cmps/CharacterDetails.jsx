import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export function CharacterDetails({ character, onClose }) {
  const { name, died, image, gender, hairColor, species, born, bornLocation, diedLocation, height } = character;
  return (
    <div className="character-details" onClick={onClose}>
      <article className="content flex" onClick={ev => ev.stopPropagation()}>
        <IconButton className="btn-close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <section className="flex align-center justify-center">
          <img src={image} alt={name} />
        </section>
        <section className="info">
          <h2>{name}</h2>
          <p>
            A {species}, born in the year {born} at {bornLocation || 'unknown'}.
          </p>
          <h3>
            Gender: <span>{gender}</span>
          </h3>
          <h3>
            Hair Color: <span>{hairColor}</span>
          </h3>
          <h3>
            Status: <span>{died ? `Died in the year ${died} at ${diedLocation}` : 'Alive'}</span>
          </h3>
          <h3>
            Height: <span>{height}m</span>
          </h3>
        </section>
      </article>
    </div>
  );
}
