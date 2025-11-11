import { ApiFood, FoodFormData } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = {
 
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


  async createFood(data: FoodFormData) {
    
    const apiPayload = {
    
      name: data.food_name,
      image: data.food_image,
      rating: parseFloat(data.food_rating),
      Price: "0", 
      avatar: data.food_image, 

     
      restaurant: {
        name: data.restaurant_name,
        logo: data.restaurant_logo,
        isOpen: data.restaurant_status === "Open Now",
      },
    };

    const response = await fetch(`${BASE_URL}/Food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload), 
    });
    if (!response.ok) throw new Error("Failed to create food");
    return response.json();
  },


  async updateFood(id: string, data: FoodFormData) {

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
      body: JSON.stringify(apiPayload), 
    });
    if (!response.ok) throw new Error("Failed to update food");
    return response.json();
  },
 

  async deleteFood(id: string) {
    const response = await fetch(`${BASE_URL}/Food/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete food");
    return response.json();
  },
};