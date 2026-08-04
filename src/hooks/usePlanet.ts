import { useQuery } from "@tanstack/react-query";
import { fetchPlanetByUrl } from "../api/swapi";

export function usePlanet(homeworldUrl: string | undefined) {
  return useQuery({
    queryKey: ["planet", homeworldUrl],
    queryFn: () => fetchPlanetByUrl(homeworldUrl!),
    enabled: !!homeworldUrl,
  });
}
