// src/lib/utils.ts

import { ApiFood, CleanFood } from "@/types/types";



/**
 * Transforms a "dirty" ApiFood object into a "clean" CleanFood object.
 */
export const normalizeFood = (raw: ApiFood): CleanFood => {
  // Handle inconsistent price (Capital P string, lowercase p number)
  const price = parseFloat((raw.Price || raw.price || 0) as string);
  
  // Handle inconsistent rating (string or number)
  const rating = parseFloat((raw.food_rating || raw.rating || 0) as string);

  // Handle inconsistent status (boolean 'open' or string 'status')
  let status: "Open Now" | "Closed" | "Open" = "Closed";
  if (
    raw.restaurant_status === "Open Now" ||
    raw.status === "Open" ||
    raw.open === true
  ) {
    status = "Open Now";
  } else if (raw.restaurant_status === "Closed" || raw.status === "Closed") {
    status = "Closed";
  }

  return {
    id: raw.id,
    // Prioritize specific 'food_' fields, fall back to base fields
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
};