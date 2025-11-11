// Zustand store for managing foods and UI state
import { ApiItem, Food, FoodModalState } from "@/types/types";
import { create } from "zustand";


interface FoodStoreState {
  // Data
  foods: Food[];
  filteredFoods: Food[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Modal state
  modal: FoodModalState;

  // Actions
  setFoods: (foods: Food[]) => void;
  setFilteredFoods: (foods: Food[]) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API data processing
  processApiData: (apiData: ApiItem[]) => void;

  // Modal actions
  openAddModal: () => void;
  openEditModal: (food: Food) => void;
  openDeleteModal: (food: Food) => void;
  closeModal: () => void;

  // Food operations
  addFood: (food: Food) => void;
  updateFood: (id: string, food: Food) => void;
  deleteFood: (id: string) => void;

  // Reset
  reset: () => void;
}

const initialModalState: FoodModalState = {
  isOpen: false,
  mode: "add",
};

// Helper function to normalize API data to Food type
const normalizeApiData = (apiData: ApiItem[]): Food[] => {
  return apiData.map((item): Food => {
    // Determine if this is primarily a food item or restaurant
    const hasFoodData = item.food_name || item.food_image;
    
    if (hasFoodData) {
      // This appears to be a food item with restaurant context
      return {
        id: item.id,
        name: item.food_name || item.name,
        Price: item.price || parseFloat(item.Price) || 0,
        rating: item.food_rating || (typeof item.rating === 'number' ? item.rating : parseFloat(item.rating as string) || 0),
        image: item.food_image || item.image || item.avatar,
        createdAt: item.createdAt,
        
        // Restaurant context
        restaurant: item.restaurant_name ? {
          id: item.id,
          name: item.restaurant_name,
          logo: item.restaurant_logo || item.logo,
          status: item.restaurant_status || (item.open ? "Open Now" : "Closed"),
          image: item.restaurant_image
        } : undefined,
        
        // Additional fields
        avatar: item.avatar,
        logo: item.logo,
        open: item.open,
        status: item.status,
        type: item.type,
        food_name: item.food_name,
        food_rating: item.food_rating,
        food_image: item.food_image,
        restaurant_name: item.restaurant_name,
        restaurant_image: item.restaurant_image,
        restaurant_status: item.restaurant_status
      };
    } else {
      // This appears to be a restaurant or generic item
      return {
        id: item.id,
        name: item.name,
        Price: parseFloat(item.Price) || 0,
        rating: typeof item.rating === 'number' ? item.rating : parseFloat(item.rating as string) || 0,
        image: item.image || item.avatar,
        createdAt: item.createdAt,
        
        // Restaurant context for itself
        restaurant: {
          id: item.id,
          name: item.name,
          logo: item.logo,
          status: item.status || (item.open ? "Open Now" : "Closed")
        },
        
        // Additional fields
        avatar: item.avatar,
        logo: item.logo,
        open: item.open,
        status: item.status,
        type: item.type
      };
    }
  });
};

export const useFoodStore = create<FoodStoreState>((set) => ({
  foods: [],
  filteredFoods: [],
  searchQuery: "",
  isLoading: false,
  error: null,
  modal: initialModalState,

  setFoods: (foods) => set({ foods }),
  setFilteredFoods: (foods) => set({ filteredFoods: foods }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  processApiData: (apiData) => {
    try {
      const normalizedFoods = normalizeApiData(apiData);
      set({ 
        foods: normalizedFoods,
        filteredFoods: normalizedFoods,
        error: null 
      });
    } catch (error) {
      set({ error: 'Failed to process API data' });
      console.error('Error processing API data:', error);
    }
  },

  openAddModal: () =>
    set({
      modal: { isOpen: true, mode: "add" },
    }),
  openEditModal: (food) =>
    set({
      modal: { isOpen: true, mode: "edit", foodItem: food },
    }),
  openDeleteModal: (food) =>
    set({
      modal: { isOpen: true, mode: "delete", foodItem: food },
    }),
  closeModal: () =>
    set({
      modal: initialModalState,
    }),

  addFood: (food) =>
    set((state) => ({
      foods: [food, ...state.foods],
      filteredFoods: [food, ...state.filteredFoods],
    })),
  updateFood: (id, food) =>
    set((state) => ({
      foods: state.foods.map((f) => (f.id === id ? food : f)),
      filteredFoods: state.filteredFoods.map((f) => (f.id === id ? food : f)),
    })),
  deleteFood: (id) =>
    set((state) => ({
      foods: state.foods.filter((f) => f.id !== id),
      filteredFoods: state.filteredFoods.filter((f) => f.id !== id),
    })),

  reset: () =>
    set({
      foods: [],
      filteredFoods: [],
      searchQuery: "",
      isLoading: false,
      error: null,
      modal: initialModalState,
    }),
}));