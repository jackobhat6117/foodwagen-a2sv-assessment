"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

import { toast } from "sonner";
import { FoodFormData } from "@/types/types";

const FOODS_QUERY_KEY = ["foods"];

export const useAddFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // The mutation function is now much simpler.
    // It just passes the form data directly to the apiClient.
    mutationFn: (data: FoodFormData) => apiClient.createFood(data),
    
    // We add back the toast notification on success
    onSuccess: () => {
      toast.success("Food item created successfully!");
      queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY });
    },
  });
};