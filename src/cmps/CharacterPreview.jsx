export function CharacterPreview({ character }) {
  const { name, image } = character;
  return (
    <article className="character-preview flex column align-center">
      <img src={image} alt={name} />
      <span className="name">{name}</span>
    </article>
  );
}
