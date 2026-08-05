import { useQuery } from "@tanstack/react-query";
import { fetchAllFilms, fetchAllPlanets, fetchAllSpecies } from "../api/swapi";

export function useFilterOptions() {
  const films = useQuery({
    queryKey: ["films", "all"],
    queryFn: fetchAllFilms,
    staleTime: Infinity,
  });
  const species = useQuery({
    queryKey: ["species", "all"],
    queryFn: fetchAllSpecies,
    staleTime: Infinity,
  });
  const planets = useQuery({
    queryKey: ["planets", "all"],
    queryFn: fetchAllPlanets,
    staleTime: Infinity,
  });

  return {
    films: films.data ?? [],
    species: species.data ?? [],
    planets: planets.data ?? [],
    isLoading: films.isLoading || species.isLoading || planets.isLoading,
  };
}
