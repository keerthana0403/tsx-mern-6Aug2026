import { useEffect } from "react";
import type { Person } from "../types";
import { usePlanet } from "../hooks/usePlanet";
import {
  formatHeightInMeters,
  formatMassInKg,
  formatCreatedDate,
} from "../utils/format";

interface Props {
  person: Person;
  onClose: () => void;
}

const CharacterModal = ({ person, onClose }: Props) => {
  const { name, height, mass, created, films, birth_year, homeworld } =
    person.properties;
  const {
    data: planetData,
    isLoading: planetLoading,
    isError: planetError,
  } = usePlanet(homeworld);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
          >
            {" "}
            ✕
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6">
          <dt className="text-gray-500">Height</dt>
          <dd>{formatHeightInMeters(height)}</dd>

          <dt className="text-gray-500">Mass</dt>
          <dd>{formatMassInKg(mass)}</dd>

          <dt className="text-gray-500">Added to API</dt>
          <dd>{formatCreatedDate(created)}</dd>

          <dt className="text-gray-500">Films</dt>
          <dd>{films.length}</dd>

          <dt className="text-gray-500">Birth Year</dt>
          <dd>{birth_year}</dd>
        </dl>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Homeworld</h3>

          {planetLoading && (
            <p className="text-gray-400 text-sm">Loading homeworld…</p>
          )}
          {planetError && (
            <p className="text-red-500 text-sm">
              Couldn't load homeworld data.
            </p>
          )}
          {planetData && (
            <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <dt className="text-gray-500">Name</dt>
              <dd>{planetData.result.properties.name}</dd>

              <dt className="text-gray-500">Climate</dt>
              <dd>{planetData.result.properties.climate}</dd>

              <dt className="text-gray-500">Terrain</dt>
              <dd>{planetData.result.properties.terrain}</dd>

              <dt className="text-gray-500">Residents</dt>
              <dd>{planetData.result.properties.population}</dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
