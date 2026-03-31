"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "全部" },
  { id: "pokemon", label: "宝可梦" },
  { id: "sports", label: "球星卡" },
  { id: "yugioh", label: "游戏王" },
  { id: "onepiece", label: "海贼王" },
  { id: "mtg", label: "万智牌" },
]

const conditions = [
  { id: "all", label: "全部品相" },
  { id: "mint", label: "完美品" },
  { id: "near-mint", label: "近完美" },
  { id: "excellent", label: "优秀" },
  { id: "good", label: "良好" },
]

const sortOptions = [
  { id: "hot", label: "按热度" },
  { id: "price-asc", label: "价格从低到高" },
  { id: "price-desc", label: "价格从高到低" },
  { id: "newest", label: "最新上架" },
]

interface FilterBarProps {
  onFilterChange?: (filters: {
    category: string
    condition: string
    sort: string
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [category, setCategory] = useState("all")
  const [condition, setCondition] = useState("all")
  const [sort, setSort] = useState("hot")
  const [isOpen, setIsOpen] = useState(false)

  const activeFilters = [
    category !== "all" &&
      categories.find((c) => c.id === category)?.label,
    condition !== "all" &&
      conditions.find((c) => c.id === condition)?.label,
  ].filter(Boolean)

  const handleApply = () => {
    onFilterChange?.({ category, condition, sort })
    setIsOpen(false)
  }

  const handleReset = () => {
    setCategory("all")
    setCondition("all")
    setSort("hot")
  }

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-1.5 rounded-full"
            >
              <SlidersHorizontal className="h-4 w-4" />
              筛选
              {activeFilters.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>筛选与排序</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="mb-3 text-sm font-medium">卡牌分类</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm transition-all",
                        category === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium">品相</h4>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setCondition(cond.id)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm transition-all",
                        condition === cond.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {cond.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium">排序方式</h4>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSort(opt.id)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm transition-all",
                        sort === opt.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-4 right-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReset}
              >
                重置
              </Button>
              <Button className="flex-1" onClick={handleApply}>
                应用筛选
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Quick filters */}
        <div className="flex gap-2">
          {categories.slice(1, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id === category ? "all" : cat.id)
                onFilterChange?.({
                  category: cat.id === category ? "all" : cat.id,
                  condition,
                  sort,
                })
              }}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-all",
                category === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 px-4 pb-2">
          <span className="text-xs text-muted-foreground">已筛选:</span>
          {activeFilters.map((filter, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
            >
              {filter}
              <X className="h-3 w-3 cursor-pointer" onClick={handleReset} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
