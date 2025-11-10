"use client"

import type React from "react"
import { useCallback } from "react"
import { useFoodStore } from "@/lib/store/foodStore"

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFoodStore()

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
    },
    [setSearchQuery],
  )

  return (
    <div className="food-search-container">
      <input
        type="text"
        className="food-search-input"
        placeholder="What do you like to eat today?"
        value={searchQuery}
        onChange={handleSearch}
        data-test-id="food-search-input"
        aria-label="Search for food"
      />
    </div>
  )
}

SearchBar.displayName = "SearchBar"
