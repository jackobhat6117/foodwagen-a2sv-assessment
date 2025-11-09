// Header component
"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Header: React.FC = () => {
  const openAddModal = () => {
    console.log('open modal test')
  }

  return (
    <header className="food-header">
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
