import type { Person } from "../types";
import { getSpeciesColorClasses } from "../utils/speciesColor";

interface Props {
  person: Person;
  onClick: () => void;
}

const CharacterCard = ({ person, onClick }: Props) => {
  const { name, species } = person.properties;
  const colors = getSpeciesColorClasses(species);
  const imageUrl = `https://picsum.photos/seed/${person.uid}/300/200`;

  return (
    <button
      onClick={onClick}
      className={`
        ${colors.bg} ${colors.border}
        border-2 rounded-xl overflow-hidden text-left
        transition-transform duration-200 ease-out
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      `}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className={`font-semibold ${colors.text}`}>{name}</h3>
      </div>
    </button>
  );
};

export default CharacterCard;
