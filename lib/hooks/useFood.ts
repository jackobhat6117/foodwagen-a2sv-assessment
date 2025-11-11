// "use client"

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { apiClient } from "@/lib/api/client"

// import { useFoodStore } from "@/lib/store/foodStore"
// import { FoodFormData } from "@/types/types"

// const FOODS_QUERY_KEY = ["foods"]
// const SEARCH_QUERY_KEY = (query: string) => ["foods", "search", query]

// export const useFood = () => {
//   const queryClient = useQueryClient()
//   const { setFoods, setFilteredFoods, searchQuery } = useFoodStore()

//   // Fetch all foods
//   const foodsQuery = useQuery({
//     queryKey: FOODS_QUERY_KEY,
//     queryFn: () => apiClient.getFoods(),
//     staleTime: 1000 * 60 * 5,
//   })

//   // Search foods
//   const searchFoodsQuery = useQuery({
//     queryKey: SEARCH_QUERY_KEY(searchQuery),
//     queryFn: () => apiClient.searchFoods(searchQuery),
//     enabled: !!searchQuery.trim(),
//     staleTime: 1000 * 60 * 5,
//   })

//   // Create food mutation
//   const createFoodMutation = useMutation({
//     mutationFn: async (formData: FoodFormData) => {
//       const foodData = {
//         name: formData.food_name,
//         price: Number.parseFloat(formData.food_image.split(":")[0] || "0"),
//         rating: Number.parseFloat(formData.food_rating),
//         image: formData.food_image,
//         restaurant: {
//           name: formData.restaurant_name,
//           logo: formData.restaurant_logo,
//           status: formData.restaurant_status,
//         },
//       }
//       return apiClient.createFood(foodData)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY })
//     },
//   })

//   // Update food mutation
//   const updateFoodMutation = useMutation({
//     mutationFn: async ({ id, formData }: { id: string; formData: FoodFormData }) => {
//       const foodData = {
//         name: formData.food_name,
//         price: Number.parseFloat(formData.food_image.split(":")[0] || "0"),
//         rating: Number.parseFloat(formData.food_rating),
//         image: formData.food_image,
//         restaurant: {
//           name: formData.restaurant_name,
//           logo: formData.restaurant_logo,
//           status: formData.restaurant_status,
//         },
//       }
//       return apiClient.updateFood(id, foodData)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY })
//     },
//   })

//   // Delete food mutation
//   const deleteFoodMutation = useMutation({
//     mutationFn: (id: string) => apiClient.deleteFood(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: FOODS_QUERY_KEY })
//     },
//   })

//   // Get foods data - use search results if query exists, otherwise use all foods
//   const foods = searchQuery.trim() ? searchFoodsQuery.data || [] : foodsQuery.data || []
//   const isLoading = searchQuery.trim() ? searchFoodsQuery.isLoading : foodsQuery.isLoading
//   const error = searchQuery.trim() ? searchFoodsQuery.error : foodsQuery.error

//   return {
//     foods,
//     isLoading,
//     error: error ? (error instanceof Error ? error.message : "An error occurred") : null,
//     createFood: createFoodMutation.mutate,
//     createFoodAsync: createFoodMutation.mutateAsync,
//     updateFood: updateFoodMutation.mutate,
//     updateFoodAsync: updateFoodMutation.mutateAsync,
//     deleteFood: deleteFoodMutation.mutate,
//     deleteFoodAsync: deleteFoodMutation.mutateAsync,
//     isCreating: createFoodMutation.isPending,
//     isUpdating: updateFoodMutation.isPending,
//     isDeleting: deleteFoodMutation.isPending,
//   }
// }
