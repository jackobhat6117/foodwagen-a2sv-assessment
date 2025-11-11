"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";

const FOODS_QUERY_KEY = ["foods"];

export const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteFood(id),
    
    onSuccess: () => {
      toast.success("Food item deleted.");
      // Invalidate the cache to refetch the list
      queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY });
    },
  });
};