"use client"

import { FoodFormData, ValidationErrors } from "@/types/types"
// Custom hook for form validation
import { useState, useCallback } from "react"


const validateForm = (data: FoodFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.food_name.trim()) {
    errors["food_name"] = "Food Name is required"
  }

  if (!data.food_rating) {
    errors["food_rating"] = "Food Rating must be a number"
  } else {
    const rating = Number.parseFloat(data.food_rating)
    if (isNaN(rating) || rating < 1 || rating > 5) {
      errors["food_rating"] = "Food Rating must be between 1 and 5"
    }
  }

  if (!data.food_image.trim()) {
    errors["food_image"] = "Food Image URL is required"
  }

  if (!data.restaurant_name.trim()) {
    errors["restaurant_name"] = "Restaurant Name is required"
  }

  if (!data.restaurant_logo.trim()) {
    errors["restaurant_logo"] = "Restaurant Logo URL is required"
  }

  if (!data.restaurant_status || !["Open Now", "Closed"].includes(data.restaurant_status)) {
    errors["restaurant_status"] = "Restaurant Status must be 'Open Now' or 'Closed'"
  }

  return errors
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validate = useCallback((data: FoodFormData): boolean => {
    const validationErrors = validateForm(data)
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  return {
    errors,
    validate,
    clearErrors,
    clearError,
    setErrors,
  }
}
