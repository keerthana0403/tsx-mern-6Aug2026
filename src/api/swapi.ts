import axios from "axios";
import type {
  PeopleListResponse,
  PersonDetailResponse,
  PlanetDetailResponse,
  ExpandedPeopleListResponse,
  ResourceListResponse,
  ExpandedSpeciesListResponse,
} from "../types";

const BASE_URL = "https://www.swapi.tech/api";

const client = axios.create({ baseURL: BASE_URL, timeout: 10000 });

export async function fetchPeoplePage(
  page: number,
  limit = 10,
): Promise<PeopleListResponse> {
  const { data } = await client.get<PeopleListResponse>("/people", {
    params: { page, limit },
  });
  return data;
}

export async function fetchPersonDetail(
  uid: string,
): Promise<PersonDetailResponse> {
  const { data } = await client.get<PersonDetailResponse>(`/people/${uid}`);
  return data;
}

export async function fetchPlanetByUrl(
  url: string,
): Promise<PlanetDetailResponse> {
  const { data } = await client.get<PlanetDetailResponse>(url);
  return data;
}

async function fetchAllPages<T>(
  path: string,
  extraParams: Record<string, unknown> = {},
): Promise<T[]> {
  const first = await client.get<{ results: T[]; total_pages: number }>(path, {
    params: { page: 1, limit: 100, ...extraParams },
  });

  let results = [...first.data.results];
  const totalPages = first.data.total_pages;

  if (totalPages > 1) {
    const rest = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) =>
        client.get<{ results: T[] }>(path, {
          params: { page: i + 2, limit: 100, ...extraParams },
        }),
      ),
    );
    results = results.concat(...rest.map((r) => r.data.results));
  }

  return results;
}

export async function fetchAllPeopleExpanded(): Promise<
  ExpandedPeopleListResponse["results"]
> {
  return fetchAllPages<ExpandedPeopleListResponse["results"][number]>(
    "/people",
    {
      expanded: true,
    },
  );
}

export async function fetchAllFilms(): Promise<
  ResourceListResponse["results"]
> {
  return fetchAllPages<ResourceListResponse["results"][number]>("/films");
}

export async function fetchAllSpecies(): Promise<
  ResourceListResponse["results"]
> {
  return fetchAllPages<ResourceListResponse["results"][number]>("/species");
}

export async function fetchAllPlanets(): Promise<
  ResourceListResponse["results"]
> {
  return fetchAllPages<ResourceListResponse["results"][number]>("/planets");
}

export async function fetchAllSpeciesExpanded(): Promise<
  ExpandedSpeciesListResponse["results"]
> {
  return fetchAllPages<ExpandedSpeciesListResponse["results"][number]>(
    "/species",
    {
      expanded: true,
    },
  );
}
