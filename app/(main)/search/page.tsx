"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X, SlidersHorizontal, ArrowUpDown, Star, ChevronDown, Clock, TrendingUp, DollarSign, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Mock data
const mockProducts = [
  { id: "1", name: "Pikachu VMAX Rainbow Rare", price: 250, image: "/cards/pokemon-1.jpg", seller: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }, isGraded: true },
  { id: "2", name: "Charizard GX Shiny", price: 450, image: "/cards/pokemon-2.jpg", seller: { name: "PokeFan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, isGraded: false },
  { id: "3", name: "Blue-Eyes White Dragon", price: 850, image: "/cards/yugioh-1.jpg", seller: { name: "YugiCollector", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, isGraded: true },
  { id: "4", name: "Luffy Gear 5 Secret Rare", price: 180, image: "/cards/onepiece-1.jpg", seller: { name: "OnePieceID", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }, isGraded: false },
  { id: "5", name: "LeBron James Rookie", price: 1500, image: "/cards/sports-1.jpg", seller: { name: "SportsHub", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" }, isGraded: true },
  { id: "6", name: "Black Lotus MTG", price: 25000, image: "/cards/mtg-1.jpg", seller: { name: "MTGMaster", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" }, isGraded: true },
]

const mockPosts = [
  { id: "1", title: "Unboxing Pikachu VMAX", image: "/posts/post-pokemon-1.jpg", user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }, likes: 2431 },
  { id: "2", title: "NBA Rookie Cards Collection", image: "/posts/post-sports-1.jpg", user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, likes: 1892 },
  { id: "3", title: "Blue-Eyes White Dragon Review", image: "/posts/post-yugioh-1.jpg", user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, likes: 3210 },
]

const mockUsers = [
  { id: "1", name: "dhipokemon", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", followers: 0 },
  { id: "2", name: "Pokemonban", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", followers: 0 },
  { id: "3", name: "Aqshal pokemon", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 6 },
  { id: "4", name: "NruPokemon", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", followers: 20 },
  { id: "5", name: "JAYPOKEMON", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", followers: 0 },
  { id: "6", name: "tcgpokemon", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", followers: 0 },
  { id: "7", name: "pokemonseller", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", followers: 1 },
  { id: "8", name: "Pokemon Central", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", followers: 0 },
]

// Filter options
const filterOptions = {
  category: ["All", "Single Card", "Set/Bundle", "Booster Pack", "Box", "Case"],
  saleStatus: ["All", "For Sale", "Auction"],
  saleType: ["All", "Fixed Price", "Negotiable"],
  graded: ["All", "Graded", "Ungraded"],
  gradingCompany: ["All", "PSA", "BGS", "CGC", "ACE Grading", "Beckett", "SGC", "TAG", "ARS"],
  condition: ["All", "10", "9.5", "9", "8-8.5", "7-7.5", "6-6.5", "5-5.5", "4-4.5", "3-3.5", "A", "B", "C", "D"],
}

const sortOptions = [
  { id: "ending", label: "Ending Soon", icon: Clock },
  { id: "latest", label: "Latest", icon: TrendingUp },
  { id: "price-high", label: "Price: High to Low", icon: DollarSign },
  { id: "price-low", label: "Price: Low to High", icon: DollarSign },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState<"products" | "posts" | "users">("products")
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [selectedSort, setSelectedSort] = useState("latest")
  
  // Filter states
  const [filters, setFilters] = useState({
    category: "All",
    saleStatus: "All",
    saleType: "All",
    graded: "All",
    gradingCompany: "All",
    condition: "All",
  })

  const handleCancel = () => {
    router.back()
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const applyFilters = () => {
    setShowFilterSheet(false)
  }

  const resetFilters = () => {
    setFilters({
      category: "All",
      saleStatus: "All",
      saleType: "All",
      graded: "All",
      gradingCompany: "All",
      condition: "All",
    })
  }

  const applySort = (sortId: string) => {
    setSelectedSort(sortId)
    setShowSortSheet(false)
  }

  const resultCount = activeTab === "products" ? mockProducts.length : activeTab === "posts" ? mockPosts.length : mockUsers.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-background px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products, posts, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 rounded-full bg-secondary border-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-5 bg-muted-foreground/20 rounded-full flex items-center justify-center"
              >
                <X className="size-3 text-muted-foreground" />
              </button>
            )}
          </div>
          <button onClick={handleCancel} className="text-sm text-muted-foreground shrink-0">
            Cancel
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-border bg-background">
        {[
          { id: "products", label: "Products" },
          { id: "posts", label: "Posts" },
          { id: "users", label: "Users" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Products Tab - Filter/Sort Bar */}
      {activeTab === "products" && (
        <div className="px-4 py-2.5 flex items-center gap-2 bg-background border-b border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterSheet(true)}
            className="h-8 rounded-full text-xs gap-1.5 border-border"
          >
            <SlidersHorizontal className="size-3.5" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSortSheet(true)}
            className="h-8 rounded-full text-xs gap-1.5 border-border"
          >
            <ArrowUpDown className="size-3.5" />
            Sort
          </Button>
          <div className="ml-auto">
            <Button
              variant="default"
              size="sm"
              className="h-8 rounded-full text-xs gap-1.5 bg-primary"
            >
              <span>Cards</span>
              <ChevronDown className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Result Count */}
      <div className="flex justify-center py-2">
        <span className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full">
          {resultCount} results
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Products Grid */}
        {activeTab === "products" && (
          <div className="grid grid-cols-3 gap-2 p-3">
            {mockProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {/* Seller overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="size-5 border border-white/30">
                          <AvatarImage src={product.seller.avatar} />
                          <AvatarFallback className="text-[8px]">{product.seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] text-white truncate">{product.seller.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-1 mb-1">
                      {product.isGraded && (
                        <div className="size-4 bg-primary rounded flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white">A</span>
                        </div>
                      )}
                      <h3 className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-xs font-bold text-primary">
                      Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-2 gap-3 p-3">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="relative aspect-square">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Avatar className="size-5">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback className="text-[8px]">{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] text-muted-foreground truncate">{post.user.name}</span>
                  </div>
                  <h3 className="text-xs font-medium text-foreground line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="size-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] text-muted-foreground">{post.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users List */}
        {activeTab === "users" && (
          <div className="divide-y divide-border">
            {mockUsers.map((user) => (
              <Link key={user.id} href={`/user/${user.id}`}>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <Avatar className="size-11 border-2 border-border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="text-center">Filter</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-120px)] py-4 space-y-6">
            {/* Category */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.category.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, category: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.category === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale Status */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Sale Status</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.saleStatus.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, saleStatus: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.saleStatus === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale Type */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Sale Type</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.saleType.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, saleType: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.saleType === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Graded */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Graded</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.graded.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, graded: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.graded === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Grading Company */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Grading Company</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.gradingCompany.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, gradingCompany: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.gradingCompany === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Rating / Condition</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.condition.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFilters({ ...filters, condition: option })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filters.condition === option
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={resetFilters}>
              Reset
            </Button>
            <Button className="flex-1 h-12 rounded-xl bg-primary" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sort Sheet */}
      <Sheet open={showSortSheet} onOpenChange={setShowSortSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="text-center">Sort</SheetTitle>
          </SheetHeader>
          <div className="py-2">
            {sortOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => applySort(option.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                    selectedSort === option.id ? "bg-primary/10" : "hover:bg-secondary"
                  }`}
                >
                  <div className={`size-8 rounded-full flex items-center justify-center ${
                    selectedSort === option.id ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <Icon className={`size-4 ${selectedSort === option.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-sm ${selectedSort === option.id ? "font-medium text-primary" : "text-foreground"}`}>
                    {option.label}
                  </span>
                  {selectedSort === option.id && (
                    <Check className="size-4 text-primary ml-auto" />
                  )}
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
