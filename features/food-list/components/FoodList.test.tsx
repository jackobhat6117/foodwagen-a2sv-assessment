

import React from "react";
import { render, screen } from "@/testing/test-utils";
import { FoodList } from "./food-list"; 
import { server } from "@/testing/mocks/server";
import { errorHandlers, mockFoods } from "@/testing/mocks/handlers";
import "@testing-library/jest-dom";



describe("FoodList - API Mocking", () => {


  it("shows a loading state and then displays fetched meals", async () => {
    render(<FoodList searchTerm={""} />);


    expect(screen.getByTestId("food-list-loading")).toBeInTheDocument();


    expect(
      await screen.findByText(mockFoods[0].name),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(mockFoods[1].name), 
    ).toBeInTheDocument();


    expect(
      screen.queryByTestId("food-list-loading"),
    ).not.toBeInTheDocument();
  });


  it("shows an error message when the API call fails", async () => {

    server.use(...errorHandlers);

    render(<FoodList searchTerm={""} />);

    // 1. Wait for the error message to be displayed
    const errorMessage = await screen.findByTestId("food-list-error");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Error loading meals");

    // 2. Check that no food items are rendered
    expect(
      screen.queryByText(mockFoods[0].name),
    ).not.toBeInTheDocument();
  });
});