// src/lib/types.ts


export interface ApiFood {
  id: string;
  createdAt: string;
  name: string;
  avatar: string; 
  rating: string | number;
  open: boolean;
  logo: string; 
  Price: string;
  image?: string;
  price?: number;
  type?: string;


  restaurant?: {
    name: string;
    logo: string;
    status?: "Open Now" | "Closed" | "Open"; 
    isOpen?: boolean; 
  };
  
  restaurantName?: string;
  status?: "Open Now" | "Closed" | "Open";
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: "Open Now" | "Closed" | "Open";
}


export interface CleanFood {
  id: string;
  name: string;
  image: string;
  Price: number;
  rating: number; 
  restaurant: {
    name: string;
    logo: string;
    status: "Open Now" | "Closed"; 
  };
}

// --- FORM & MODAL TYPES ---

export interface FoodFormData {
  food_name: string;
  food_rating: string;
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed" | "Restaurant status (open/close)";
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FoodModalState {
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  foodItem?: CleanFood; 
}