import { render, screen, fireEvent } from "@testing-library/react";
import { CountryCard } from "@/components/ui/country-card";
import { Country } from "@/types/country";
import "@testing-library/jest-dom";

// Mock framer-motion para evitar errores en tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      // Elimina props que no son válidas en un div
      const { whileHover, fill, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

const mockCountry: Country = {
  name: {
    common: "Spain",
    official: "Kingdom of Spain",
  },
  cca2: "ES",
  cca3: "ESP",
  population: 47351567,
  region: "Europe",
  subregion: "Southern Europe",
  capital: ["Madrid"],
  flags: {
    png: "https://flagcdn.com/w320/es.png",
    svg: "https://flagcdn.com/es.svg",
    alt: "Flag of Spain",
  },
  altSpellings: ["ES", "Kingdom of Spain"],
  translations: {},
  latlng: [40, -4],
  landlocked: false,
  area: 505992,
  flag: "🇪🇸",
  maps: {
    googleMaps: "https://goo.gl/maps/example",
    openStreetMaps: "https://www.openstreetmap.org/example",
  },
  coatOfArms: {},
  startOfWeek: "monday",
  capitalInfo: {},
  status: "officially-assigned",
  unMember: true,
  timezones: ["UTC+01:00"],
  continents: ["Europe"],
  car: {
    side: "right",
  },
};

describe("CountryCard", () => {
  it("renders country information correctly", () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("47,351,567")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(screen.getByAltText("Flag of Spain")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const mockOnClick = jest.fn();
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when Enter key is pressed", () => {
    const mockOnClick = jest.fn();
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when Space key is pressed", () => {
    const mockOnClick = jest.fn();
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: " " });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("handles country without capital", () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined };
    render(<CountryCard country={countryWithoutCapital} />);

    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.queryByText("Capital:")).not.toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<CountryCard country={mockCountry} />);

    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-label", "View details for Spain");
    expect(card).toHaveAttribute("tabIndex", "0");
  });
});
