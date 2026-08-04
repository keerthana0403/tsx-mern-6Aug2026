import { useQuery } from "@tanstack/react-query";
import { fetchPeoplePage, fetchPersonDetail } from "../api/swapi";
import type { Person } from "../types";

export function usePeople(page: number, limit = 10) {
  return useQuery({
    queryKey: ["people", page, limit],
    queryFn: async () => {
      const list = await fetchPeoplePage(page, limit);

      const details = await Promise.all(
        list.results.map((p) => fetchPersonDetail(p.uid)),
      );

      const people: Person[] = details.map((d) => d.result);

      return {
        people,
        totalPages: list.total_pages,
        totalRecords: list.total_records,
      };
    },
    placeholderData: (previousData) => previousData,
  });
}
