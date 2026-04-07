"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Heart, Check, Clock, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
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

        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
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

export default function AuctionsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  const filteredProducts = auctionProducts.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Gavel className="size-5 text-purple-500" />
            <span className="font-semibold text-lg">Live Auctions</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 pb-3">
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
      </header>

      <main className="px-4 pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} live auctions
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <AuctionCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
