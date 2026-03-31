"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const categories = [
  { id: "all", label: "推荐" },
  { id: "pokemon", label: "宝可梦" },
  { id: "sports", label: "球星卡" },
  { id: "yugioh", label: "游戏王" },
  { id: "onepiece", label: "海贼王" },
  { id: "mtg", label: "万智牌" },
]

interface CategoryTabsProps {
  onCategoryChange?: (category: string) => void
}

export function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const [active, setActive] = useState("all")

  const handleChange = (categoryId: string) => {
    setActive(categoryId)
    onCategoryChange?.(categoryId)
  }

  return (
    <div className="scrollbar-hide overflow-x-auto">
      <div className="flex gap-2 px-4 py-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleChange(category.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === category.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
