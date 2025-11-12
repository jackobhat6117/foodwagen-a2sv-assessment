"use client";

import { HeroSection } from "@/components/hero-section";
import { FoodList } from "@/features/food-list/components/food-list";
import dynamic from "next/dynamic"; // 1. Import dynamic
import { useState } from "react";
import { useFoodStore } from "@/lib/store/foodStore"; 


const DynamicFoodModal = dynamic(
 
  () => import("@/features/food-management/components/food-modal").then((mod) => mod.FoodModal),
  { 
    ssr: false, 
    loading: () => <div className="food-modal-backdrop-loading" />
  }
);

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  
  const { modal } = useFoodStore(); 
  const isOpen = modal.isOpen;


  const handleSearchSubmit = () => {
    setSubmittedSearch(searchInput);
  };

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    if (query === "") {
      setSubmittedSearch("");
    }
  };
 
  return (
    <> 
     <HeroSection
        searchQuery={searchInput}
        setSearchQuery={handleSearchChange}
        onSubmitSearch={handleSearchSubmit} 
      />
      <FoodList 
        searchTerm={submittedSearch} 
      />
       {isOpen && <DynamicFoodModal />}
    </>
  );
}