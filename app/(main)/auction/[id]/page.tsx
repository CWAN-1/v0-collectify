"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, Check, MessageCircle, ChevronRight, Info, Truck, AlertCircle, Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const auctionProduct = {
  id: "auction-1",
  name: "(EN) Temporal Forces Walking Wake ex 215 Hyper Rare",
  subtitle: "Scarlet & Violet - Temporal Forces",
  currentBid: 225,
  startPrice: 100,
  shippingFee: 33,
  images: [
    "/cards/pokemon-1.jpg",
    "/cards/pokemon-2.jpg",
  ],
  seller: {
    name: "Aldra",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    location: "United States",
    followers: 9,
    totalSold: 30,
    positiveRate: 100.0,
    verified: false,
  },
  condition: "A-Near Mint or Better: Like New Item",
  conditionGrade: "A",
  shippingMethod: "Express",
  rarity: "Hyper Rare",
  cardType: "Holo",
  description: "Nama Set: Scarlet & Violet—Temporal Forces\nNomor Kartu: 215/162\nKelangkaan: Hyper Rare (Sangat Langka)\nTipe: Basic Pokemon, tipe Air...",
  endTime: new Date(Date.now() + 11 * 1000), // 11 seconds from now for demo
  bidCount: 7,
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = endTime.getTime()
      const diff = Math.max(0, end - now)
      
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeLeft({ minutes, seconds })
      
      if (diff <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <span className="text-primary font-semibold">
      {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
    </span>
  )
}

export default function AuctionDetailPage() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-12 pb-4 bg-background/95 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-card/80 backdrop-blur-sm rounded-full border border-border"
          >
            <ArrowLeft className="size-5" />
          </Button>
          
          {/* Countdown in Header */}
          <div className="flex items-center gap-1.5">
            <Clock className="size-4 text-primary" />
            <CountdownTimer endTime={auctionProduct.endTime} />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLiked(!liked)}
              className="bg-card/80 backdrop-blur-sm rounded-full border border-border"
            >
              <Heart className={`size-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-card/80 backdrop-blur-sm rounded-full border border-border"
            >
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative aspect-square bg-muted pt-20">
        <Image
          src={auctionProduct.images[selectedImage]}
          alt={auctionProduct.name}
          fill
          className="object-contain p-4"
          priority
        />
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {selectedImage + 1}/{auctionProduct.images.length}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-card px-4 py-4 border-b border-border">
        {/* Name */}
        <h1 className="text-lg font-bold text-foreground mb-2 text-balance">
          {auctionProduct.name}
        </h1>
        
        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(auctionProduct.currentBid)}
            </span>
          </div>
          <div className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
            {auctionProduct.bidCount} bids
          </div>
        </div>
        
        {/* Shipping Fee */}
        <p className="text-sm text-muted-foreground mt-1">
          +{formatPrice(auctionProduct.shippingFee)} shipping
        </p>
      </div>

      {/* Auction Countdown Banner */}
      <div className="bg-secondary px-4 py-3 flex items-center justify-center gap-2 border-b border-border">
        <Clock className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Auction ends in</span>
        <CountdownTimer endTime={auctionProduct.endTime} />
      </div>

      {/* Seller Info */}
      <div className="bg-card px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border-2 border-border">
              <AvatarImage src={auctionProduct.seller.avatar} />
              <AvatarFallback>{auctionProduct.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">{auctionProduct.seller.name}</span>
                {auctionProduct.seller.verified && (
                  <div className="size-4 bg-primary rounded-full flex items-center justify-center">
                    <Check className="size-2.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {auctionProduct.seller.location} | {auctionProduct.seller.followers} followers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs border-primary text-primary">
              Follow
            </Button>
            <Button variant="outline" size="icon" className="size-8 rounded-full border-border">
              <MessageCircle className="size-4" />
            </Button>
          </div>
        </div>
        {/* Seller Stats */}
        <div className="flex items-center gap-1 mt-3 text-sm">
          <span className="text-muted-foreground">{auctionProduct.seller.totalSold} sold</span>
          <span className="text-muted-foreground mx-1">|</span>
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-green-400 font-medium">{auctionProduct.seller.positiveRate}% positive</span>
        </div>
      </div>

      {/* Condition / Rating */}
      <div className="bg-card px-4 py-3.5 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rating / Condition</span>
          <div className="flex items-center gap-2">
            <div className="size-5 bg-green-500 rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{auctionProduct.conditionGrade}</span>
            </div>
            <span className="text-sm text-foreground">{auctionProduct.condition}</span>
            <Info className="size-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-card px-4 py-3.5 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Shipping Method</span>
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            <span className="text-sm text-foreground">{auctionProduct.shippingMethod}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card px-4 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
        <div className="flex gap-2 mb-3">
          <span className="inline-block bg-secondary text-xs text-foreground px-2.5 py-1 rounded-md border border-border">
            {auctionProduct.rarity}
          </span>
          <span className="inline-block bg-secondary text-xs text-foreground px-2.5 py-1 rounded-md border border-border">
            {auctionProduct.cardType}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {auctionProduct.description}
        </p>
        <button className="flex items-center gap-1 mt-2 text-sm text-primary">
          Show more <ChevronRight className="size-4" />
        </button>
      </div>

      {/* List Similar */}
      <div className="bg-card px-4 py-3.5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xs">&#128205;</span>
            </div>
            <span className="text-sm text-foreground">List Similar Item</span>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>
      </div>

      {/* Notice */}
      <div className="bg-card px-4 py-4">
        <div className="flex items-start gap-2 mb-2">
          <AlertCircle className="size-4 text-muted-foreground mt-0.5 shrink-0" />
          <span className="text-sm font-semibold text-foreground">Notice</span>
        </div>
        <ol className="text-xs text-muted-foreground space-y-1.5 pl-6">
          <li>1. Due to the special nature of this product, returns and exchanges are not supported after purchase.</li>
          <li>2. If you win the auction, payment must be completed within 3 days, otherwise the account will be frozen.</li>
          <li>3. The highest bid at the end of the auction wins.</li>
        </ol>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
        <div className="flex gap-2 p-3 max-w-md mx-auto">
          <Button variant="outline" size="icon" className="size-11 rounded-xl border-border bg-secondary shrink-0">
            <HelpCircle className="size-5" />
          </Button>
          <Button className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold gap-2">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Place Bid
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
