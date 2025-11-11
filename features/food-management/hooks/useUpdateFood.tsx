"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { FoodFormData } from "@/types/types"


const FOODS_QUERY_KEY = ["foods"]

export const useUpdateFood = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FoodFormData }) => {
      const foodData = {
        name: formData.food_name,
        price: Number.parseFloat(formData.food_image.split(":")[0] || "0"),
        rating: Number.parseFloat(formData.food_rating),
        image: formData.food_image,
        restaurant: {
          name: formData.restaurant_name,
          logo: formData.restaurant_logo,
          status: formData.restaurant_status,
        },
      }
      return apiClient.updateFood(id, foodData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY })
    },
  })
}
