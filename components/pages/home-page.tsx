"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Country, Region } from "@/types/country";
import { countryService } from "@/lib/api/countries";
import { SearchAndFilter } from "@/components/ui/search-and-filter";
import { CountriesGrid } from "@/components/ui/countries-grid";

interface HomePageProps {
  initialCountries: Country[];
}

export function HomePage({ initialCountries }: HomePageProps) {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(initialCountries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "">("");
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar países basado en búsqueda y región
  const filterCountries = useCallback(() => {
    let filtered = countries;

    // Filtrar por región
    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (country) =>
          country.name.common.toLowerCase().includes(query) ||
          country.name.official.toLowerCase().includes(query) ||
          country.region.toLowerCase().includes(query) ||
          country.subregion?.toLowerCase().includes(query) ||
          country.capital?.[0]?.toLowerCase().includes(query)
      );
    }

    setFilteredCountries(filtered);
  }, [countries, searchQuery, selectedRegion]);

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    filterCountries();
  }, [filterCountries]);

  // Manejar búsqueda con llamada a la API
  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);

      if (query.trim()) {
        setIsLoading(true);
        try {
          const searchResults = await countryService.searchCountries(query);

          // Si hay resultados de búsqueda, usar esos; sino usar la lista completa filtrada
          if (searchResults.length > 0) {
            setCountries(searchResults);
          } else {
            // Si no hay resultados de la API, filtrar localmente
            filterCountries();
          }
        } catch (error) {
          console.error("Error searching countries:", error);
          // En caso de error, filtrar localmente
          filterCountries();
        } finally {
          setIsLoading(false);
        }
      } else {
        // Si no hay búsqueda, mostrar todos los países
        setCountries(initialCountries);
      }
    },
    [initialCountries, filterCountries]
  );

  // Manejar cambio de región
  const handleRegionChange = useCallback(
    async (region: Region | "") => {
      setSelectedRegion(region);
      setIsLoading(true);

      try {
        if (region) {
          const regionCountries = await countryService.getCountriesByRegion(
            region
          );
          setCountries(regionCountries);
        } else {
          setCountries(initialCountries);
        }
      } catch (error) {
        console.error("Error filtering by region:", error);
        // En caso de error, filtrar localmente
        filterCountries();
      } finally {
        setIsLoading(false);
      }
    },
    [initialCountries, filterCountries]
  );

  // Manejar click en país
  const handleCountryClick = useCallback(
    (country: Country) => {
      router.push(`/country/${country.cca3}`);
    },
    [router]
  );

  return (
    <div className="container  mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Search and Filter Section */}
      <div className="mb-12 ">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleRegionChange}
          searchQuery={searchQuery}
          selectedRegion={selectedRegion}
        />
      </div>

      {/* Countries Grid */}

      <CountriesGrid
        countries={filteredCountries}
        onCountryClick={handleCountryClick}
        isLoading={isLoading}
      />
    </div>
  );
}
