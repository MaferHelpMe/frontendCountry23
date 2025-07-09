"use client";

import { Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Region } from "@/types/country";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (region: Region | "") => void;
  searchQuery: string;
  selectedRegion: Region | "";
}

const regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export function SearchAndFilter({
  onSearch,
  onFilterChange,
  searchQuery,
  selectedRegion,
}: SearchAndFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(localSearchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchQuery, onSearch]);

  const handleRegionSelect = (region: Region | "") => {
    onFilterChange(region);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-row gap-6 justify-between items-center w-full">
      {/* Search Input */}
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg bg-white py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 shadow-lg ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:ring-gray-700 dark:focus:ring-blue-400"
          aria-label="Search for a country"
        />
      </div>
      <div className="relative w-full max-w-xs"></div>
      {/* Region Filter Dropdown */}
      <div className="relative w-full max-w-xs">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-label="Filter by region"
        >
          <span>{selectedRegion || "Filter by Region"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <ul role="listbox" className="py-1">
              <li>
                <button
                  onClick={() => handleRegionSelect("")}
                  className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                  role="option"
                  aria-selected={selectedRegion === ""}
                >
                  All Regions
                </button>
              </li>
              {regions.map((region) => (
                <li key={region}>
                  <button
                    onClick={() => handleRegionSelect(region)}
                    className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                    role="option"
                    aria-selected={selectedRegion === region}
                  >
                    {region}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
