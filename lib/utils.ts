// src/lib/utils.ts

import { ApiFood, CleanFood } from "@/types/types";

/**
 * Transforms a "dirty" ApiFood object into a "clean" CleanFood object.
 * This function is updated to PRIORITIZE the nested 'restaurant' object.
 */
export const normalizeFood = (raw: ApiFood): CleanFood => {
  // --- (Price and Rating logic is the same) ---
  const price = parseFloat((raw.Price || raw.price || 0) as string);
  const rating = parseFloat((raw.rating || 0) as string);

  // --- THIS IS THE FIX ---
  let restaurantName = "Unknown Restaurant";
  let restaurantLogo = raw.logo || "/placeholder.svg"; // Default to root logo
  let restaurantStatus: "Open Now" | "Closed" = "Closed"; // Default

  // PRIORITY 1: Check for the nested 'restaurant' object first.
  if (raw.restaurant) {
    restaurantName = raw.restaurant.name;
    restaurantLogo = raw.restaurant.logo;
    // Handle *both* 'isOpen' and 'status' inside the nested object
    if (raw.restaurant.isOpen === true || raw.restaurant.status === "Open Now" || raw.restaurant.status === "Open") {
      restaurantStatus = "Open Now";
    }
  }
  // PRIORITY 2: Fallback to flat 'restaurantName'
  else if (raw.restaurantName) {
    restaurantName = raw.restaurantName;
    if (raw.status === "Open Now" || raw.status === "Open") {
      restaurantStatus = "Open Now";
    }
  }
  // PRIORITY 3: Fallback to your own created 'restaurant_name'
  else if (raw.restaurant_name) {
    restaurantName = raw.restaurant_name;
    if (raw.restaurant_status === "Open Now" || raw.restaurant_status === "Open") {
      restaurantStatus = "Open Now";
    }
  }
  // PRIORITY 4: Fallback to the root 'open' boolean
  else if (raw.open === true) {
    restaurantStatus = "Open Now";
  }
  // --- END OF FIX ---

  return {
    id: raw.id,
    name: raw.food_name || raw.name || "Unnamed Food",
    image: raw.food_image || raw.image || raw.avatar || "/placeholder.svg",
    Price: isNaN(price) ? 0 : price,
    rating: isNaN(rating) ? 0 : rating,
    restaurant: {
      name: restaurantName,
      logo: restaurantLogo,
      status: restaurantStatus,
    },
  };
};