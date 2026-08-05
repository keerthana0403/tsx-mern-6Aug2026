import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSpeciesExpanded } from "../api/swapi";

export function useSpeciesMap() {
  const { data } = useQuery({
    queryKey: ["species", "expanded"],
    queryFn: fetchAllSpeciesExpanded,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { nameByPersonUrl, speciesUrlByPersonUrl } = useMemo(() => {
    const nameMap = new Map<string, string>();
    const urlMap = new Map<string, string>();
    if (data) {
      for (const species of data) {
        for (const personUrl of species.properties.people ?? []) {
          nameMap.set(personUrl, species.properties.name);
          urlMap.set(personUrl, species.properties.url as string);
        }
      }
    }
    return { nameByPersonUrl: nameMap, speciesUrlByPersonUrl: urlMap };
  }, [data]);

  const getSpeciesName = (personUrl: string): string =>
    nameByPersonUrl.get(personUrl) ?? "Human";

  const getSpeciesUrl = (personUrl: string): string =>
    speciesUrlByPersonUrl.get(personUrl) ?? "";

  return { getSpeciesName, getSpeciesUrl };
}
