"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"

const FOODS_QUERY_KEY = ["foods"]

export const useDeleteFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteFood(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY })
    },
  })
}
