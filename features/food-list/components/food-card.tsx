"use client"

import { Food } from "@/types/types"
import type React from "react"


interface FoodCardProps {
  food: Food
  onEdit: (food: Food) => void
  onDelete: (food: Food) => void
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const formattedPrice = food.price != null ? `$${food.price.toFixed(2)}` : "N/A"

  return (
    <article className="food-card" data-test-id={`food-card-${food.id}`}>
      <div className="food-card-image-wrapper">
        <img src={food.image || "/placeholder.svg"} alt={food.name} className="food-card-image" loading="lazy" />
        <span className="food-card-price">{formattedPrice}</span>
      </div>

      <div className="food-card-content">
        <h3 className="food-card-name">{food.name}</h3>

        <div className="food-card-restaurant">
          {food.restaurant?.logo && (
            <img
              src={food.restaurant.logo || "/placeholder.svg"}
              alt={food.restaurant.name}
              className="food-card-restaurant-logo"
            />
          )}
          <div className="food-card-restaurant-info">
            <p className="food-card-restaurant-name">{food.restaurant?.name || "Unknown Restaurant"}</p>
            <span className="food-card-rating">⭐ {food.rating}</span>
          </div>
        </div>

        <div className="food-card-status-bar">
          <span
            className={`food-card-status ${food.restaurant?.status === "Open Now" ? "open" : "closed"}`}
            data-test-id={`food-status-${food.id}`}
          >
            {food.restaurant?.status || "Unknown"}
          </span>
        </div>

        <div className="food-card-actions">
          <button
            onClick={() => onEdit(food)}
            className="food-card-action-btn edit"
            data-test-id={`food-edit-btn-${food.id}`}
            aria-label={`Edit ${food.name}`}
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(food)}
            className="food-card-action-btn delete"
            data-test-id={`food-delete-btn-${food.id}`}
            aria-label={`Delete ${food.name}`}
          >
            ✕
          </button>
        </div>
      </div>
    </article>
  )
}

FoodCard.displayName = "FoodCard"
