import { Country, Region, CountryService } from "@/types/country";

const BASE_URL = "https://restcountries.com/v3.1";

// Cache simple para optimizar las llamadas a la API
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

const fetcher = async (url: string): Promise<any> => {
  const cachedData = getCachedData(url);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidar cada hora en el cache de Next.js
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCachedData(url, data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const countryService: CountryService = {
  getAllCountries: async (): Promise<Country[]> => {
    const url = `${BASE_URL}/all?fields=name,capital,region,subregion,population,flags,cca3,cca2`;
    return fetcher(url);
  },

  getCountryByCode: async (code: string): Promise<Country> => {
    const url = `${BASE_URL}/alpha/${code}`;
    const countries = await fetcher(url);
    return countries[0];
  },

  getCountriesByRegion: async (region: Region): Promise<Country[]> => {
    const url = `${BASE_URL}/region/${region}?fields=name,capital,region,subregion,population,flags,cca3,cca2`;
    return fetcher(url);
  },

  searchCountries: async (name: string): Promise<Country[]> => {
    if (!name.trim()) {
      return [];
    }
    const url = `${BASE_URL}/name/${encodeURIComponent(
      name
    )}?fields=name,capital,region,subregion,population,flags,cca3,cca2`;
    try {
      return await fetcher(url);
    } catch (error) {
      // Si no encuentra resultados, la API devuelve 404
      return [];
    }
  },
};

// Función helper para formatear números
export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat("en-US").format(population);
};

// Función helper para obtener el nombre nativo de un país
export const getNativeName = (country: Country): string => {
  if (!country.name.nativeName) return country.name.common;

  const nativeNames = Object.values(country.name.nativeName);
  return nativeNames[0]?.common || country.name.common;
};

// Función helper para obtener las monedas
export const getCurrencies = (country: Country): string => {
  if (!country.currencies) return "N/A";

  return Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(", ");
};

// Función helper para obtener los idiomas
export const getLanguages = (country: Country): string => {
  if (!country.languages) return "N/A";

  return Object.values(country.languages).join(", ");
};
