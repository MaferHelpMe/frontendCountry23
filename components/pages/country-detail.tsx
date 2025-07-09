"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Country } from "@/types/country";
import {
  formatPopulation,
  getNativeName,
  getCurrencies,
  getLanguages,
} from "@/lib/api/countries";

interface CountryDetailProps {
  country: Country;
}

export function CountryDetail({ country }: CountryDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBack}
        className="mb-8 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
        aria-label="Go back to countries list"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </motion.button>

      {/* Country Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-8 lg:grid-cols-2 lg:gap-16"
      >
        {/* Flag */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Country Information */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
            {country.name.common}
          </h1>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Native Name:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {getNativeName(country)}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Population:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {formatPopulation(country.population)}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Region:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {country.region}
                </span>
              </div>

              {country.subregion && (
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Sub Region:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {country.subregion}
                  </span>
                </div>
              )}

              {country.capital && country.capital.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Capital:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {country.capital.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {country.tld && country.tld.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Top Level Domain:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {country.tld.join(", ")}
                  </span>
                </div>
              )}

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Currencies:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {getCurrencies(country)}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Languages:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {getLanguages(country)}
                </span>
              </div>
            </div>
          </div>

          {/* Border Countries */}
          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((borderCode) => (
                  <Link
                    key={borderCode}
                    href={`/country/${borderCode}`}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                  >
                    {borderCode}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
