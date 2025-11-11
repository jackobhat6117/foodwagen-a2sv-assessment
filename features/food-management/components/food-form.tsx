

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { useFormValidation } from "@/lib/hooks/useFormValidation"; 
import { CleanFood, FoodFormData } from "@/types/types";

interface FoodFormProps {
  initialData?: CleanFood; 
  onSubmit: (data: FoodFormData) => Promise<void>;
  onClose: () => void; 
}

const initialFormData: FoodFormData = {
  food_name: "",
  food_rating: "",
  food_image: "",
  restaurant_name: "",
  restaurant_logo: "",
  restaurant_status: "Restaurant status (open/close)",
};

export const FoodForm: React.FC<FoodFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<FoodFormData>(initialFormData);
  const { errors, validate, clearError, clearErrors } = useFormValidation();
  

  const isEditMode = !!initialData;


  const mutation = useMutation({
    mutationFn: onSubmit,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        food_name: initialData.name,
        food_rating: initialData.rating.toString(),
        food_image: initialData.image,
        restaurant_name: initialData.restaurant.name,
        restaurant_logo: initialData.restaurant.logo,
        restaurant_status: initialData.restaurant.status,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      clearError(name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;
    try {
      await mutation.mutateAsync(formData);
      clearErrors();
      setFormData(initialFormData);
      onClose(); 
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-test-id="food-form" noValidate>
      {/* Food Name */}
      <div className="food-form-group">
        <label
          htmlFor="food_name"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Food name
        </label>
        <input
          type="text"
          id="food_name"
          name="food_name"
          value={formData.food_name}
          onChange={handleChange}
          placeholder="Food name" 
          className={`food-input ${errors.food_name ? "error" : ""}`}
          data-test-id="food-name-input"
          aria-describedby={errors.food_name ? "food_name-error" : undefined}
        />
        {errors.food_name && (
          <div id="food_name-error" className="food-error-message" data-test-id="food-name-error">
            {errors.food_name}
          </div>
        )}
      </div>

      {/* Food Rating */}
      <div className="food-form-group">
        <label
          htmlFor="food_rating"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Food rating
        </label>
        <input
          type="number"
          id="food_rating"
          name="food_rating"
          value={formData.food_rating}
          onChange={handleChange}
          placeholder="Food rating" 
          min="1"
          max="5"
          step="0.1"
          className={`food-input ${errors.food_rating ? "error" : ""}`}
          data-test-id="food-rating-input"
          aria-describedby={errors.food_rating ? "food_rating-error" : undefined}
        />
        {errors.food_rating && (
          <div id="food_rating-error" className="food-error-message" data-test-id="food-rating-error">
            {errors.food_rating}
          </div>
        )}
      </div>

      {/* Food Image URL */}
      <div className="food-form-group">
        <label
          htmlFor="food_image"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Food image (link)
        </label>
        <input
          type="url"
          id="food_image"
          name="food_image"
          value={formData.food_image}
          onChange={handleChange}
          placeholder="Food image (link)" 
          className={`food-input ${errors.food_image ? "error" : ""}`}
          data-test-id="food-image-input"
          aria-describedby={errors.food_image ? "food_image-error" : undefined}
        />
        {errors.food_image && (
          <div id="food_image-error" className="food-error-message" data-test-id="food-image-error">
            {errors.food_image}
          </div>
        )}
      </div>

      {/* Restaurant Name */}
      <div className="food-form-group">
        <label
          htmlFor="restaurant_name"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Restaurant name
        </label>
        <input
          type="text"
          id="restaurant_name"
          name="restaurant_name"
          value={formData.restaurant_name}
          onChange={handleChange}
          placeholder="Restaurant name" 
          className={`food-input ${errors.restaurant_name ? "error" : ""}`}
          data-test-id="restaurant-name-input"
          aria-describedby={errors.restaurant_name ? "restaurant_name-error" : undefined}
        />
        {errors.restaurant_name && (
          <div id="restaurant_name-error" className="food-error-message" data-test-id="restaurant-name-error">
            {errors.restaurant_name}
          </div>
        )}
      </div>

      {/* Restaurant Logo URL */}
      <div className="food-form-group">
        <label
          htmlFor="restaurant_logo"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Restaurant logo (link)
        </label>
        <input
          type="url"
          id="restaurant_logo"
          name="restaurant_logo"
          value={formData.restaurant_logo}
          onChange={handleChange}
          placeholder="Restaurant logo (link)" 
          className={`food-input ${errors.restaurant_logo ? "error" : ""}`}
          data-test-id="restaurant-logo-input"
          aria-describedby={errors.restaurant_logo ? "restaurant_logo-error" : undefined}
        />
        {errors.restaurant_logo && (
          <div id="restaurant_logo-error" className="food-error-message" data-test-id="restaurant-logo-error">
            {errors.restaurant_logo}
          </div>
        )}
      </div>

      {/* Restaurant Status */}
      <div className="food-form-group">
        <label
          htmlFor="restaurant_status"
          className={isEditMode ? 'food-label-visible' : 'food-label-hidden'}
        >
          Restaurant status (open/close)
        </label>
        <select
          id="restaurant_status"
          name="restaurant_status"
          value={formData.restaurant_status}
          onChange={handleChange}
          className={`food-select ${errors.restaurant_status ? "error" : ""}`}
          data-test-id="restaurant-status-select"
          aria-describedby={errors.restaurant_status ? "restaurant_status-error" : undefined}
        >
          <option value="Resturant Status">Resturant Status(Open/Close)</option>
          <option value="Open Now">Open Now</option>
          <option value="Closed">Closed</option>
        </select>
        {errors.restaurant_status && (
          <div id="restaurant_status-error" className="food-error-message" data-test-id="restaurant-status-error">
            {errors.restaurant_status}
          </div>
        )}
      </div>

      <div className="food-form-actions">
        <button
          type="button"
          onClick={onClose}
          className="food-form-btn cancel"
          data-test-id="food-form-cancel"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="food-form-btn primary"
          disabled={mutation.isPending}
          data-test-id="food-form-submit"
        >
          {mutation.isPending
            ? (initialData ? "Saving..." : "Adding...")
            : (isEditMode ? "Save" : "Add")}
        </button>
      </div>
    </form>
  );
};

FoodForm.displayName = "FoodForm";