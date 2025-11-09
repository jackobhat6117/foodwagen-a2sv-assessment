// Base interface with common fields
interface BaseItem {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  rating: string | number;
  open: boolean;
  logo: string;
  Price: string;
}

// Restaurant-specific fields
export interface Restaurant {
  id?: string;
  name: string;
  logo: string;
  status: "Open Now" | "Closed" | "Open";
  image?: string;
}

// Food item with restaurant context
export interface Food {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant?: Restaurant;
  createdAt?: string;
  
  avatar?: string;
  logo?: string;
  open?: boolean;
  status?: "Open Now" | "Closed" | "Open";
  type?: string;
  
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_image?: string;
  restaurant_status?: "Open Now" | "Closed" | "Open";
  restaurant_logo?: string;
}

// API response item type
export type ApiItem = BaseItem & {
  image?: string;
  status?: "Open Now" | "Closed" | "Open";
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_image?: string;
  restaurant_status?: "Open Now" | "Closed" | "Open";
  price?: number;
  type?: string;
  restaurant_logo?: string;
}

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
  foodItem?: Food;
}