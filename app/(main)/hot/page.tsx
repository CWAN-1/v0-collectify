"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Heart, Star, Check, Flame, SlidersHorizontal, ArrowUpDown, X, TrendingUp, DollarSign, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All" },
  { id: "pokemon", label: "Pokemon" },
  { id: "yugioh", label: "Yu-Gi-Oh!" },
  { id: "onepiece", label: "One Piece" },
  { id: "mtg", label: "MTG" },
  { id: "sports", label: "Sports" },
]

const filterOptions = {
  category: ["All", "Single Card", "Set/Bundle", "Booster Pack", "Box", "Case"],
  saleStatus: ["All", "Fixed Price", "Auction"],
  saleType: ["All", "Fixed Price", "Negotiable"],
  graded: ["All", "Graded", "Ungraded"],
  gradingCompany: ["All", "PSA", "BGS", "CGC", "ACE Grading", "Beckett", "SGC"],
  condition: ["All", "10", "9.5", "9", "8-8.5", "7-7.5", "6-6.5", "A", "B", "C", "D"],
}

const sortOptions = [
  { id: "ending", label: "Ending Soon", icon: Clock },
  { id: "latest", label: "Latest", icon: TrendingUp },
  { id: "price-high", label: "Price: High to Low", icon: DollarSign },
  { id: "price-low", label: "Price: Low to High", icon: DollarSign },
]

const hotProducts = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    originalPrice: 300,
    image: "/cards/pokemon-1.jpg",
    seller: "CardMaster",
    rating: 4.9,
    sold: 156,
    condition: "Mint",
    isVerified: true,
    category: "pokemon",
    trend: "+15%"
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/cards/pokemon-2.jpg",
    seller: "VintageCards",
    rating: 4.9,
    sold: 12,
    condition: "Excellent",
    isVerified: true,
    category: "pokemon",
    trend: "+8%"
  },
  {
    id: "3",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    originalPrice: 1000,
    image: "/cards/yugioh-1.jpg",
    seller: "YugiCollector",
    rating: 4.8,
    sold: 45,
    condition: "Near Mint",
    isVerified: true,
    category: "yugioh",
    trend: "+22%"
  },
  {
    id: "4",
    name: "Luffy Gear 5 Secret Rare",
    price: 180,
    image: "/cards/onepiece-1.jpg",
    seller: "OnePieceID",
    rating: 4.7,
    sold: 89,
    condition: "Mint",
    isVerified: false,
    category: "onepiece",
    trend: "+30%"
  },
  {
    id: "5",
    name: "LeBron James Rookie Card",
    price: 1500,
    image: "/cards/sports-1.jpg",
    seller: "SportsHub",
    rating: 5.0,
    sold: 23,
    condition: "Excellent",
    isVerified: true,
    category: "sports",
    trend: "+12%"
  },
  {
    id: "6",
    name: "Black Lotus",
    price: 4500,
    image: "/cards/mtg-1.jpg",
    seller: "LegendaryCards",
    rating: 5.0,
    sold: 5,
    condition: "Mint",
    isVerified: true,
    category: "mtg",
    trend: "+5%"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function ProductCard({ product }: { product: typeof hotProducts[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame className="size-2.5" />
            {product.trend}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className="absolute top-2 right-2 size-7 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>

        <div className="p-2.5">
          <h3 className="font-medium text-xs text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
          <span className="text-[10px] text-green-500">{product.condition}</span>
          <div className="mt-1.5">
            <span className="font-bold text-sm text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through ml-1">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-border">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground truncate max-w-16">{product.seller}</span>
              {product.isVerified && (
                <div className="size-3 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check className="size-1.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <Star className="size-2.5 fill-yellow-500 text-yellow-500" />
              <span className="text-[10px] font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HotPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HotContent />
    </Suspense>
  )
}

function HotContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedSort, setSelectedSort] = useState("latest")
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [filters, setFilters] = useState({
    category: "All",
    saleStatus: "All",
    graded: "All",
    gradingCompany: "All",
  })
  const [ratingRange, setRatingRange] = useState([1, 10])

  const filteredProducts = hotProducts.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory)
  )

  const resetFilters = () => {
    setFilters({
      category: "All",
      saleStatus: "All",
      graded: "All",
      gradingCompany: "All",
    })
    setRatingRange([1, 10])
  }

  const applyFilters = () => {
    setShowFilterSheet(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 flex-1">
            <Flame className="size-5 text-orange-500" />
            <span className="font-semibold">Hot Items</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort */}
        <div className="px-4 pb-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterSheet(true)}
            className="h-8 rounded-full text-xs gap-1.5"
          >
            <SlidersHorizontal className="size-3.5" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSortSheet(true)}
            className="h-8 rounded-full text-xs gap-1.5"
          >
            <ArrowUpDown className="size-3.5" />
            Sort
          </Button>
        </div>
      </header>

      <main className="px-4 pt-4">
        <p className="text-xs text-muted-foreground mb-3">
          {filteredProducts.length} trending items
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl px-0">
          <SheetHeader className="border-b border-border pb-3 px-4">
            <SheetTitle className="text-center text-base">Filter</SheetTitle>
            <SheetDescription className="sr-only">Filter hot items</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-140px)] py-4 px-4">
            {/* Category */}
            <div className="mb-6">
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
            <div className="mb-6">
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

            {/* Graded */}
            <div className="mb-6">
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
            <div className="mb-6">
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

            {/* Rating / Condition */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-foreground">Rating / Condition</h4>
                <span className="text-sm text-primary font-medium">{ratingRange[0]} - {ratingRange[1]}</span>
              </div>
              <div className="px-2">
                <Slider
                  value={ratingRange}
                  onValueChange={setRatingRange}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">1</span>
                  <span className="text-xs text-muted-foreground">10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3">
            <Button variant="outline" className="flex-1 h-10 rounded-xl text-sm" onClick={resetFilters}>
              Reset
            </Button>
            <Button className="flex-1 h-10 rounded-xl bg-primary text-sm" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sort Sheet */}
      <Sheet open={showSortSheet} onOpenChange={setShowSortSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl pb-8">
          <SheetHeader className="border-b border-border pb-3">
            <SheetTitle className="text-center text-base">Sort</SheetTitle>
            <SheetDescription className="sr-only">Sort hot items by different criteria</SheetDescription>
          </SheetHeader>
          <div className="py-3 space-y-2">
            {sortOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedSort(option.id)
                    setShowSortSheet(false)
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${
                    selectedSort === option.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-secondary border border-transparent"
                  }`}
                >
                  <Icon className="size-5 text-muted-foreground" />
                  <span className="flex-1 text-left text-sm font-medium">{option.label}</span>
                  {selectedSort === option.id && (
                    <Check className="size-5 text-primary" />
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
