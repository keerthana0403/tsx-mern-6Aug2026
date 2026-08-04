import type { Person } from "../types";
import CharacterCard from "./CharacterCard";

interface Props {
  people: Person[];
  onSelect: (person: Person) => void;
}

const CharacterGrid = ({ people, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {people.map((person) => (
        <CharacterCard
          key={person.uid}
          person={person}
          onClick={() => onSelect(person)}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
