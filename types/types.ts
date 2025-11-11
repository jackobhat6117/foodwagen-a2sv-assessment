// src/lib/types.ts

// This is the "dirty" data shape we get from the API
export interface ApiFood {
  id: string;
  createdAt: string;
  name: string;
  avatar: string; // Main food image
  rating: string | number;
  open: boolean;
  logo: string; // Restaurant logo
  Price: string;
  image?: string;
  price?: number;
  type?: string;

  // --- THIS IS THE UPDATE ---
  // The API is sending a nested object, so we add it here.
  // We make it optional (`?`) because some items might not have it.
  restaurant?: {
    name: string;
    logo: string;
    status?: "Open Now" | "Closed" | "Open"; // Can have 'status'
    isOpen?: boolean; // Can have 'isOpen'
  };
  // --- END OF UPDATE ---
  
  // Flat properties (which we will treat as fallbacks)
  restaurantName?: string;
  status?: "Open Now" | "Closed" | "Open";
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: "Open Now" | "Closed" | "Open";
}

// This is the "clean" data shape our components will use
export interface CleanFood {
  id: string;
  name: string;
  image: string;
  Price: number; // Always a number
  rating: number; // Always a number
  restaurant: {
    name: string;
    logo: string;
    status: "Open Now" | "Closed"; // Strict type
  };
}

// --- FORM & MODAL TYPES ---

export interface FoodFormData {
  food_name: string;
  food_rating: string;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed";
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FoodModalState {
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  foodItem?: CleanFood; // Use the clean type
}