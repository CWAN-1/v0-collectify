"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Heart, Check, Clock, Gavel, SlidersHorizontal, ArrowUpDown } from "lucide-react"
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

const sortOptions = [
  { id: "ending", label: "Ending Soon" },
  { id: "bids-high", label: "Most Bids" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "price-low", label: "Price: Low to High" },
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
    isVerified: false,
    category: "pokemon",
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
    isVerified: true,
    category: "yugioh",
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
    isVerified: true,
    category: "onepiece",
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
    isVerified: true,
    category: "mtg",
    endTime: new Date(Date.now() + 30 * 60 * 1000),
  },
  {
    id: "auction-5",
    name: "Charizard VMAX Shiny",
    currentBid: 1200,
    image: "/cards/pokemon-2.jpg",
    seller: "ShinyHunter",
    bidCount: 23,
    condition: "Mint",
    isVerified: true,
    category: "pokemon",
    endTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
  },
  {
    id: "auction-6",
    name: "Michael Jordan Rookie PSA 10",
    currentBid: 15000,
    image: "/cards/sports-1.jpg",
    seller: "SportsElite",
    bidCount: 31,
    condition: "Gem Mint",
    isVerified: true,
    category: "sports",
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
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

function AuctionCard({ product }: { product: typeof auctionProducts[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/auction/${product.id}`} className="block">
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="size-2.5" />
            <AuctionCountdown endTime={product.endTime} />
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
          <div className="mt-1.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-muted-foreground block">Current Bid</span>
              <span className="font-bold text-sm text-primary">{formatPrice(product.currentBid)}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-muted-foreground block">Bids</span>
              <span className="font-semibold text-xs">{product.bidCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-border">
            <span className="text-[10px] text-muted-foreground truncate">{product.seller}</span>
            {product.isVerified && (
              <div className="size-3 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Check className="size-1.5 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function AuctionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AuctionsContent />
    </Suspense>
  )
}

function AuctionsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [selectedSort, setSelectedSort] = useState("ending")
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 20000])

  const filteredProducts = auctionProducts.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    product.currentBid >= priceRange[0] && product.currentBid <= priceRange[1]
  )

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
            <Gavel className="size-5 text-purple-500" />
            <span className="font-semibold">Live Auctions</span>
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
            {sortOptions.find(s => s.id === selectedSort)?.label}
          </Button>
        </div>
      </header>

      <main className="px-4 pt-4">
        <p className="text-xs text-muted-foreground mb-3">
          {filteredProducts.length} live auctions
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts.map((product) => (
            <AuctionCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Filter</SheetTitle>
            <SheetDescription className="sr-only">Filter auctions by price</SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Bid Range</span>
                <span className="text-sm text-primary">${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={20000}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1 h-10 rounded-xl" onClick={() => setPriceRange([0, 20000])}>
              Reset
            </Button>
            <Button className="flex-1 h-10 rounded-xl" onClick={() => setShowFilterSheet(false)}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sort Sheet */}
      <Sheet open={showSortSheet} onOpenChange={setShowSortSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Sort By</SheetTitle>
            <SheetDescription className="sr-only">Sort auctions</SheetDescription>
          </SheetHeader>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedSort(option.id)
                  setShowSortSheet(false)
                }}
                className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  selectedSort === option.id
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card border border-border"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
