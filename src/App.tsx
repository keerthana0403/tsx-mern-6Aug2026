import { useState } from "react";
import { usePeople } from "./hooks/usePeople";
import CharacterGrid from "./components/CharacterGrid";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import type { Person } from "./types";
import Pagination from "./components/Pagination";
import CharacterModal from "./components/CharacterModal";

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch, isFetching } =
    usePeople(page);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Star Wars Characters</h1>

      {isLoading && <LoadingState />}
      {isError && (
        <ErrorState
          message={(error as Error).message}
          onRetry={() => refetch()}
        />
      )}
      {data && (
        <>
          <CharacterGrid people={data.people} onSelect={setSelectedPerson} />
          <Pagination
            page={page}
            totalPages={data.totalPages}
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
