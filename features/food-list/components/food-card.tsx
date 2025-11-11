"use client";

import { Food } from "@/types/types"; // Using your type path
import type React from "react";
// Import new state hooks and icons
import { useState, useRef, useEffect } from "react";
import { Tag, MoreVertical, Edit, Trash2 } from "lucide-react";

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (food: Food) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formattedPrice = food.Price
    ? `$${parseFloat(food.Price as any).toFixed(2)}`
    : "N/A";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleEdit = () => {
    onEdit(food);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete(food);
    setIsMenuOpen(false); 
  };

  return (
    <article className="food-card" data-test-id={`food-card-${food.id}`}>
      <div className="food-card-image-wrapper">
        <img
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          className="food-card-image"
          loading="lazy"
        />
        <span className="food-card-price">
          <Tag size={14} />
          {formattedPrice}
        </span>
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
            <p className="food-card-restaurant-name">
              {food.restaurant?.name || "Unknown Restaurant"}
            </p>
            <span className="food-card-rating">⭐ {food.rating}</span>
          </div>
        </div>

        <div className="food-card-status-bar">
          <span
            className={`food-card-status ${
              food.restaurant?.status === "Open Now" ? "open" : "closed"
            }`}
            data-test-id={`food-status-${food.id}`}
          >
            {food.restaurant?.status || "Unknown"}
          </span>
        </div>

        <div className="food-card-actions" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="food-card-menu-btn"
            data-test-id={`food-menu-btn-${food.id}`}
            aria-label="Open actions menu"
          >
            <MoreVertical size={18} />
          </button>


          {isMenuOpen && (
            <div
              className="food-card-dropdown-menu"
              data-test-id={`food-menu-dropdown-${food.id}`}
            >
              <button
                onClick={handleEdit}
                className="food-dropdown-item edit"
                data-test-id={`food-edit-btn-${food.id}`}
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="food-dropdown-item delete"
                data-test-id={`food-delete-btn-${food.id}`}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
     
      </div>
    </article>
  );
};

FoodCard.displayName = "FoodCard";