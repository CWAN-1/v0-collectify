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
  { id: "all", label: "Semua", count: 1234 },
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
  { id: "popular", label: "Terpopuler" },
  { id: "newest", label: "Terbaru" },
  { id: "price-low", label: "Harga: Rendah ke Tinggi" },
  { id: "price-high", label: "Harga: Tinggi ke Rendah" },
]

const products = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 2500000,
    originalPrice: 3000000,
    image: "/products/product-1.jpg",
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
    price: 15000000,
    image: "/products/product-2.jpg",
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
    price: 8500000,
    originalPrice: 10000000,
    image: "/products/product-3.jpg",
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
    price: 1800000,
    image: "/products/product-4.jpg",
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
    price: 25000000,
    image: "/products/product-5.jpg",
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
    price: 45000000,
    image: "/products/product-6.jpg",
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
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Hot Badge */}
          {product.isHot && (
            <Badge className="absolute top-2 left-2 bg-foreground text-background text-xs">
              Hot
            </Badge>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className="absolute top-2 right-2 size-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
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
          <span className="text-xs text-muted-foreground">{product.condition}</span>

          {/* Price */}
          <div className="mt-2">
            <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
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
                <div className="size-3.5 bg-foreground rounded-full flex items-center justify-center">
                  <Check className="size-2 text-background" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-foreground text-foreground" />
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 pt-12 pb-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Toko</h1>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span className="absolute -top-1 -right-1 size-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
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
              placeholder="Cari kartu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-12 rounded-full bg-muted border-0 text-base"
            />
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <SlidersHorizontal className="size-5 text-muted-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-xl">Filter & Urutkan</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 overflow-auto h-full pb-20">
                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold mb-3">Urutkan</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl ${
                            sortBy === option.id ? "bg-foreground text-background" : "bg-muted"
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
                    <h3 className="font-semibold mb-3">Kondisi</h3>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((condition) => (
                        <button
                          key={condition.id}
                          onClick={() => toggleCondition(condition.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            selectedConditions.includes(condition.id)
                              ? "bg-foreground text-background"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {condition.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
                    <Button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full h-14 rounded-full"
                    >
                      Terapkan Filter
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
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
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
          {filteredProducts.length} produk ditemukan
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
