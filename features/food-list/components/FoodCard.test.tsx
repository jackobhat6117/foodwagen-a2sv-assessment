import React from "react";
import { render, screen } from "@/testing/test-utils"; 
import { FoodCard } from "./food-card"; 
import { CleanFood } from "@/types/types";
import { vi } from "vitest";


const mockFood: CleanFood = {
  id: "1",
  name: "Test Lasagna",
  image: "test.png",
  Price: 15.99,
  rating: 4.7,
  restaurant: {
    name: "Test Restaurant",
    logo: "test-logo.png",
    status: "Open Now",
  },
};

const mockEdit = vi.fn();
const mockDelete = vi.fn();

describe("FoodCard - Component Rendering", () => {
  it("renders all food properties correctly", () => {
    render(
      <FoodCard food={mockFood} onEdit={mockEdit} onDelete={mockDelete} />,
    );

    // Verify name, price, and rating are displayed
    expect(screen.getByText("Test Lasagna")).toBeInTheDocument();
    expect(screen.getByText("$15.99")).toBeInTheDocument(); 
    expect(screen.getByText("⭐ 4.7")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant")).toBeInTheDocument();

    // Verify using the required data-test-id convention (component uses data-test-id with hyphen)
    expect(screen.getByTestId("food-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("food-status-1")).toHaveTextContent("Open Now");
    expect(screen.getByTestId("food-status-1")).toHaveClass("open");
  });
});