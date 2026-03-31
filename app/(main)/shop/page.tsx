"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, Heart, Star, ChevronDown, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All", count: 1234 },
  { id: "pokemon", label: "Pokemon", count: 456 },
  { id: "sports", label: "Sports Cards", count: 321 },
  { id: "yugioh", label: "Yu-Gi-Oh", count: 234 },
  { id: "onepiece", label: "One Piece", count: 123 },
  { id: "mtg", label: "MTG", count: 100 },
]

const conditions = [
  { id: "mint", label: "Mint/Near Mint" },
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "played", label: "Played" },
]

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
]

const products = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=400&fit=crop",
    seller: "CardMaster",
    rating: 4.9,
    sold: 156,
    condition: "Mint",
    isHot: true,
    isVerified: true,
    category: "pokemon"
  },
  {
    id: "2",
    name: "LeBron James Rookie Card",
    price: 1500,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
    seller: "SportsHub",
    rating: 5.0,
    sold: 23,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "sports"
  },
  {
    id: "3",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400&h=400&fit=crop",
    seller: "YugiCollector",
    rating: 4.8,
    sold: 45,
    condition: "Near Mint",
    isHot: false,
    isVerified: true,
    category: "yugioh"
  },
  {
    id: "4",
    name: "Luffy Gear 5 Secret Rare",
    price: 180,
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&h=400&fit=crop",
    seller: "OnePieceID",
    rating: 4.7,
    sold: 89,
    condition: "Mint",
    isHot: true,
    isVerified: false,
    category: "onepiece"
  },
  {
    id: "5",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "VintageCards",
    rating: 4.9,
    sold: 12,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "pokemon"
  },
  {
    id: "6",
    name: "Michael Jordan Fleer Rookie",
    price: 4500,
    image: "https://images.unsplash.com/photo-1642056446815-3b9b6e1e3d5e?w=400&h=400&fit=crop",
    seller: "LegendaryCards",
    rating: 5.0,
    sold: 5,
    condition: "Mint",
    isHot: false,
    isVerified: true,
    category: "sports"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Hot Badge */}
          {product.isHot && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-accent text-white text-xs border-0">
              Hot
            </Badge>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {/* Condition */}
          <span className="text-xs text-green-400">{product.condition}</span>

          {/* Price */}
          <div className="mt-2">
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Seller & Rating */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{product.seller}</span>
              {product.isVerified && (
                <div className="size-3.5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="size-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popular")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = products.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (selectedConditions.length === 0 || selectedConditions.some(c => product.condition.toLowerCase().includes(c)))
  )

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition))
    } else {
      setSelectedConditions([...selectedConditions, condition])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Shop</h1>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="bg-card border border-border rounded-xl">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span className="absolute -top-1 -right-1 size-4 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-12 rounded-xl bg-card border-border text-base"
            />
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <SlidersHorizontal className="size-5 text-muted-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-xl">Filter & Sort</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 overflow-auto h-full pb-20">
                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold mb-3">Sort By</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                            sortBy === option.id ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border"
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.id && <Check className="size-5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <h3 className="font-semibold mb-3">Condition</h3>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((condition) => (
                        <button
                          key={condition.id}
                          onClick={() => toggleCondition(condition.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                            selectedConditions.includes(condition.id)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary text-foreground border-border"
                          }`}
                        >
                          {condition.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
                    <Button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-accent"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="px-4 pt-4">
        {/* Active Filters */}
        {selectedConditions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedConditions.map((condition) => (
              <Badge
                key={condition}
                variant="secondary"
                className="pl-3 pr-2 py-1 gap-1 rounded-full"
              >
                {conditions.find(c => c.id === condition)?.label}
                <button onClick={() => toggleCondition(condition)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} products found
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
