import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import type { Person } from "../types";
import CharacterGrid from "./CharacterGrid";
import CharacterModal from "./CharacterModal";
import {
  formatHeightInMeters,
  formatMassInKg,
  formatCreatedDate,
} from "../utils/format";

// CharacterGrid resolves species names/colors via this hook, mock it so
// the test doesn't depend on a live species fetch.
vi.mock("../hooks/useSpeciesMap", () => ({
  useSpeciesMap: () => ({
    getSpeciesName: () => "Human",
    getSpeciesUrl: () => "",
  }),
}));

// CharacterModal fetches homeworld data via this hook, mock it directly
// with fixed planet data instead of hitting the network.
vi.mock("../hooks/usePlanet", () => ({
  usePlanet: () => ({
    data: {
      message: "ok",
      result: {
        uid: "1",
        properties: {
          name: "Tatooine",
          climate: "arid",
          terrain: "desert",
          population: "200000",
        },
      },
    },
    isLoading: false,
    isError: false,
  }),
}));

const mockPerson: Person = {
  uid: "1",
  properties: {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://www.swapi.tech/api/planets/1",
    films: ["film-1", "film-2", "film-3", "film-4"],
    species: [],
    created: "2025-01-01T12:00:00.000Z",
    edited: "2025-01-01T12:00:00.000Z",
    url: "https://www.swapi.tech/api/people/1",
  },
};

/** Mirrors App.tsx's selection state: click a card, modal opens with that person. */
function Harness() {
  const [selected, setSelected] = useState<Person | null>(null);
  return (
    <>
      <CharacterGrid people={[mockPerson]} onSelect={setSelected} />
      {selected && (
        <CharacterModal person={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

describe("CharacterModal integration", () => {
  it("does not render the modal before a card is clicked", () => {
    render(<Harness />);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("opens the modal with the correct person's information on card click", () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: /Luke Skywalker/i }));

    // Modal header shows the clicked person's name
    expect(
      screen.getByRole("heading", { level: 2, name: "Luke Skywalker" }),
    ).toBeInTheDocument();

    // Person details, computed via the same formatters the component uses
    expect(
      screen.getByText(formatHeightInMeters(mockPerson.properties.height)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatMassInKg(mockPerson.properties.mass)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCreatedDate(mockPerson.properties.created)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(mockPerson.properties.films.length)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPerson.properties.birth_year),
    ).toBeInTheDocument();

    // Homeworld details, from the mocked usePlanet response
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("arid")).toBeInTheDocument();
    expect(screen.getByText("desert")).toBeInTheDocument();
    expect(screen.getByText("200000")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: /Luke Skywalker/i }));
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("closes the modal on Escape key press", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: /Luke Skywalker/i }));
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });
});
