export interface PersonSummary {
  uid: string;
  name: string;
  url: string;
}

export interface PersonProperties {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species?: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Person {
  uid: string;
  properties: PersonProperties;
}

export interface PlanetProperties {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface Planet {
  uid: string;
  properties: PlanetProperties;
}

export interface SpeciesProperties {
  name: string;
}

export interface PeopleListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: PersonSummary[];
}

export interface PersonDetailResponse {
  message: string;
  result: Person;
}

export interface PlanetDetailResponse {
  message: string;
  result: Planet;
}
