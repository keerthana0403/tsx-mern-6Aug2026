import axios from "axios";
import type {
  PeopleListResponse,
  PersonDetailResponse,
  PlanetDetailResponse,
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
