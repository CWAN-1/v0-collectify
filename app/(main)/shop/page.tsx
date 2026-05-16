"use client"

import { useState, useEffect, useRef } from "react"
import { Search, SlidersHorizontal, Heart, Star, X, Check, Clock, TrendingUp, DollarSign, ChevronDown, Ticket, ShoppingCart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"

const ipCategories = [
  { id: "trading-card-games", label: "Trading Card Games", image: "https://images.pokemontcg.io/swsh4/188_hires.png" },
  { id: "books-movies", label: "Books & Movies", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop" },
  { id: "sports-cards", label: "Sports Cards", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop&crop=faces" },
  { id: "toys-hobbies", label: "Toys & Hobbies", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
  { id: "coins-money", label: "Coins & Money", image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=200&h=200&fit=crop" },
  { id: "memorabilia", label: "Memorabilia", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop" },
  { id: "mens-fashion", label: "Men's Fashion", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&h=200&fit=crop" },
  { id: "sneakers-shoes", label: "Sneakers & Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
  { id: "womens-fashion", label: "Women's Fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop" },
]

const filterOptions = {
  category: ["All", "Single Card", "Set/Bundle", "Booster Pack", "Box", "Case"],
  saleStatus: ["All", "Fixed Price", "Auction"],
  graded: ["All", "Graded", "Ungraded"],
  gradingCompany: ["All", "PSA", "BGS", "CGC", "ACE Grading", "Beckett", "SGC"],
}

const filterSections = [
  { id: "sort", label: "Sort By" },
  { id: "timeofshow", label: "Time of Show" },
  { id: "showformat", label: "Show Format" },
  { id: "tag", label: "Tag" },
  { id: "sellerrating", label: "Seller Rating" },
]

const shopLiveStreams = [
  { id: "live-1", user: { name: "pokepullzs", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop", title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODD...", viewers: 47, category: "Pokemon Cards", tags: ["Pokemon", "Giveaway"] },
  { id: "live-2", user: { name: "alexcardshop", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=400&h=500&fit=crop", title: "BIG GIVEAWAYIES WALL OF SEALED BREAK", viewers: 130, category: "Pokemon Cards", tags: ["$1 Starts", "Sealed"] },
  { id: "live-3", user: { name: "card_lair", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop", title: "Prismatic SPC Giveaways!!! $1 start sl...", viewers: 241, category: "Pokemon Cards", tags: ["Graded Cards"] },
  { id: "live-4", user: { name: "caascollectibles", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop", title: "WoTC - EX era $1 starts Giveaways", viewers: 101, category: "Pokemon Cards", tags: ["Vintage", "Sealed"] },
  { id: "live-5", user: { name: "mastersetgames", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop", title: "PSA 10 Graded Cards Showcase", viewers: 155, category: "Pokemon Cards", tags: ["PSA 10", "Graded"] },
  { id: "live-6", user: { name: "dungeonswipes", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" }, thumbnail: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=400&h=500&fit=crop", title: "$1 STARTS! DEALS DROPS STEALS", viewers: 118, category: "Pokemon Cards", tags: ["$1 Starts", "Limited"] },
]

const sortOptions = [
  { id: "latest", label: "Latest", icon: TrendingUp },
  { id: "ending", label: "Ending Soon", icon: Clock },
  { id: "price-high", label: "Price: High to Low", icon: DollarSign },
  { id: "price-low", label: "Price: Low to High", icon: DollarSign },
]

const buyNowProducts = [
  {
    id: "buynow-1",
    name: "Prismatic Evolutions Booster Box",
    price: 85,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop",
    seller: "PokeCards Pro",
    rating: 4.9,
    sales: 1230,
    isVerified: true,
    category: "pokemon",
  },
  {
    id: "buynow-2",
    name: "MTG Modern Masters 2024 Box",
    price: 120,
    image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=300&h=300&fit=crop",
    seller: "MTG Store",
    rating: 4.7,
    sales: 567,
    isVerified: true,
    category: "mtg",
  },
  {
    id: "buynow-3",
    name: "Sports Card Mystery Packs",
    price: 45,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
    seller: "Sports Collectibles",
    rating: 4.8,
    sales: 892,
    isVerified: false,
    category: "sports",
  },
  {
    id: "buynow-4",
    name: "Yu-Gi-Oh 25th Anniversary Collection",
    price: 95,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
    seller: "YugiShop Japan",
    rating: 4.6,
    sales: 445,
    isVerified: true,
    category: "yugioh",
  },
  {
    id: "buynow-5",
    name: "One Piece Card Singles Lot",
    price: 55,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop",
    seller: "AnimeCards JP",
    rating: 4.9,
    sales: 678,
    isVerified: true,
    category: "onepiece",
  },
  {
    id: "buynow-6",
    name: "Vintage Pokémon Base Set Pack",
    price: 250,
    image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=300&h=300&fit=crop",
    seller: "Vintage Cards Collector",
    rating: 5.0,
    sales: 312,
    isVerified: true,
    category: "pokemon",
  },
]

const auctionProducts = [
  {
    id: "auction-1",
    name: "Walking Wake ex Hyper Rare",
    currentBid: 225,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=300&h=300&fit=crop",
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
    currentBid: 350,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
    seller: "OnePieceCollector",
    bidCount: 23,
    condition: "Mint",
    isHot: true,
    isVerified: true,
    category: "pokemon",
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  {
    id: "auction-4",
    name: "Charizard Base Set Holographic",
    currentBid: 1200,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
    seller: "CardKing",
    bidCount: 45,
    condition: "Lightly Played",
    isHot: false,
    isVerified: true,
    category: "pokemon",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
]

const ichibanProducts = [
  {
    id: "ichiban-1",
    name: "Pokémon Scarlet & Violet Kuji",
    pricePerDraw: 15,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop",
    seller: "PokeGoods JP",
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
    image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
    seller: "PokeImport JP",
    rating: 5.0,
    totalTickets: 120,
    remainingTickets: 3,
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

type ShopTab = "live" | "buynow" | "auction" | "ichiban"

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
  const [activeTab, setActiveTab] = useState<ShopTab>("live")
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [selectedSort, setSelectedSort] = useState("latest")
  const tabPointerStartX = useRef(0)
  const [filters, setFilters] = useState({
    category: "All",
    saleStatus: "All",
    graded: "All",
    gradingCompany: "All",
  })
  const [ratingRange, setRatingRange] = useState([1, 10])

  const currentIP = ipCategories.find(c => c.id === selectedIP)

  const filteredBuyNow = buyNowProducts.filter(p => p.category === selectedIP)
  const filteredAuctions = auctionProducts.filter(p => !selectedIP || selectedIP === "all" || p.category === selectedIP)
  const filteredIchiban = ichibanProducts.filter(p => p.category === selectedIP)

  const applyFilters = () => setShowFilterSheet(false)
  const resetFilters = () => {
    setFilters({ category: "All", saleStatus: "All", graded: "All", gradingCompany: "All" })
    setRatingRange([1, 10])
  }

  const tabs: { id: ShopTab; label: string }[] = [
    { id: "live", label: "Live" },
    { id: "buynow", label: "Buy Now" },
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
            {/* IP Category Button — two-line style */}
            <button
              onClick={() => setShowCategoryDrawer(true)}
              className="flex items-center gap-1 shrink-0 max-w-[100px]"
            >
              <div className="flex flex-col items-start leading-tight min-w-0">
                <span className="text-[10px] text-muted-foreground font-medium">Categories</span>
                <span className="text-xs font-bold text-foreground truncate w-full">{currentIP?.label}</span>
              </div>
              <ChevronDown className="size-3.5 text-muted-foreground shrink-0" />
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
                <ShoppingCart className="size-4" />
                <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Row with Filter button on the left */}
        <div className="flex items-center gap-0 pb-0">
          {/* Filter button — rectangular, left of tabs */}
          <button
            onClick={() => setShowFilterSheet(true)}
            className="flex items-center gap-1.5 shrink-0 h-9 px-3 border-b-2 border-transparent text-muted-foreground mr-1"
          >
            <SlidersHorizontal className="size-3.5" />
            <span className="text-xs font-semibold">Filter</span>
          </button>
          {/* Tabs — pointer delegation avoids scroll-vs-click conflict on mobile */}
          <div
            className="flex flex-1 overflow-x-auto no-scrollbar"
            onPointerDown={(e) => { tabPointerStartX.current = e.clientX }}
            onPointerUp={(e) => {
              if (Math.abs(e.clientX - tabPointerStartX.current) >= 8) return
              const btn = (e.target as HTMLElement).closest("[data-tabid]")
              if (btn) setActiveTab(btn.getAttribute("data-tabid") as ShopTab)
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tabid={tab.id}
                className={`shrink-0 py-2.5 px-3 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap ${
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
      </header>

      {/* Spacer */}
      <div className="h-44" />

      {/* Content */}
      <main className="px-4 pt-2">
        {activeTab === "live" && (
          <div className="grid grid-cols-2 gap-3">
            {shopLiveStreams.map((stream) => (
              <Link href={`/live/${stream.id}`} key={stream.id} className="block">
                <div className="mb-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="size-5 rounded-full overflow-hidden bg-muted shrink-0">
                      <Image src={stream.user.avatar} alt={stream.user.name} width={20} height={20} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <span className="text-[10px] font-medium truncate text-foreground">{stream.user.name}</span>
                  </div>
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
                    <Image src={stream.thumbnail} alt={stream.title} fill className="object-cover" unoptimized />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <span>Live</span>
                      <span>•</span>
                      <span>{stream.viewers}</span>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <p className="text-[11px] font-semibold line-clamp-2 leading-tight">{stream.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{stream.tags.join(" • ")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "buynow" && (
          <>
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
        <SheetContent side="left" className="w-full p-0 flex flex-col">
          <SheetHeader className="px-4 py-4 border-b border-border shrink-0">
            <SheetTitle className="text-base text-left">Categories</SheetTitle>
            <SheetDescription className="sr-only">Browse all categories</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3">
              {ipCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedIP(cat.id)
                    setShowCategoryDrawer(false)
                  }}
                  className={`flex flex-col p-3 border-r border-b border-border transition-colors text-left ${
                    selectedIP === cat.id ? "bg-primary/10" : "bg-background hover:bg-muted/50"
                  }`}
                >
                  <span className="text-[11px] font-semibold text-foreground leading-tight mb-2 min-h-[28px]">{cat.label}</span>
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-muted">
                    <Image src={cat.image} alt={cat.label} width={120} height={120} className="w-full h-full object-cover" unoptimized />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Filter Sheet — 3/4 height, two-column layout */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl p-0 flex flex-col">
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-border shrink-0">
            <SheetTitle className="text-base font-bold">Filters</SheetTitle>
            <SheetDescription className="sr-only">Filter live streams and products</SheetDescription>
          </SheetHeader>

          {/* Two-column body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left nav column */}
            <div className="w-28 shrink-0 border-r border-border overflow-y-auto bg-muted/30">
              {filterSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(`filter-section-${section.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }}
                  className="w-full text-left px-3 py-3 text-xs text-muted-foreground hover:text-foreground transition-colors border-b border-border/40 leading-tight"
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Right scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">

              {/* Sort By */}
              <section id="filter-section-sort" className="mb-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Sort By</h4>
                {["Recommended", "Viewers: high to low", "Viewers: low to high"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 py-2 cursor-pointer">
                    <div className={`size-4 rounded-full border-2 flex items-center justify-center ${selectedSort === opt ? "border-primary" : "border-border"}`}>
                      {selectedSort === opt && <div className="size-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-sm text-foreground">{opt}</span>
                  </label>
                ))}
              </section>

              {/* Time of Show */}
              <section id="filter-section-timeofshow" className="mb-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Time of Show</h4>
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Live", count: "227" }, { label: "Upcoming", count: "82135" }].map(({ label, count }) => (
                    <button key={label} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground bg-background">
                      {label} <span className="text-primary font-bold ml-1">{count}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Show Format */}
              <section id="filter-section-showformat" className="mb-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Show Format</h4>
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Breaks", count: "19335" }, { label: "Graded", count: "1" }, { label: "Singles", count: "55367" }, { label: "Surprise Sets", count: "7629" }].map(({ label, count }) => (
                    <button key={label} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground bg-background">
                      {label} <span className="text-primary font-bold ml-1">{count}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Tag */}
              <section id="filter-section-tag" className="mb-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Tag</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Pokemon", count: "52384" },
                    { label: "Vintage", count: "21804" },
                    { label: "Sudden Death", count: "20800" },
                    { label: "Graded Cards", count: "16292" },
                    { label: "$1 Starts", count: "15855" },
                    { label: "Pokemon 151", count: "9947" },
                    { label: "Destined Rivals", count: "5531" },
                    { label: "Prismatic Evolutions", count: "5105" },
                    { label: "Singles", count: "3560" },
                  ].map(({ label, count }) => (
                    <button key={label} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground bg-background">
                      {label} <span className="text-primary font-bold ml-1">{count}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Seller Rating */}
              <section id="filter-section-sellerrating" className="mb-6">
                <h4 className="text-sm font-bold text-foreground mb-3">Seller Rating</h4>
                {["5 stars", "4.5 & Up", "4.0 & Up"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 py-2 cursor-pointer">
                    <div className="size-4 rounded-full border-2 border-border flex items-center justify-center" />
                    <span className="text-sm text-foreground">{opt}</span>
                  </label>
                ))}
              </section>

            </div>
          </div>

          {/* Bottom actions */}
          <div className="px-4 py-3 border-t border-border flex gap-3 shrink-0 bg-background">
            <Button variant="outline" className="flex-1 h-10 rounded-xl text-sm" onClick={resetFilters}>
              Clear
            </Button>
            <Button className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-bold" onClick={applyFilters}>
              82k results
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
