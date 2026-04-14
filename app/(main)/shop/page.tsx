"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, ArrowUpDown, Heart, Star, X, Check, Clock, TrendingUp, DollarSign, ChevronDown, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"

const ipCategories = [
  { id: "pokemon", label: "Pokemon", avatar: "/brands/pikachu.jpg" },
  { id: "yugioh", label: "Yu-Gi-Oh!", avatar: "/brands/yugioh.jpg" },
  { id: "onepiece", label: "One Piece", avatar: "/brands/luffy.jpg" },
  { id: "mtg", label: "MTG", avatar: "/brands/mtg.jpg" },
  { id: "sports", label: "Sports", avatar: "/brands/sports.jpg" },
  { id: "digimon", label: "Digimon", avatar: null },
  { id: "dragonball", label: "Dragon Ball", avatar: null },
  { id: "naruto", label: "Naruto", avatar: null },
]

const filterOptions = {
  category: ["All", "Single Card", "Set/Bundle", "Booster Pack", "Box", "Case"],
  saleStatus: ["All", "Fixed Price", "Auction"],
  graded: ["All", "Graded", "Ungraded"],
  gradingCompany: ["All", "PSA", "BGS", "CGC", "ACE Grading", "Beckett", "SGC"],
}

const sortOptions = [
  { id: "latest", label: "Latest", icon: TrendingUp },
  { id: "ending", label: "Ending Soon", icon: Clock },
  { id: "price-high", label: "Price: High to Low", icon: DollarSign },
  { id: "price-low", label: "Price: Low to High", icon: DollarSign },
]

const buyNowProducts = [
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
    endTime: new Date(Date.now() + 30 * 60 * 1000),
  },
]

const ichibanProducts = [
  {
    id: "ichiban-1",
    name: "Pokémon S&V Ichiban Kuji",
    pricePerDraw: 15,
    image: "/cards/pokemon-1.jpg",
    seller: "PokeImport JP",
    rating: 4.9,
    totalTickets: 100,
    remainingTickets: 67,
    isVerified: true,
    category: "pokemon",
  },
  {
    id: "ichiban-2",
    name: "One Piece Vol.4 Ichiban Kuji",
    pricePerDraw: 12,
    image: "/cards/onepiece-1.jpg",
    seller: "AnimeGoods JP",
    rating: 4.8,
    totalTickets: 80,
    remainingTickets: 24,
    isVerified: true,
    category: "onepiece",
  },
  {
    id: "ichiban-3",
    name: "Yu-Gi-Oh! 25th Anniversary Kuji",
    pricePerDraw: 18,
    image: "/cards/yugioh-1.jpg",
    seller: "YugiImport",
    rating: 4.7,
    totalTickets: 60,
    remainingTickets: 55,
    isVerified: false,
    category: "yugioh",
  },
  {
    id: "ichiban-4",
    name: "Pokémon Eevee Friends Kuji",
    pricePerDraw: 10,
    image: "/cards/pokemon-2.jpg",
    seller: "PokeImport JP",
    rating: 5.0,
    totalTickets: 120,
    remainingTickets: 3,
    isVerified: true,
    category: "pokemon",
  },
]

type ShopTab = "buynow" | "auction" | "ichiban"

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
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function AuctionCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime))
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(formatTimeLeft(endTime)), 1000)
    return () => clearInterval(timer)
  }, [endTime])
  return <span>{timeLeft}</span>
}

function BuyNowCard({ product }: { product: typeof buyNowProducts[0] }) {
  const [liked, setLiked] = useState(false)
  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          {product.isHot && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-accent text-white text-xs border-0">Hot</Badge>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{product.name}</h3>
          <span className="text-xs text-green-400">{product.condition}</span>
          <div className="mt-2">
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
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
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="size-2.5" />
            <AuctionCountdown endTime={product.endTime} />
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{product.name}</h3>
          <span className="text-xs text-green-400">{product.condition}</span>
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

function IchibanCard({ product }: { product: typeof ichibanProducts[0] }) {
  const [liked, setLiked] = useState(false)
  const soldPct = Math.round(((product.totalTickets - product.remainingTickets) / product.totalTickets) * 100)
  const isAlmostGone = product.remainingTickets <= 10

  return (
    <Link href={`/ichiban/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Ticket className="size-2.5" />
            Kuji
          </div>
          {isAlmostGone && (
            <div className="absolute bottom-2 left-2 right-2 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-1 rounded-lg text-center">
              Almost Gone! {product.remainingTickets} left
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-xs text-primary font-semibold mb-2">{formatPrice(product.pricePerDraw)} / draw</p>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: `${soldPct}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{product.remainingTickets} tickets left</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
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
  const [selectedIP, setSelectedIP] = useState("pokemon")
  const [activeTab, setActiveTab] = useState<ShopTab>("buynow")
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [selectedSort, setSelectedSort] = useState("latest")
  const [filters, setFilters] = useState({
    category: "All",
    saleStatus: "All",
    graded: "All",
    gradingCompany: "All",
  })
  const [ratingRange, setRatingRange] = useState([1, 10])

  const currentIP = ipCategories.find(c => c.id === selectedIP)

  const filteredBuyNow = buyNowProducts.filter(p => p.category === selectedIP)
  const filteredAuctions = auctionProducts.filter(p => p.category === selectedIP)
  const filteredIchiban = ichibanProducts.filter(p => p.category === selectedIP)

  const applyFilters = () => setShowFilterSheet(false)
  const resetFilters = () => {
    setFilters({ category: "All", saleStatus: "All", graded: "All", gradingCompany: "All" })
    setRatingRange([1, 10])
  }

  const tabs: { id: ShopTab; label: string }[] = [
    { id: "buynow", label: "Buy It Now" },
    { id: "auction", label: "Auction" },
    { id: "ichiban", label: "Ichiban Kuji" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="px-4 pt-12 pb-3">
          {/* Search Row */}
          <div className="flex items-center gap-3">
            {/* IP Category Button */}
            <button
              onClick={() => setShowCategoryDrawer(true)}
              className="flex items-center gap-1 shrink-0"
            >
              <span className="text-base font-bold text-foreground">{currentIP?.label}</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>

            {/* Search */}
            <Link href="/search?tab=products" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <div className="h-9 pl-9 pr-4 rounded-xl bg-card border border-border text-sm flex items-center text-muted-foreground">
                  Search
                </div>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative shrink-0">
              <Button variant="ghost" size="icon" className="size-9 bg-card border border-border rounded-xl">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

        {/* Tab Row */}
        <div className="px-4 pb-0">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort */}
        <div className="px-4 py-2.5">
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

      {/* Spacer */}
      <div className="h-44" />

      {/* Content */}
      <main className="px-4 pt-2">
        {activeTab === "buynow" && (
          <>
            <p className="text-sm text-muted-foreground mb-4">{filteredBuyNow.length} items found</p>
            {filteredBuyNow.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredBuyNow.map((product) => (
                  <BuyNowCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="size-7 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">No listings found</p>
                <p className="text-xs text-muted-foreground">Try a different category</p>
              </div>
            )}
          </>
        )}

        {activeTab === "auction" && (
          <>
            <p className="text-sm text-muted-foreground mb-4">{filteredAuctions.length} auctions found</p>
            {filteredAuctions.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredAuctions.map((product) => (
                  <AuctionCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Clock className="size-7 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">No active auctions</p>
                <p className="text-xs text-muted-foreground">Check back later</p>
              </div>
            )}
          </>
        )}

        {activeTab === "ichiban" && (
          <>
            <p className="text-sm text-muted-foreground mb-4">{filteredIchiban.length} Kuji found</p>
            {filteredIchiban.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredIchiban.map((product) => (
                  <IchibanCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Ticket className="size-7 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">No Ichiban Kuji available</p>
                <p className="text-xs text-muted-foreground">Try a different category</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Category Drawer (left side) */}
      <Sheet open={showCategoryDrawer} onOpenChange={setShowCategoryDrawer}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-4 py-4 border-b border-border">
            <SheetTitle className="text-base text-left">Select Category</SheetTitle>
            <SheetDescription className="sr-only">Choose an IP category to browse</SheetDescription>
          </SheetHeader>
          <div className="py-2">
            {ipCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedIP(cat.id)
                  setShowCategoryDrawer(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  selectedIP === cat.id ? "bg-primary/10 text-primary" : "text-foreground"
                }`}
              >
                {cat.avatar ? (
                  <div className="size-9 rounded-xl overflow-hidden shrink-0 border border-border">
                    <Image src={cat.avatar} alt={cat.label} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="size-9 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                    <span className="text-xs font-bold text-muted-foreground">{cat.label.slice(0, 2)}</span>
                  </div>
                )}
                <span className="text-sm font-medium">{cat.label}</span>
                {selectedIP === cat.id && <Check className="size-4 text-primary ml-auto" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl px-0">
          <SheetHeader className="border-b border-border pb-3 px-4">
            <SheetTitle className="text-center text-base">Filter</SheetTitle>
            <SheetDescription className="sr-only">Filter products by category, status and condition</SheetDescription>
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
            <SheetDescription className="sr-only">Sort products by different criteria</SheetDescription>
          </SheetHeader>
          <div className="py-3 space-y-2">
            {sortOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => { setSelectedSort(option.id); setShowSortSheet(false) }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${
                    selectedSort === option.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-secondary border border-transparent"
                  }`}
                >
                  <Icon className="size-5 text-muted-foreground" />
                  <span className="flex-1 text-left text-sm font-medium">{option.label}</span>
                  {selectedSort === option.id && <Check className="size-5 text-primary" />}
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
