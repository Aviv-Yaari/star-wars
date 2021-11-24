export function CharacterPreview({ character, onSelectCharacter }) {
  const { name, image } = character;
  return (
    <article className="character-preview flex column align-center" onClick={() => onSelectCharacter(character)}>
      <img src={image} alt={name} />
      <span className="name flex align-center">{name}</span>
    </article>
  );
}
