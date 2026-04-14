"use client"

import { useState, useRef } from "react"
import { ArrowLeft, ChevronDown, SlidersHorizontal, TrendingUp, TrendingDown, Gift, Image as ImageIcon, Ticket, Crown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const brands = [
  { id: "pokemon", label: "Pokemon" },
  { id: "yugioh", label: "Yu-Gi-Oh!" },
  { id: "onepiece", label: "One Piece" },
  { id: "mtg", label: "MTG" },
  { id: "sports", label: "Sports" },
]

// Collection levels with crown styles
const collectionLevels = [
  { 
    id: "novice", 
    name: "Novice Collector", 
    minCards: 0,
    crownColor: "from-gray-400 to-gray-500",
    crownGlow: "shadow-gray-400/30",
    benefits: [
      { icon: ImageIcon, label: "Basic Avatar Frame" },
    ]
  },
  { 
    id: "junior", 
    name: "Junior Collector", 
    minCards: 10,
    crownColor: "from-green-400 to-emerald-500",
    crownGlow: "shadow-green-400/40",
    benefits: [
      { icon: ImageIcon, label: "Green Avatar Frame" },
      { icon: Ticket, label: "$5 Coupon" },
    ]
  },
  { 
    id: "collector", 
    name: "Collector", 
    minCards: 50,
    crownColor: "from-blue-400 to-cyan-500",
    crownGlow: "shadow-blue-400/40",
    benefits: [
      { icon: ImageIcon, label: "Blue Avatar Frame" },
      { icon: Gift, label: "Profile Background" },
      { icon: Ticket, label: "$10 Coupon" },
    ]
  },
  { 
    id: "master", 
    name: "Master Collector", 
    minCards: 200,
    crownColor: "from-purple-400 to-violet-500",
    crownGlow: "shadow-purple-400/50",
    benefits: [
      { icon: ImageIcon, label: "Purple Avatar Frame" },
      { icon: Gift, label: "Exclusive Background" },
      { icon: Ticket, label: "$25 Coupon" },
      { icon: Crown, label: "Profile Badge" },
    ]
  },
  { 
    id: "top", 
    name: "Top Collector", 
    minCards: 500,
    crownColor: "from-amber-400 to-orange-500",
    crownGlow: "shadow-amber-400/50",
    benefits: [
      { icon: ImageIcon, label: "Gold Avatar Frame" },
      { icon: Gift, label: "Premium Background" },
      { icon: Ticket, label: "$50 Coupon" },
      { icon: Crown, label: "Gold Badge" },
    ]
  },
  { 
    id: "ultimate", 
    name: "Ultimate Collector", 
    minCards: 1000,
    crownColor: "from-rose-400 via-pink-500 to-purple-500",
    crownGlow: "shadow-pink-500/60",
    benefits: [
      { icon: ImageIcon, label: "Diamond Frame" },
      { icon: Gift, label: "Animated Background" },
      { icon: Ticket, label: "$100 Coupon" },
      { icon: Crown, label: "Diamond Badge" },
    ]
  },
]

const allCards: Record<string, typeof pokemonCards> = {
  pokemon: [
    { id: "card-1", name: "Pikachu ex SAR", set: "Cyber Judge", number: "246/184", rarity: "SAR", grade: "PSA 10", gradingCompany: "PSA", image: "/cards/pokemon-1.jpg", currentPrice: 2318.50, purchasePrice: 1800, priceChange: 8.5, language: "JP" },
    { id: "card-2", name: "Charizard VSTAR", set: "Brilliant Stars", number: "174/172", rarity: "Rainbow", grade: null, gradingCompany: null, image: "/cards/pokemon-2.jpg", currentPrice: 580, purchasePrice: 620, priceChange: -6.5, language: "EN" },
    { id: "card-3", name: "Lugia V Alt Art", set: "Silver Tempest", number: "211/195", rarity: "Alt Art", grade: "BGS 9.5", gradingCompany: "BGS", image: "/cards/pokemon-3.jpg", currentPrice: 1240, purchasePrice: 950, priceChange: 30.5, language: "EN" },
    { id: "card-4", name: "Mewtwo ex SAR", set: "151", number: "206/165", rarity: "SAR", grade: null, gradingCompany: null, image: "/cards/pokemon-4.jpg", currentPrice: 890, purchasePrice: 780, priceChange: 14.1, language: "JP" },
    { id: "card-5", name: "Umbreon VMAX", set: "Evolving Skies", number: "215/203", rarity: "Alt Art", grade: "PSA 9", gradingCompany: "PSA", image: "/cards/pokemon-5.jpg", currentPrice: 3200, purchasePrice: 2100, priceChange: 52.4, language: "EN" },
    { id: "card-6", name: "Rayquaza VMAX", set: "Evolving Skies", number: "218/203", rarity: "Alt Art", grade: "CGC 9.5", gradingCompany: "CGC", image: "/cards/pokemon-6.jpg", currentPrice: 1850, purchasePrice: 1200, priceChange: 54.2, language: "EN" },
  ],
  yugioh: [
    { id: "ygo-1", name: "Blue-Eyes White Dragon", set: "Legend of Blue Eyes", number: "LOB-001", rarity: "Ultra Rare", grade: "PSA 9", gradingCompany: "PSA", image: "/cards/pokemon-1.jpg", currentPrice: 1200, purchasePrice: 900, priceChange: 33.3, language: "JP" },
    { id: "ygo-2", name: "Dark Magician", set: "Legend of Blue Eyes", number: "LOB-005", rarity: "Ultra Rare", grade: null, gradingCompany: null, image: "/cards/pokemon-2.jpg", currentPrice: 480, purchasePrice: 350, priceChange: 37.1, language: "EN" },
    { id: "ygo-3", name: "Exodia the Forbidden", set: "Legend of Blue Eyes", number: "LOB-124", rarity: "Ultra Rare", grade: "BGS 8.5", gradingCompany: "BGS", image: "/cards/pokemon-3.jpg", currentPrice: 2200, purchasePrice: 1800, priceChange: 22.2, language: "JP" },
  ],
  onepiece: [
    { id: "op-1", name: "Monkey D. Luffy", set: "Romance Dawn", number: "OP01-060", rarity: "Secret Rare", grade: null, gradingCompany: null, image: "/cards/pokemon-4.jpg", currentPrice: 650, purchasePrice: 400, priceChange: 62.5, language: "JP" },
    { id: "op-2", name: "Roronoa Zoro", set: "Romance Dawn", number: "OP01-001", rarity: "Leader Rare", grade: "PSA 10", gradingCompany: "PSA", image: "/cards/pokemon-5.jpg", currentPrice: 320, purchasePrice: 200, priceChange: 60.0, language: "EN" },
  ],
  mtg: [
    { id: "mtg-1", name: "Black Lotus", set: "Alpha", number: "232", rarity: "Rare", grade: "PSA 7", gradingCompany: "PSA", image: "/cards/pokemon-6.jpg", currentPrice: 48000, purchasePrice: 35000, priceChange: 37.1, language: "EN" },
  ],
  sports: [
    { id: "sp-1", name: "LeBron James RC", set: "Topps Chrome 2003", number: "111", rarity: "Refractor", grade: "PSA 10", gradingCompany: "PSA", image: "/cards/pokemon-1.jpg", currentPrice: 8500, purchasePrice: 5000, priceChange: 70.0, language: "EN" },
    { id: "sp-2", name: "Michael Jordan RC", set: "Fleer 1986", number: "57", rarity: "Base", grade: "BGS 9", gradingCompany: "BGS", image: "/cards/pokemon-2.jpg", currentPrice: 4200, purchasePrice: 3000, priceChange: 40.0, language: "EN" },
  ],
}

const pokemonCards = allCards.pokemon

const sortOptions = [
  { id: "acquired", label: "Acquire Time" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "gain", label: "Gain %" },
]

export default function CollectionPage() {
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState("pokemon")
  const [selectedSort, setSelectedSort] = useState("acquired")
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentLevelIndex, setCurrentLevelIndex] = useState(2)
  const levelScrollRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)

  const myCards = allCards[selectedBrand] ?? []
  const totalCards = myCards.length
  const totalValue = myCards.reduce((sum, c) => sum + c.currentPrice, 0)
  const currentLevel = collectionLevels[currentLevelIndex]

  const formatPrice = (p: number) => `$${p.toLocaleString("en-US", { minimumFractionDigits: 2 })}`

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX
      console.log("[v0] Touch start at:", touchStartX.current)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Prevent default scroll behavior during swipe
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX
      const diff = touchStartX.current - endX
      console.log("[v0] Touch end at:", endX, "Diff:", diff, "Current index:", currentLevelIndex)
      
      if (Math.abs(diff) > 30) {
        if (diff > 0 && currentLevelIndex < collectionLevels.length - 1) {
          console.log("[v0] Swiped RIGHT - moving to next level")
          setCurrentLevelIndex(i => i + 1)
        } else if (diff < 0 && currentLevelIndex > 0) {
          console.log("[v0] Swiped LEFT - moving to prev level")
          setCurrentLevelIndex(i => i - 1)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 absolute left-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-sm font-semibold">My Collection</h1>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 absolute right-4"
            onClick={() => {}}
          >
            <Share2 className="size-5" />
          </Button>
        </div>
      </header>

      {/* Collection Level Section */}
      <div className="px-4 py-4 bg-gradient-to-b from-secondary/50 to-background">
        {/* Crown Swipe Area */}
        <div
          className="flex flex-col items-center mb-3 select-none cursor-grab active:cursor-grabbing touch-none"
          ref={levelScrollRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Crown */}
          <div className={`relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br ${currentLevel.crownColor} shadow-xl ${currentLevel.crownGlow} mb-2`}>
            <svg className="size-14 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
              <path d="M5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1H5v1z"/>
            </svg>
            {/* Sparkles — more as level increases */}
            {currentLevelIndex >= 1 && <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full animate-ping opacity-75" />}
            {currentLevelIndex >= 2 && <div className="absolute bottom-3 left-1.5 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60" style={{ animationDelay: "0.3s" }} />}
            {currentLevelIndex >= 3 && <div className="absolute top-3 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: "0.6s" }} />}
            {currentLevelIndex >= 4 && <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full animate-ping opacity-80" style={{ animationDelay: "0.15s" }} />}
            {currentLevelIndex >= 5 && <div className="absolute top-2 right-5 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-70" style={{ animationDelay: "0.45s" }} />}
          </div>

          <p className="text-sm font-bold text-foreground">{currentLevel.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {currentLevelIndex < collectionLevels.length - 1
              ? `${collectionLevels[currentLevelIndex + 1].minCards - totalCards} more cards to next level`
              : "Maximum level reached!"
            }
          </p>
        </div>

        {/* Level Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {collectionLevels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentLevelIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentLevelIndex 
                  ? "bg-primary w-4" 
                  : idx <= currentLevelIndex 
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-xl border border-border p-3">
          <p className="text-[10px] text-muted-foreground mb-2">Current Level Benefits</p>
          <div className="flex flex-wrap gap-2">
            {currentLevel.benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="flex items-center gap-1.5 bg-secondary rounded-full px-2.5 py-1">
                  <Icon className="size-3 text-primary" />
                  <span className="text-[10px] font-medium">{benefit.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Brand filter */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2 overflow-x-auto scrollbar-none">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedBrand === brand.id
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border"
            }`}
          >
            {brand.label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="mx-4 mt-3 bg-secondary rounded-xl p-3 grid grid-cols-3 divide-x divide-border">
        <div className="pr-3">
          <p className="text-[10px] text-muted-foreground">Cards Owned</p>
          <p className="text-lg font-bold text-foreground">{totalCards}</p>
        </div>
        <div className="px-3">
          <p className="text-[10px] text-muted-foreground">Total Invested</p>
          <p className="text-sm font-bold text-foreground">--</p>
        </div>
        <div className="pl-3">
          <p className="text-[10px] text-muted-foreground">Market Value</p>
          <p className="text-sm font-bold text-primary">{formatPrice(totalValue)}</p>
        </div>
      </div>

      {/* Sort & Filter bar - moved to left */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        <button
          className="flex items-center gap-1 text-xs text-muted-foreground"
          onClick={() => setShowSortSheet(true)}
        >
          <span>{sortOptions.find(s => s.id === selectedSort)?.label}</span>
          <ChevronDown className="size-3.5" />
        </button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground">
          <SlidersHorizontal className="size-3.5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Card Grid */}
      <div className={`px-4 ${viewMode === "grid" ? "grid grid-cols-3 gap-2.5" : "flex flex-col gap-2"}`}>
        {myCards.map((card) => (
          <Link key={card.id} href={`/card/${card.id}`}>
            {viewMode === "grid" ? (
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <div className="relative aspect-[3/4] bg-secondary">
                  <Image src={card.image} alt={card.name} fill className="object-cover" />
                  {/* Rarity badge */}
                  <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {card.rarity}
                  </div>
                  {/* Grade badge */}
                  {card.gradingCompany && (
                    <div className="absolute bottom-1.5 right-1.5 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {card.gradingCompany}
                    </div>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="text-[9px] text-muted-foreground truncate">{card.name}</p>
                  <p className="text-xs font-bold text-primary">{formatPrice(card.currentPrice)}</p>
                  <div className={`flex items-center gap-0.5 ${card.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {card.priceChange >= 0
                      ? <TrendingUp className="size-2.5" />
                      : <TrendingDown className="size-2.5" />
                    }
                    <span className="text-[8px] font-medium">{card.priceChange >= 0 ? "+" : ""}{card.priceChange}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-2.5">
                <div className="relative w-14 h-20 rounded-lg overflow-hidden shrink-0 bg-secondary">
                  <Image src={card.image} alt={card.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{card.name}</p>
                  <p className="text-[10px] text-muted-foreground">{card.set} · {card.number}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="bg-secondary text-[9px] px-1.5 py-0.5 rounded-full">{card.rarity}</span>
                    {card.gradingCompany && (
                      <span className="bg-primary/15 text-primary text-[9px] px-1.5 py-0.5 rounded-full">{card.grade}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{formatPrice(card.currentPrice)}</p>
                  <div className={`flex items-center justify-end gap-0.5 mt-0.5 ${card.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {card.priceChange >= 0
                      ? <TrendingUp className="size-3" />
                      : <TrendingDown className="size-3" />
                    }
                    <span className="text-[10px] font-medium">{card.priceChange >= 0 ? "+" : ""}{card.priceChange}%</span>
                  </div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">— End —</p>

      {/* Sort Sheet */}
      <Sheet open={showSortSheet} onOpenChange={setShowSortSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl pb-8">
          <SheetHeader className="border-b border-border pb-3">
            <SheetTitle className="text-center text-sm">Sort By</SheetTitle>
            <SheetDescription className="sr-only">Sort collection cards</SheetDescription>
          </SheetHeader>
          <div className="py-3 space-y-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setSelectedSort(opt.id); setShowSortSheet(false) }}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  selectedSort === opt.id
                    ? "bg-primary/10 border border-primary"
                    : "bg-secondary border border-transparent"
                }`}
              >
                <span className="text-sm font-medium">{opt.label}</span>
                {selectedSort === opt.id && (
                  <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
