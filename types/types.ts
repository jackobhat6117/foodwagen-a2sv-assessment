// src/lib/types.ts

// This is the "dirty" data shape we get from the API
// (Based on your ApiItem)
export interface ApiFood {
  id: string;
  createdAt: string;
  name: string;
  avatar: string; // This is the main food image
  rating: string | number;
  open: boolean;
  logo: string; // This is the restaurant logo
  Price: string | number;
  image?: string;
  status?: "Open Now" | "Closed" | "Open";
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: "Open Now" | "Closed" | "Open";
  price?: number;
  type?: string;
}

// This is the "clean" data shape our components will use
export interface CleanFood {
  id: string;
  name: string;
  image: string;
  Price: number | number; // Always a number
  rating: number; // Always a number
  restaurant: {
    name: string;
    logo: string;
    status: "Open Now" | "Closed" | "Open";
  };
}

// Your existing form/modal types
export interface FoodFormData {
  food_name: string;
  food_rating: string;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed";
}

export interface FoodModalState {
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  foodItem?: CleanFood; // Use the clean type
}