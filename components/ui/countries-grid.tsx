"use client";

import { Country } from "@/types/country";
import { CountryCard } from "./country-card";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useCallback } from "react";

interface CountriesGridProps {
  countries: Country[];
  onCountryClick: (country: Country) => void;
  isLoading?: boolean;
}

const SKELETON_COUNT = 8;

// 🎨 Estilos de la cuadrícula
const GRID_CLASSES = `
  grid
  grid-cols-1
  gap-6
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-4
`;

const CONTAINER_CLASSES = `
  px-6 
  py-10 
  sm:px-8 
  md:px-12 
  lg:px-16 
  xl:px-24 
  max-w-screen-2xl 
  mx-auto
`;

// 🔄 Skeleton de tarjeta
const CountryCardSkeleton = memo(function CountryCardSkeleton({
  index,
}: {
  index: number;
}) {
  return (
    <div
      key={index}
      className="animate-pulse overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 shadow"
      role="progressbar"
      aria-label="Loading country"
    >
      <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-600" />
      <div className="p-2 space-y-1">
        <div className="h-6 bg-gray-300 rounded dark:bg-gray-600" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-600" />
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-600" />
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-600" />
        </div>
      </div>
    </div>
  );
});

// 😢 Estado vacío
const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600 dark:text-gray-300">
      <div className="text-6xl mb-4" role="img" aria-label="Globe">
        🌍
      </div>
      <h3 className="text-xl font-semibold mb-2">No countries found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  );
});

// 🔄 Loading grid
const LoadingGrid = memo(function LoadingGrid() {
  const skeletonItems = useMemo(
    () =>
      Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <CountryCardSkeleton key={`skeleton-${index}`} index={index} />
      )),
    []
  );

  return (
    <div className={GRID_CLASSES} role="status" aria-label="Loading countries">
      {skeletonItems}
    </div>
  );
});

// 🔌 Lógica del grid
function useCountriesGrid(
  countries: Country[],
  onCountryClick: (country: Country) => void
) {
  const memoizedCountries = useMemo(() => countries, [countries]);

  const handleCountryClick = useCallback(
    (country: Country) => {
      onCountryClick(country);
    },
    [onCountryClick]
  );

  const countryElements = useMemo(
    () =>
      memoizedCountries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          onClick={() => handleCountryClick(country)}
        />
      )),
    [memoizedCountries, handleCountryClick]
  );

  return {
    countryElements,
    hasCountries: memoizedCountries.length > 0,
  };
}

// 🌍 Grid principal
export const CountriesGrid = memo(function CountriesGrid({
  countries,
  onCountryClick,
  isLoading = false,
}: CountriesGridProps) {
  const { countryElements, hasCountries } = useCountriesGrid(
    countries,
    onCountryClick
  );

  if (isLoading) return <LoadingGrid />;
  if (!hasCountries) return <EmptyState />;

  return (
    <section className={CONTAINER_CLASSES}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={GRID_CLASSES}
        role="grid"
        aria-label="Countries grid"
      >
        <AnimatePresence mode="popLayout">{countryElements}</AnimatePresence>
      </motion.div>
    </section>
  );
});
