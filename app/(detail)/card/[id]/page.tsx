"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, ComposedChart } from "recharts"

// Mock card data
const cardData = {
  id: "1",
  name: "Charizard ex SAR",
  set: "Scarlet & Violet - Obsidian Flames",
  number: "215/197",
  rarity: "Special Art Rare",
  type: "Fire",
  language: "Japanese",
  image: "/cards/pokemon-1.jpg",
  marketPrice: 285.00,
  priceChange: 12.5,
  priceChangePercent: 4.6,
}

// Price history data
const priceHistoryData = [
  { date: "Jan", price: 240, volume: 45 },
  { date: "Feb", price: 255, volume: 52 },
  { date: "Mar", price: 248, volume: 38 },
  { date: "Apr", price: 265, volume: 60 },
  { date: "May", price: 272, volume: 55 },
  { date: "Jun", price: 285, volume: 48 },
]

// Auction listings
const auctionListings = [
  {
    id: "a1",
    seller: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 4.9, sales: 1250 },
    currentBid: 265,
    bids: 12,
    endTime: "2h 15m",
    condition: "PSA 10",
    image: "/cards/pokemon-1.jpg",
  },
  {
    id: "a2",
    seller: { name: "PokeFan99", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 4.7, sales: 890 },
    currentBid: 248,
    bids: 8,
    endTime: "5h 30m",
    condition: "BGS 9.5",
    image: "/cards/pokemon-1.jpg",
  },
  {
    id: "a3",
    seller: { name: "TCGDeals", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4.8, sales: 2100 },
    currentBid: 255,
    bids: 15,
    endTime: "1d 3h",
    condition: "Raw NM",
    image: "/cards/pokemon-1.jpg",
  },
]

// Fixed price listings
const fixedPriceListings = [
  {
    id: "f1",
    seller: { name: "PokeImport", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 5.0, sales: 3200 },
    price: 295,
    condition: "PSA 10",
    shipping: "Free",
    image: "/cards/pokemon-1.jpg",
  },
  {
    id: "f2",
    seller: { name: "CardKingdom", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 4.9, sales: 1800 },
    price: 280,
    condition: "CGC 9.5",
    shipping: "$5.99",
    image: "/cards/pokemon-1.jpg",
  },
  {
    id: "f3",
    seller: { name: "JapanCards", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", rating: 4.8, sales: 950 },
    price: 268,
    condition: "Raw NM+",
    shipping: "$12.00",
    image: "/cards/pokemon-1.jpg",
  },
  {
    id: "f4",
    seller: { name: "CollectorHub", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 4.6, sales: 620 },
    price: 275,
    condition: "PSA 9",
    shipping: "Free",
    image: "/cards/pokemon-1.jpg",
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function CardInfoPage() {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [timeRange, setTimeRange] = useState<"1W" | "1M" | "3M" | "1Y" | "ALL">("3M")

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 absolute left-4" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-sm font-semibold">Card Info</h1>
          <div className="absolute right-4 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-9" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`size-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="size-9">
              <Share2 className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Card Info Section */}
      <div className="p-4">
        <div className="flex gap-4">
          {/* Card Image */}
          <div className="relative w-28 aspect-[3/4] rounded-xl overflow-hidden shrink-0 border border-border">
            <Image src={cardData.image} alt={cardData.name} fill className="object-cover" />
          </div>

          {/* Card Details */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-foreground leading-tight">{cardData.name}</h2>
            <p className="text-xs text-muted-foreground mt-1">{cardData.set}</p>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Number:</span>
                <span className="text-foreground">{cardData.number}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Rarity:</span>
                <span className="text-foreground">{cardData.rarity}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-foreground">{cardData.type}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Language:</span>
                <span className="text-foreground">{cardData.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Price */}
        <div className="mt-4 p-3 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Market Price</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">{formatPrice(cardData.marketPrice)}</span>
              <span className={`text-xs font-medium ${cardData.priceChange > 0 ? "text-green-500" : "text-red-500"}`}>
                {cardData.priceChange > 0 ? "+" : ""}{formatPrice(cardData.priceChange)} ({cardData.priceChangePercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Trend Chart */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Price Trend</h3>
          <div className="flex gap-1">
            {(["1W", "1M", "3M", "1Y", "ALL"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-3">
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={priceHistoryData}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                yAxisId="price"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `$${v}`}
                domain={['dataMin - 20', 'dataMax + 20']}
              />
              <YAxis 
                yAxisId="volume"
                orientation="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                hide
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "11px"
                }}
                formatter={(value: number, name: string) => [
                  name === "price" ? formatPrice(value) : value,
                  name === "price" ? "Price" : "Volume"
                ]}
              />
              <Bar yAxisId="volume" dataKey="volume" fill="hsl(var(--muted))" radius={[2, 2, 0, 0]} />
              <Line 
                yAxisId="price"
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Auction Listings */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Auctions</h3>
          <Link href="/auctions" className="text-xs text-primary">View All</Link>
        </div>

        <div className="space-y-2">
          {auctionListings.map((listing) => (
            <Link key={listing.id} href={`/auction/${listing.id}`}>
              <div className="flex gap-3 p-3 bg-card rounded-xl border border-border">
                <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden shrink-0">
                  <Image src={listing.image} alt="Card" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="relative size-5 rounded-full overflow-hidden">
                      <Image src={listing.seller.avatar} alt={listing.seller.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{listing.seller.name}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] text-muted-foreground">{listing.seller.rating}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Bid</p>
                      <p className="text-sm font-bold text-primary">{formatPrice(listing.currentBid)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">{listing.bids} bids</p>
                      <p className="text-xs font-medium text-orange-500">{listing.endTime} left</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{listing.condition}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fixed Price Listings */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Buy It Now</h3>
          <Link href="/shop" className="text-xs text-primary">View All</Link>
        </div>

        <div className="space-y-2">
          {fixedPriceListings.map((listing) => (
            <Link key={listing.id} href={`/shop/${listing.id}`}>
              <div className="flex gap-3 p-3 bg-card rounded-xl border border-border">
                <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden shrink-0">
                  <Image src={listing.image} alt="Card" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="relative size-5 rounded-full overflow-hidden">
                      <Image src={listing.seller.avatar} alt={listing.seller.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{listing.seller.name}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] text-muted-foreground">{listing.seller.rating}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-bold text-green-500">{formatPrice(listing.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">{listing.condition}</p>
                      <p className="text-xs text-muted-foreground">{listing.shipping === "Free" ? "Free Shipping" : `+${listing.shipping}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
