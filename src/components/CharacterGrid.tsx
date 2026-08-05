import type { Person } from "../types";
import CharacterCard from "./CharacterCard";
import { useSpeciesMap } from "../hooks/useSpeciesMap";

interface Props {
  people: Person[];
  onSelect: (person: Person) => void;
}

const CharacterGrid = ({ people, onSelect }: Props) => {
  const { getSpeciesName } = useSpeciesMap();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {people.map((person) => (
        <CharacterCard
          key={person.uid}
          person={person}
          speciesName={getSpeciesName(person.properties.url)}
          onClick={() => onSelect(person)}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
