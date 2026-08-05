import { useMemo } from "react";
import { useAllPeople } from "./useAllPeople";
import { useSpeciesMap } from "./useSpeciesMap";
import type { CharacterFilters, Person } from "../types";

export function useCharacterSearch(
  search: string,
  filters: CharacterFilters,
  page: number,
  pageSize = 10,
) {
  const {
    data: allPeople,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllPeople();
  const { getSpeciesUrl } = useSpeciesMap();

  const filtered = useMemo(() => {
    if (!allPeople) return [];
    const term = search.trim().toLowerCase();

    return allPeople.filter((p: Person) => {
      const nameMatches =
        term === "" || p.properties.name.toLowerCase().includes(term);
      const homeworldMatches =
        filters.homeworld === "" ||
        p.properties.homeworld === filters.homeworld;
      const filmMatches =
        filters.film === "" || p.properties.films.includes(filters.film);
      const speciesMatches =
        filters.species === "" ||
        getSpeciesUrl(p.properties.url) === filters.species;

      return nameMatches && homeworldMatches && filmMatches && speciesMatches;
    });
  }, [allPeople, search, filters, getSpeciesUrl]);

  const totalRecords = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const start = (page - 1) * pageSize;
  const people = filtered.slice(start, start + pageSize);

  return {
    people,
    totalPages,
    totalRecords,
    isLoading,
    isError,
    error,
    refetch,
  };
}
