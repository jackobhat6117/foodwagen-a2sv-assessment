

"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmitSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmitSearch,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch();
  };

  return (
    <form
     
      className="food-search-form flex w-full flex-col items-center gap-3 md:flex-row"
      onSubmit={handleSubmit}
      data-test-id="food-search-form"
    >
      <div className="food-search-container group flex w-full flex-1 items-center rounded-lg bg-gray-100 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500">
        <Search className="ml-3 h-5 w-5 shrink-0 text-[#F17228]" />
        <input
          type="text"
          className="food-search-input w-full flex-1 bg-transparent p-3 text-base  placeholder-[#9E9E9E] outline-none"
          placeholder="What do you like to eat today?"
          value={searchQuery}
          onChange={handleSearch}
          name="food_search" 
          data-test-id="food-search-input"
          aria-label="Search for food"
        />
      </div>
    
      <button
        type="submit"
     
        className="food-btn-find-meal w-full shrink-0 flex items-center justify-center gap-3 rounded-md bg-linear-to-r from-[#FF7A7A] to-[#F65900] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 md:w-auto"
        data-test-id="search-submit"
      >
        <Search className="h-4 w-4 shrink-0 font-bold" />
        Find Meal
      </button>
    </form>
  );
};

SearchBar.displayName = "SearchBar";