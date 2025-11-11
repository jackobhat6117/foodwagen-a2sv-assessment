import { ApiFood, FoodFormData } from "@/types/types";

const BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

export const apiClient = {
  // ... (getFoods and searchFoods are the same) ...
  async getFoods(): Promise<ApiFood[]> {
    const response = await fetch(`${BASE_URL}/Food`);
    if (!response.ok) throw new Error("Failed to fetch foods");
    return response.json();
  },

  async searchFoods(searchParam: string): Promise<ApiFood[]> {
    const response = await fetch(`${BASE_URL}/Food?name=${searchParam}`);
    if (!response.ok) throw new Error("Failed to search foods");
    return response.json();
  },

  // --- THIS IS THE UPDATED FUNCTION ---
  async createFood(data: FoodFormData) {
    // Create a new payload that matches the API's nested structure
    const apiPayload = {
      // Food data (the API seems to accept 'name' and 'image')
      name: data.food_name,
      image: data.food_image,
      rating: parseFloat(data.food_rating),
      Price: "0", // The form doesn't have a price, so we send a default
      avatar: data.food_image, // Send avatar as well, just in case

      // Restaurant data - NESTED, as the API expects
      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        isOpen: data.restaurant_status === "Open Now",
      },
    };

    const response = await fetch(`${BASE_URL}/Food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload), // Send the new nested payload
    });
    if (!response.ok) throw new Error("Failed to create food");
    return response.json();
  },

  // --- THIS IS THE UPDATED FUNCTION ---
  async updateFood(id: string, data: FoodFormData) {
    // Create the same nested payload for updates
    const apiPayload = {
      name: data.food_name,
      image: data.food_image,
      rating: parseFloat(data.food_rating),
      avatar: data.food_image,

      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        isOpen: data.restaurant_status === "Open Now",
      },
    };

    const response = await fetch(`${BASE_URL}/Food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload), // Send the new nested payload
    });
    if (!response.ok) throw new Error("Failed to update food");
    return response.json();
  },
  // --- END OF UPDATES ---

  async deleteFood(id: string) {
    const response = await fetch(`${BASE_URL}/Food/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete food");
    return response.json();
  },
};