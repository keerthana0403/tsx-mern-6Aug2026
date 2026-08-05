import type { CharacterFilters } from "../types";
import { useFilterOptions } from "../hooks/useFilterOptions";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
}

const SearchFilterBar = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
}: SearchFilterBarProps) => {
  const { films, species, planets, isLoading } = useFilterOptions();

  const hasActiveFilters =
    search.trim() !== "" ||
    filters.homeworld !== "" ||
    filters.film !== "" ||
    filters.species !== "";

  const handleClear = () => {
    onSearchChange("");
    onFilterChange({ homeworld: "", film: "", species: "" });
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name..."
        aria-label="Search characters by name"
        className="w-full sm:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <select
        value={filters.homeworld}
        onChange={(e) =>
          onFilterChange({ ...filters, homeworld: e.target.value })
        }
        disabled={isLoading}
        aria-label="Filter by homeworld"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">All homeworlds</option>
        {planets.map((p) => (
          <option key={p.uid} value={p.url}>
            {p.name}
          </option>
        ))}
      </select>
      <select
        value={filters.film}
        onChange={(e) => onFilterChange({ ...filters, film: e.target.value })}
        disabled={isLoading}
        aria-label="Filter by film"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">All films</option>
        {films.map((f) => (
          <option key={f.uid} value={f.url}>
            {f.name}
          </option>
        ))}
      </select>
      <select
        value={filters.species}
        onChange={(e) =>
          onFilterChange({ ...filters, species: e.target.value })
        }
        disabled={isLoading}
        aria-label="Filter by species"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">All species</option>
        {species.map((s) => (
          <option key={s.uid} value={s.url}>
            {s.name}
          </option>
        ))}
      </select>
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 underline hover:text-gray-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default SearchFilterBar;
