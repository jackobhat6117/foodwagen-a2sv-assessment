"use client";

import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FoodList } from "@/features/food-list/components/food-list";
import { FoodModal } from "@/features/food-management/components/food-modal";

import { useState } from "react";

export default function Home() {
const [searchInput, setSearchInput] = useState("");
  
  const [submittedSearch, setSubmittedSearch] = useState("");


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
    <div className="">

     <HeroSection
        searchQuery={searchInput}
        setSearchQuery={handleSearchChange}
        onSubmitSearch={handleSearchSubmit} 
      />
      <FoodList 
        searchTerm={submittedSearch} 
      />

       <FoodModal />
    </div>
  );
}


