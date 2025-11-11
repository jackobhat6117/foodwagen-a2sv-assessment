// Header component
"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useFoodStore } from "@/lib/store/foodStore"

export const Header: React.FC = () => {

     const { openAddModal } = useFoodStore()
  

  return (
    <header className="food-header fixed w-full z-50 lg:mb-10">
      <div className="food-header-logo">
        <Image src="/assets/MasK Group.png" width={20} height={20} alt=""/>
        <p className="text-[#F96222]">Food<span className="text-[#FFB310]">Wagen</span></p>
      </div>
      <Button variant="primary" onClick={openAddModal} data-test-id="food-add-meal-btn">
        Add Meal
      </Button>
    </header>
  )
}

Header.displayName = "Header"


