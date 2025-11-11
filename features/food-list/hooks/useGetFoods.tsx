// src/features/food-list/hooks/useGetFoods.ts

"use client";

import { apiClient } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { normalizeFood } from "@/lib/utils"; // Import the normalizer
import { ApiFood, CleanFood } from "@/types/types";


const FOODS_QUERY_KEY = ["foods"];
const SEARCH_QUERY_KEY = (query: string) => ["foods", "search", query];

export const useGetFoods = (searchQuery: string) => {
  // Fetch all foods
  const foodsQuery = useQuery({
    queryKey: FOODS_QUERY_KEY,
    queryFn: () => apiClient.getFoods(),
    staleTime: 1000 * 60 * 5,
    select: (rawFoods: ApiFood[]) => {
      return rawFoods.map(normalizeFood); 
    },
  });

  // Search foods
  const searchFoodsQuery = useQuery({
    queryKey: SEARCH_QUERY_KEY(searchQuery),
    queryFn: () => apiClient.searchFoods(searchQuery),
    enabled: !!searchQuery.trim(),
    staleTime: 1000 * 60 * 5,
    // Use 'select' here too
    select: (rawFoods: ApiFood[]) => {
      return rawFoods.map(normalizeFood); 
    },
  });

  // This logic is perfect and now returns CLEAN data
  const foods: CleanFood[] = searchQuery.trim() ? searchFoodsQuery.data || [] : foodsQuery.data || [];
  const isLoading = searchQuery.trim() ? searchFoodsQuery.isLoading : foodsQuery.isLoading;
  const error = searchQuery.trim() ? searchFoodsQuery.error : foodsQuery.error;

  return {
    foods,
    isLoading,
    error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
  };
};