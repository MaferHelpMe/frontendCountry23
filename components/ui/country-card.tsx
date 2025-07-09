"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { KeyboardEvent } from "react";
import { CountryCardProps } from "@/types/country";
import { formatPopulation } from "@/lib/api/countries";

export function CountryCard({ country, onClick }: CountryCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/20 focus:outline-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${country.name.common}`}
      onKeyDown={handleKeyDown}
    >
      {/* Flag Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">
          {country.name.common}
        </h3>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Population:</span>{" "}
          <span className="text-gray-600 dark:text-gray-400">
            {formatPopulation(country.population)}
          </span>
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Region:</span>{" "}
          <span className="text-gray-600 dark:text-gray-400">
            {country.region}
          </span>
        </p>
        {country.capital?.[0] && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Capital:</span>{" "}
            <span className="text-gray-600 dark:text-gray-400">
              {country.capital[0]}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
