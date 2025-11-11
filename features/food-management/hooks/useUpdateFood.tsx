"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

import { toast } from "sonner";
import { FoodFormData } from "@/types/types";

const FOODS_QUERY_KEY = ["foods"];

export const useUpdateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // This is also simplified. The apiClient handles the data transformation.
    mutationFn: (variables: { id: string; data: FoodFormData }) =>
      apiClient.updateFood(variables.id, variables.data),
      
    onSuccess: () => {
      toast.success("Food item updated successfully!");
      // Invalidate the cache to refetch the list
      queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY });
    },
  });
};