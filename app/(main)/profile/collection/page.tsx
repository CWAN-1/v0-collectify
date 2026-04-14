"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, SlidersHorizontal, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const brands = [
  { id: "pokemon", label: "Pokemon", logo: "https://images.unsplash.com/photo-1628420284898-3b6f78bab7de?w=48&h=48&fit=crop" },
  { id: "yugioh", label: "Yu-Gi-Oh!", logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=48&h=48&fit=crop" },
  { id: "onepiece", label: "One Piece", logo: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=48&h=48&fit=crop" },
  { id: "mtg", label: "MTG", logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=48&h=48&fit=crop" },
]

const myCards = [
  {
    id: "card-1",
    name: "Pikachu ex SAR",
    set: "Cyber Judge",
    number: "246/184",
    rarity: "SAR",
    grade: "PSA 10",
    gradingCompany: "PSA",
    image: "https://images.unsplash.com/photo-1542779632-6b1a83a04e22?w=300&h=400&fit=crop",
    currentPrice: 2318.50,
    purchasePrice: 1800,
    priceChange: 8.5,
    language: "JP",
  },
  {
    id: "card-2",
    name: "Charizard VSTAR Rainbow",
    set: "Brilliant Stars",
    number: "174/172",
    rarity: "Rainbow Rare",
    grade: null,
    gradingCompany: null,
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&h=400&fit=crop",
    currentPrice: 580,
    purchasePrice: 620,
    priceChange: -6.5,
    language: "EN",
  },
  {
    id: "card-3",
    name: "Lugia V Alt Art",
    set: "Silver Tempest",
    number: "211/195",
    rarity: "Alt Art",
    grade: "BGS 9.5",
    gradingCompany: "BGS",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=400&fit=crop",
    currentPrice: 1240,
    purchasePrice: 950,
    priceChange: 30.5,
    language: "EN",
  },
  {
    id: "card-4",
    name: "Mewtwo ex SAR",
    set: "151",
    number: "206/165",
    rarity: "SAR",
    grade: null,
    gradingCompany: null,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=400&fit=crop",
    currentPrice: 890,
    purchasePrice: 780,
    priceChange: 14.1,
    language: "JP",
  },
  {
    id: "card-5",
    name: "Umbreon VMAX Alt Art",
    set: "Evolving Skies",
    number: "215/203",
    rarity: "Alt Art",
    grade: "PSA 9",
    gradingCompany: "PSA",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    currentPrice: 3200,
    purchasePrice: 2100,
    priceChange: 52.4,
    language: "EN",
  },
]

const sortOptions = [
  { id: "acquired", label: "Acquired Time" },
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

  const totalCards = myCards.length
  const totalValue = myCards.reduce((sum, c) => sum + c.currentPrice, 0)

  const formatPrice = (p: number) => `$${p.toFixed(2)}`

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
          <div className="absolute right-4 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setViewMode(v => v === "grid" ? "list" : "grid")}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {viewMode === "grid"
                  ? <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>
                  : <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>
                }
              </svg>
            </Button>
          </div>
        </div>
      </header>

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

      {/* Sort & Filter bar */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">My Cards</h2>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 text-xs text-muted-foreground"
            onClick={() => setShowSortSheet(true)}
          >
            <span>{sortOptions.find(s => s.id === selectedSort)?.label}</span>
            <ChevronDown className="size-3.5" />
          </button>
          <button className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
            <SlidersHorizontal className="size-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Card Grid */}
      <div className={`px-4 ${viewMode === "grid" ? "grid grid-cols-3 gap-2.5" : "flex flex-col gap-2"}`}>
        {myCards.map((card) => (
          <Link key={card.id} href={`/card/${card.id}`}>
            {viewMode === "grid" ? (
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <div className="relative aspect-[3/4]">
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
                <div className="relative w-14 h-20 rounded-lg overflow-hidden shrink-0">
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
