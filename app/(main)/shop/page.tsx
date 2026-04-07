"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, ArrowUpDown, Heart, Star, X, Check, Clock, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"


const categories = [
  { id: "all", label: "All", avatar: null, bgColor: "bg-gradient-to-br from-primary to-accent" },
  { id: "pokemon", label: "Pokemon", avatar: "/brands/pikachu.jpg", bgColor: "bg-yellow-500" },
  { id: "yugioh", label: "Yu-Gi-Oh!", avatar: "/brands/yugioh.jpg", bgColor: "bg-orange-600" },
  { id: "onepiece", label: "One Piece", avatar: "/brands/luffy.jpg", bgColor: "bg-red-600" },
  { id: "mtg", label: "MTG", avatar: "/brands/mtg.jpg", bgColor: "bg-amber-700" },
  { id: "sports", label: "Sports", avatar: "/brands/sports.jpg", bgColor: "bg-green-600" },
]

const filterOptions = {
  category: ["All", "Single Card", "Set/Bundle", "Booster Pack", "Box", "Case"],
  saleStatus: ["All", "For Sale", "Auction"],
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

const products = [
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
    isHot: true,
    isVerified: true,
    category: "pokemon",
    saleType: "buy"
  },
  {
    id: "2",
    name: "LeBron James Rookie Card",
    price: 1500,
    image: "/cards/sports-1.jpg",
    seller: "SportsHub",
    rating: 5.0,
    sold: 23,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "sports",
    saleType: "buy"
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
    isHot: false,
    isVerified: true,
    category: "yugioh",
    saleType: "buy"
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
    isHot: true,
    isVerified: false,
    category: "onepiece",
    saleType: "buy"
  },
  {
    id: "5",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/cards/pokemon-2.jpg",
    seller: "VintageCards",
    rating: 4.9,
    sold: 12,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "pokemon",
    saleType: "buy"
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
    isHot: false,
    isVerified: true,
    category: "mtg",
    saleType: "buy"
  },
]

const auctionProducts = [
  {
    id: "auction-1",
    name: "Walking Wake ex Hyper Rare",
    currentBid: 225,
    image: "/cards/pokemon-1.jpg",
    seller: "Aldra",
    bidCount: 7,
    condition: "Mint",
    isHot: true,
    isVerified: false,
    category: "pokemon",
    saleType: "auction",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: "auction-2",
    name: "Dark Magician Ultimate Rare",
    currentBid: 450,
    image: "/cards/yugioh-1.jpg",
    seller: "YugiMaster",
    bidCount: 12,
    condition: "Near Mint",
    isHot: true,
    isVerified: true,
    category: "yugioh",
    saleType: "auction",
    endTime: new Date(Date.now() + 45 * 60 * 1000),
  },
  {
    id: "auction-3",
    name: "Shanks Manga Art Secret",
    currentBid: 320,
    image: "/cards/onepiece-1.jpg",
    seller: "PirateKing",
    bidCount: 9,
    condition: "Mint",
    isHot: false,
    isVerified: true,
    category: "onepiece",
    saleType: "auction",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: "auction-4",
    name: "Mox Pearl Alpha Edition",
    currentBid: 8500,
    image: "/cards/mtg-1.jpg",
    seller: "MTGLegend",
    bidCount: 15,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "mtg",
    saleType: "auction",
    endTime: new Date(Date.now() + 30 * 60 * 1000),
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function formatTimeLeft(endTime: Date) {
  const now = new Date().getTime()
  const end = endTime.getTime()
  const diff = Math.max(0, end - now)
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function AuctionCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
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

function AuctionCard({ product }: { product: typeof auctionProducts[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/auction/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Countdown Badge */}
          <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="size-2.5" />
            <AuctionCountdown endTime={product.endTime} />
          </div>
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

          {/* Current Bid */}
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground block">Current Bid</span>
              <span className="font-bold text-primary">{formatPrice(product.currentBid)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground block">Bids</span>
              <span className="font-semibold text-sm">{product.bidCount}</span>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">{product.seller}</span>
            {product.isVerified && (
              <div className="size-3.5 bg-primary rounded-full flex items-center justify-center">
                <Check className="size-2 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [selectedSort, setSelectedSort] = useState("latest")
  const [filters, setFilters] = useState({
    category: "All",
    saleStatus: "All",
    saleType: "All",
    graded: "All",
    gradingCompany: "All",
  })
  const [ratingRange, setRatingRange] = useState([1, 10])

  const filteredProducts = products.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory)
  )

  const filteredAuctions = auctionProducts.filter(product =>
    (selectedCategory === "all" || product.category === selectedCategory)
  )

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
    })
    setRatingRange([1, 10])
  }

  const applySort = (sortId: string) => {
    setSelectedSort(sortId)
    setShowSortSheet(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-3">
          {/* Search Row */}
          <div className="flex items-center gap-3">
            {/* Shop Title */}
            <span className="text-base font-bold text-foreground shrink-0">Shop</span>
            
            {/* Search - Clickable to navigate to search page */}
            <Link href="/search?tab=products" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <div className="h-10 pl-9 pr-4 rounded-xl bg-card border border-border text-sm flex items-center text-muted-foreground">
                  Search cards...
                </div>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative shrink-0">
              <Button variant="ghost" size="icon" className="size-10 bg-card border border-border rounded-xl">
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
        </div>

        {/* Brand Categories */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all border ${
                  selectedCategory === category.id
                    ? "border-primary bg-primary/10"
                    : "bg-card border-border"
                }`}
              >
                <div className="size-6 rounded-lg overflow-hidden shrink-0">
                  {category.avatar ? (
                    <Image
                      src={category.avatar}
                      alt={category.label}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${category.bgColor} flex items-center justify-center`}>
                      <span className="text-[8px] font-bold text-white">ALL</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  selectedCategory === category.id ? "text-primary" : "text-foreground"
                }`}>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort Buttons */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
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
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="px-4 pt-2">
        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length + filteredAuctions.length} items found
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Auctions */}
        {filteredAuctions.length > 0 && (
          <>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="size-2 bg-red-500 rounded-full animate-pulse" />
              Auctions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {filteredAuctions.map((product) => (
                <AuctionCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-0" aria-describedby={undefined}>
          <SheetHeader className="border-b border-border pb-4 px-4">
            <SheetTitle className="text-center">Filter</SheetTitle>
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
        <SheetContent side="bottom" className="rounded-t-3xl" aria-describedby={undefined}>
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="text-center">Sort</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-2">
            {sortOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => applySort(option.id)}
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
