"use client"

import { apiClient } from "@/lib/api/client"
import { useQuery } from "@tanstack/react-query"


const FOODS_QUERY_KEY = ["foods"]
const SEARCH_QUERY_KEY = (query: string) => ["foods", "search", query]

export const useGetFoods = (searchQuery: string) => {
  // Fetch all foods
  const foodsQuery = useQuery({
    queryKey: FOODS_QUERY_KEY,
    queryFn: () => apiClient.getFoods(),
    staleTime: 1000 * 60 * 5,
  })

  // Search foods
  const searchFoodsQuery = useQuery({
    queryKey: SEARCH_QUERY_KEY(searchQuery),
    queryFn: () => apiClient.searchFoods(searchQuery),
    enabled: !!searchQuery.trim(),
    staleTime: 1000 * 60 * 5,
  })

  const foods = searchQuery.trim() ? searchFoodsQuery.data || [] : foodsQuery.data || []
  const isLoading = searchQuery.trim() ? searchFoodsQuery.isLoading : foodsQuery.isLoading
  const error = searchQuery.trim() ? searchFoodsQuery.error : foodsQuery.error

  return {
    foods,
    isLoading,
    error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
  }
}
