

import React from "react";
import { render, screen } from "@/testing/test-utils";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach } from "vitest";
import { FoodForm } from "./food-form"; 

// Mock the dependencies
const mockSubmit = vi.fn(() => Promise.resolve());
const mockClose = vi.fn();

// Create a user instance for realistic event simulation
const user = userEvent.setup();

describe("FoodForm - User Interaction", () => {
  // Clear mock history before each test
  beforeEach(() => {
    mockSubmit.mockClear();
    mockClose.mockClear();
  });

  it("fills out and submits the form", async () => {
    render(<FoodForm onSubmit={mockSubmit} onClose={mockClose} />);

    // 1. Fill out the form using data-test-id
    await user.type(
      screen.getByTestId("food-name-input"),
      "New Test Meal",
    );
    await user.type(screen.getByTestId("food-rating-input"), "4.2");
    await user.type(
      screen.getByTestId("food-image-input"),
      "http://image.com/new.png",
    );
    await user.type(
      screen.getByTestId("restaurant-name-input"),
      "New Restaurant",
    );
    await user.type(
      screen.getByTestId("restaurant-logo-input"),
      "http://logo.com/new.png",
    );
    await user.selectOptions(
      screen.getByTestId("restaurant-status-select"),
      "Closed", 
    );

    // 2. Click the submit button
    await user.click(screen.getByTestId("food-form-submit"));

    // 3. Verify the mock function was called with the exact form data
    expect(mockSubmit).toHaveBeenCalledWith({
      food_name: "New Test Meal",
      food_rating: "4.2",
      food_image: "http://image.com/new.png",
      restaurant_name: "New Restaurant",
      restaurant_logo: "http://logo.com/new.png",
      restaurant_status: "Closed",
    });

    // 4. Verify the form closes on success
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});