// Zustand store for managing foods and UI state

import { ApiFood, CleanFood, FoodModalState } from "@/types/types";
import { create } from "zustand";


interface FoodStoreState {
  // Data
  foods: CleanFood[];
  filteredFoods: CleanFood[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Modal state
  modal: FoodModalState;

  // Actions
  setFoods: (foods: CleanFood[]) => void;
  setFilteredFoods: (foods: CleanFood[]) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API data processing
  processApiData: (apiData: ApiFood[]) => void;

  // Modal actions
  openAddModal: () => void;
  openEditModal: (food: CleanFood) => void;
  openDeleteModal: (food: CleanFood) => void;
  closeModal: () => void;

  // Food operations
  addFood: (food: CleanFood) => void;
  updateFood: (id: string, food: CleanFood) => void;
  deleteFood: (id: string) => void;

  // Reset
  reset: () => void;
}

const initialModalState: FoodModalState = {
  isOpen: false,
  mode: "add",
};


const normalizeApiData = (apiData: ApiFood[]): CleanFood[] => {
  return apiData.map((raw): CleanFood => {

    const price = parseFloat((raw.Price || raw.price || 0) as string);
    

    const rating = parseFloat((raw.food_rating || raw.rating || 0) as string);

  
    let status: "Open Now" | "Closed" = "Closed"; 
    if (
      raw.restaurant_status === "Open Now" ||
      raw.status === "Open" || 
      raw.open === true
    ) {
      status = "Open Now";
    }

  
    return {
      id: raw.id,
      name: raw.food_name || raw.name || "Unnamed Food",
      image: raw.food_image || raw.avatar || "/placeholder.svg",
      Price: isNaN(price) ? 0 : price,
      rating: isNaN(rating) ? 0 : rating,
      restaurant: { 
        name: raw.restaurant_name || "Unknown Restaurant",
        logo: raw.restaurant_logo || raw.logo || "/placeholder.svg",
        status: status, 
      },
    };
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