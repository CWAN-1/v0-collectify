"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
      <div className="flex items-center gap-3 px-4 py-3">
        <form onSubmit={handleSubmit} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索卡牌、用户或话题..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-full border-0 bg-secondary pl-10 pr-4"
          />
        </form>
        <Button
          variant="ghost"
          size="icon"
          className="relative shrink-0 rounded-full"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        </Button>
      </div>
    </div>
  )
}
