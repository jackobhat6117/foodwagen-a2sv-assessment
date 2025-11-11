// src/testing/mocks/handlers.ts

import { http, HttpResponse } from "msw";

// Use the exact API URL from your project
const API_URL = "https://6852821e0594059b23cdd834.mockapi.io/Food";

// This is our mock data that the API will return
export const mockFoods = [
  {
    id: "1",
    name: "Mock Lasagna",
    image: "mock.png",
    Price: "12.99",
    rating: 4.5,
    restaurant: {
      name: "Mock Restaurant",
      logo: "mock-logo.png",
      status: "Open Now" as "Open Now" | "Closed",
    },
  },
  {
    id: "2",
    name: "Mock Pancake",
    image: "mock2.png",
    Price: "8.50",
    rating: 5,
    restaurant: {
      name: "Mock Cafe",
      logo: "mock-logo2.png",
      status: "Closed" as "Open Now" | "Closed",
    },
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