// src/testing/mocks/handlers.ts

import { http, HttpResponse } from "msw";

// Use the exact API URL from your project
const API_URL = "https://6852821e0594059b23cdd834.mockapi.io/Food";

// This is our mock data that the API will return
// Matches the actual API response structure
export const mockFoods = [
  {
    createdAt: "2025-11-11T20:33:21.701Z",
    name: "Practical Metal Car updated",
    avatar: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    rating: 4,
    open: false,
    logo: "https://avatars.githubusercontent.com/u/28505455",
    Price: "815.80",
    id: "26",
    food_name: "fqdfv",
    food_rating: 4,
    food_image: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    restaurant_name: "sqffdqcdqc",
    restaurant_logo: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    restaurant_status: "Closed",
    price: "77.6",
    image: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    restaurantName: "Mr. Bison ",
  },
  {
    createdAt: "2025-11-11T15:05:07.301Z",
    name: "Practical Metal Car",
    avatar: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    rating: 3,
    open: true,
    logo: "https://avatars.githubusercontent.com/u/28505455",
    Price: "149.99",
    id: "27",
    price: "77",
    image: "https://picsum.photos/seed/y4m1F93F/3905/1677?blur=7",
    restaurantName: "Mr. Bison",
  },
  {
    createdAt: "2025-11-12T01:38:42.672Z",
    name: "Licensed Steel Chips",
    avatar: "https://picsum.photos/seed/r4ukSAG2/2398/1755?blur=10",
    rating: "474",
    open: true,
    logo: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/20.jpg",
    Price: "356.59",
    id: "30",
    price: "0.00",
    food_name: "Thai Green Coconut",
    food_rating: "3",
    food_image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    restaurant_name: "Mr. Bison",
    restaurant_logo: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=120&q=60",
    restaurant_status: "Open Now",
  },
];

// Define request handlers
export const handlers = [
  // Mocks the "Get All Foods" request
  http.get(API_URL, () => {
    return HttpResponse.json(mockFoods);
  }),

  // Mocks the "Add Food" request
  http.post(API_URL, async ({ request }) => {
    const newFood = await request.json();
    // Return a mock response, merging the new food with a mock ID
    return HttpResponse.json({ ...(newFood as object), id: "99" }, { status: 201 });
  }),
];

// This handler is for the API error test
export const errorHandlers = [
  http.get(API_URL, () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }),
];