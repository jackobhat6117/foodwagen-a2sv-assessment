"use client";

import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // 2. State for the *debounced* value (waits 500ms after user stops typing)
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  return (
    <div className="">
     <Header />
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Footer />
    </div>
  );
}
