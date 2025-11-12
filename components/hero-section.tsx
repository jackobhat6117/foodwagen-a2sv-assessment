"use client";

import React, { useState } from "react";
import { SearchBar } from "./search-bar";
import { Motorbike, Store } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmitSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmitSearch,
}) => {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery"
  );

  const getToggleClasses = (type: "delivery" | "pickup") => {
    const base =
      "flex-1 md:flex-none text-sm flex items-center justify-center gap-2 px-6 py-1 rounded-sm font-semibold transition-all duration-300";
    if (deliveryType === type) {
      return `${base} bg-[#FEF1E9] text-[#F17228] `;
    }
    return `${base} bg-transparent text-[#757575] hover:bg-white/50`;
  };

  return (
    <section
      className="food-hero w-full bg-[#f59e0b] py-16 mt-16 "
      data-test-id="food-hero-section"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="flex flex-col text-center text-white md:text-left">
          <h1 className="food-hero-title text-3xl font-bold leading-tight md:text-5xl">
            Are you starving?
          </h1>

          <p className="mb-5 md:text-sm text-[#FFFFFF] text-sm font-light -mt-3">
            Within a few clicks, find meals that are accessible near you
          </p>

          <div className="w-full rounded-2xl bg-white p-5 shadow-xl">
            <div className="food-delivery-toggle flex rounded-full bg-gray-100">
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
              onSubmitSearch={onSubmitSearch}
            />
          </div>
        </div>

        <div className="hidden w-full items-center justify-center md:flex">
          <div className="relative">
            <div
              className="absolute inset-0 -bottom-8 -z-10 transform scale-110 rounded-full bg-black/20 blur-2xl"
              style={{
                filter: "blur(40px)",
                opacity: 0.4,
              }}
            ></div>

            <Image
              src="/assets/hero-pan.png"
              width={400}
              height={400}
              alt="hero-pan-image"
              className="relative z-10"
              style={{
                filter: "drop-shadow(-30px 20px 40px rgba(0, 0, 0, 0.6))",
                maxWidth: "100%",
                height: "auto",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
