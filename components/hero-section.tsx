"use client";

import React, { useState } from "react";
import { SearchBar } from "./search-bar";
import { Motorbike, Store } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const getToggleClasses = (type: "delivery" | "pickup") => {
    const base =
      "flex items-center justify-center gap-2 px-6 py-1 rounded-sm font-semibold transition-all duration-300";
    if (deliveryType === type) {
      return `${base} bg-[#FEF1E9] text-[#F17228] `;
    }
    return `${base} bg-transparent text-[#757575] hover:bg-white/50`;
  };

  return (
    <section
      className="food-hero w-full bg-[#f59e0b] py-10 md:py-24"
      data-test-id="food-hero-section"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="flex flex-col text-center text-white md:text-left">
          <h1 className="food-hero-title text-4xl font-bold leading-tight md:text-5xl">
            Are you starving?
          </h1>
          <p className="mb-8 text-sm md:text-xl">
            Within a few clicks, find meals that are accessible near you
          </p>

          <div className="w-full rounded-2xl bg-white p-5 shadow-xl">
            <div className="delivery-toggle flex rounded-full bg-gray-100">
              <button
                className={getToggleClasses("delivery")}
                onClick={() => setDeliveryType("delivery")}
                data-test-id="delivery-toggle"
              >
                <Motorbike size={20} />
                Delivery
              </button>
              <button
                className={getToggleClasses("pickup")}
                onClick={() => setDeliveryType("pickup")}
                data-test-id="pickup-toggle"
              >
                <Store size={20} />
                Pickup
              </button>
            </div>

            <hr className="my-4 border-gray-100" />

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <div className="hidden w-full items-center justify-center md:flex">
          <div className="relative">
            <div 
              className="absolute inset-0 -bottom-8 -z-10 transform scale-110 rounded-full bg-black/20 blur-2xl"
              style={{
                filter: 'blur(40px)',
                opacity: 0.4
              }}
            ></div>
            <Image 
              src="/assets/image Base.png"
              width={500}
              height={500}
              alt="hero-pan-image"
              className="relative z-10"
              style={{
                filter: 'drop-shadow(0 40px 50px rgba(0, 0, 0, 0.7))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";