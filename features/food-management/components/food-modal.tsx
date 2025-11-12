// src/features/food-management/components/FoodModal.tsx

"use client";

import type React from "react";

import { useUpdateFood } from "../hooks/useUpdateFood";
import { useDeleteFood } from "../hooks/useDeleteFood";
import { FoodForm } from "./food-form";

import { useAddFood } from "../hooks/useAddFood";
import { useFoodStore } from "@/lib/store/foodStore";
import { FoodFormData } from "@/types/types";


export const FoodModal: React.FC = () => {
  const { modal, closeModal } = useFoodStore();
  const addFoodMutation = useAddFood();
  const updateFoodMutation = useUpdateFood();
  const deleteFoodMutation = useDeleteFood();

  if (!modal.isOpen) return null;

  const handleFormSubmit = async (data: FoodFormData) => {
    if (modal.mode === "edit" && modal.foodItem) {
   
      await updateFoodMutation.mutateAsync({
        id: modal.foodItem.id,
        data: data, 
      });
   
    } else {
      await addFoodMutation.mutateAsync(data);
    }

    closeModal();
  };

  const handleDelete = async () => {
    if (modal.foodItem) {
      await deleteFoodMutation.mutateAsync(modal.foodItem.id);
      closeModal(); 
    }
  };

  const getModalTitle = () => {
    if (modal.mode === "add") return "Add Food";
    if (modal.mode === "edit") return "Edit Food";
    return "Delete Food";
  };

  return (
    <div
      className="food-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      data-test-id="food-modal-overlay"
    >
      <div className="food-modal-panel" data-test-id="food-modal-content">
        {/* <button
          onClick={closeModal}
          className="food-modal-close-btn"
          data-test-id="food-modal-close-btn"
          aria-label="Close modal"
        >
          ✕
        </button> */}

        <div className="food-modal-header">
          <h2 className="food-modal-title">{getModalTitle()}</h2>
        </div>

        {modal.mode === "delete" ? (
          <div className="food-delete-confirmation">
            <p className="food-delete-message">
              Are you sure you want to delete{" "}
              <strong>{modal.foodItem?.name}</strong>? This action cannot be
              undone.
            </p>
       
            <div className="food-form-actions">
                <button
                type="button"
                className="food-form-btn danger" 
                disabled={deleteFoodMutation.isPending}
                onClick={handleDelete}
                data-test-id="food-delete-confirm-btn"
              >
                {deleteFoodMutation.isPending ? "Deleting..." : "Yes"}
              </button>
              <button
                type="button"
                className="food-form-btn cancel"
                onClick={closeModal}
                data-test-id="food-delete-cancel-btn"
              >
                Cancel
              </button>
            
            </div>
          </div>
        ) : (
          <FoodForm
            initialData={modal.foodItem}
            onSubmit={handleFormSubmit}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

FoodModal.displayName = "FoodModal";