"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useFoodStore } from "@/lib/store/foodStore"
import { Button } from "@/components/ui/button"
import { useGetFoods } from "../hooks/useGetFoods"
import { FoodCard } from "./food-card"

export const FoodList: React.FC = () => {
  const { openEditModal, openDeleteModal, searchQuery } = useFoodStore()
  const { foods, isLoading, error } = useGetFoods(searchQuery)
  const [displayCount, setDisplayCount] = useState(8)

  const displayedFoods = foods.slice(0, displayCount)
  const hasMore = displayCount < foods.length

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + 8)
  }, [])

  if (isLoading && displayedFoods.length === 0) {
    return (
      <section className="food-featured-meals" data-test-id="food-featured-meals">
        <h2 style={{ textAlign: "center" }}>Loading meals...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="food-featured-meals" data-test-id="food-featured-meals">
        <div className="empty-state-message">
          <h2>Error loading meals</h2>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  if (displayedFoods.length === 0) {
    return (
      <section className="food-featured-meals" data-test-id="food-featured-meals">
        <div className="empty-state-message">
          <h2>No items available</h2>
          <p>Try searching for different meals</p>
        </div>
      </section>
    )
  }

  return (
    <section className="food-featured-meals" data-test-id="food-featured-meals">
      <div style={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Featured Meals
        </h2>

        <div className="food-grid">
          {displayedFoods.map((food:any) => (
            <FoodCard
              key={food.id}
              food={food}
              onEdit={() => openEditModal(food)}
              onDelete={() => openDeleteModal(food)}
            />
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Button variant="primary" onClick={handleLoadMore} isLoading={isLoading} data-test-id="food-load-more-btn">
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

FoodList.displayName = "FoodList"
