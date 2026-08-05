import { useState } from "react";
import { usePeople } from "./hooks/usePeople";
import { useCharacterSearch } from "./hooks/useCharacterSearch";
import CharacterGrid from "./components/CharacterGrid";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import type { CharacterFilters, Person } from "./types";
import Pagination from "./components/Pagination";
import CharacterModal from "./components/CharacterModal";
import SearchFilterBar from "./components/SearchFilterBar";

const EMPTY_FILTERS: CharacterFilters = {
  homeworld: "",
  film: "",
  species: "",
};

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<CharacterFilters>(EMPTY_FILTERS);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const isFiltering =
    search.trim() !== "" ||
    filters.homeworld !== "" ||
    filters.film !== "" ||
    filters.species !== "";

  const serverPaged = usePeople(page);
  const filteredPaged = useCharacterSearch(search, filters, page);

  const people = isFiltering
    ? filteredPaged.people
    : (serverPaged.data?.people ?? []);
  const totalPages = isFiltering
    ? filteredPaged.totalPages
    : (serverPaged.data?.totalPages ?? 1);
  const isLoading = isFiltering
    ? filteredPaged.isLoading
    : serverPaged.isLoading;
  const isError = isFiltering ? filteredPaged.isError : serverPaged.isError;
  const error = isFiltering ? filteredPaged.error : serverPaged.error;
  const refetch = isFiltering ? filteredPaged.refetch : serverPaged.refetch;
  const isFetching = isFiltering
    ? filteredPaged.isLoading
    : serverPaged.isFetching;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (next: CharacterFilters) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Star Wars Characters</h1>

      <SearchFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {isLoading && <LoadingState />}
      {isError && (
        <ErrorState
          message={(error as Error).message}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && (
        <>
          {people.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No characters match your search/filters.
            </p>
          ) : (
            <CharacterGrid people={people} onSelect={setSelectedPerson} />
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isFetching={isFetching}
          />
        </>
      )}

      {selectedPerson && (
        <CharacterModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}

export default App;
