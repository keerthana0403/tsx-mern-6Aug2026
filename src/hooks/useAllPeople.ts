import { useQuery } from "@tanstack/react-query";
import { fetchAllPeopleExpanded } from "../api/swapi";

export function useAllPeople() {
  return useQuery({
    queryKey: ["people", "all"],
    queryFn: fetchAllPeopleExpanded,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
