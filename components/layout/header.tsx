
"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useFoodStore } from "@/lib/store/foodStore";


export const Header: React.FC = () => {
  const { openAddModal } = useFoodStore();

  return (
    <header   
      className="
        fixed top-0 left-0 right-0 z-50 
        flex items-center justify-between 
        bg-white shadow-md
        h-16 px-4 md:px-8
      "
    >
      <div className="food-header-logo flex items-center gap-2">
        <img 
          src="/assets/header-logo.png" 
          width={20} 
          height={20} 
          alt="FoodWagen Logo"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p className="text-lg font-bold text-[#F96222]">
          Food<span className="text-[#FFB310]">Wagen</span>
        </p>
      </div>
      <Button
        variant="primary"
        onClick={openAddModal}
        data-test-id="food-add-meal-btn"
      >
        Add Meal
      </Button>
    </header>
  );
};

Header.displayName = "Header";
