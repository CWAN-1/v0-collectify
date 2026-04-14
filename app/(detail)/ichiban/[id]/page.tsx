"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Share2, Star, Check, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

const ichibanProduct = {
  id: "ichiban-1",
  name: "Pokémon Scarlet & Violet Ichiban Kuji",
  subtitle: "Premium Lottery - Limited Stock",
  pricePerDraw: 15,
  totalTickets: 100,
  remainingTickets: 67,
  image: "/cards/pokemon-1.jpg",
  seller: "PokeImport JP",
  rating: 4.9,
  totalSold: 240,
  isVerified: true,
  prizes: [
    { rank: "A Prize", name: "Pikachu Premium Figure (30cm)", quantity: 1, image: "/cards/pokemon-1.jpg" },
    { rank: "B Prize", name: "Charizard Acrylic Stand", quantity: 2, image: "/cards/pokemon-2.jpg" },
    { rank: "C Prize", name: "Eevee Plush Keychain", quantity: 5, image: "/cards/pokemon-1.jpg" },
    { rank: "D Prize", name: "Pokémon Card Pack (3 packs)", quantity: 10, image: "/cards/pokemon-2.jpg" },
    { rank: "E Prize", name: "Random Mini Figure", quantity: 30, image: "/cards/pokemon-1.jpg" },
    { rank: "Last Prize", name: "Full Set Display Board", quantity: 1, image: "/cards/pokemon-2.jpg" },
  ],
  description: "Official Pokémon Ichiban Kuji lottery imported directly from Japan. Each draw guarantees a prize. Limited to 100 tickets total.",
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function IchibanDetailPage() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [drawCount, setDrawCount] = useState(1)
  const [showDrawSheet, setShowDrawSheet] = useState(false)

  const progressPct = Math.round(
    ((ichibanProduct.totalTickets - ichibanProduct.remainingTickets) / ichibanProduct.totalTickets) * 100
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 absolute left-4" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-sm font-semibold">Ichiban Kuji</h1>
          <div className="absolute right-4 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-9">
              <Share2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Product Image */}
      <div className="relative aspect-square w-full bg-card">
        <Image
          src={ichibanProduct.image}
          alt={ichibanProduct.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
          Ichiban Kuji
        </div>
      </div>

      {/* Main Info */}
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground mb-1">{ichibanProduct.name}</h2>
        <p className="text-xs text-muted-foreground mb-3">{ichibanProduct.subtitle}</p>

        {/* Draw Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">{formatPrice(ichibanProduct.pricePerDraw)}</span>
          <span className="text-sm text-muted-foreground">/ draw</span>
        </div>

        {/* Ticket Progress */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Tickets Remaining</span>
            <span className="text-xs font-semibold text-foreground">
              {ichibanProduct.remainingTickets} / {ichibanProduct.totalTickets}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{progressPct}% sold</p>
        </div>
      </div>

      {/* Seller */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Package className="size-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{ichibanProduct.seller}</span>
              {ichibanProduct.isVerified && (
                <div className="size-3.5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="size-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-muted-foreground">{ichibanProduct.rating} · {ichibanProduct.totalSold} sold</span>
            </div>
          </div>
        </div>
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>

      {/* Prize List */}
      <div className="px-4 py-4 border-b border-border">
        <h3 className="text-sm font-semibold mb-3">Prize List</h3>
        <div className="space-y-2.5">
          {ichibanProduct.prizes.map((prize) => (
            <div key={prize.rank} className="flex items-center gap-3 p-2.5 bg-card rounded-xl border border-border">
              <div className="relative size-12 rounded-lg overflow-hidden shrink-0">
                <Image src={prize.image} alt={prize.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    {prize.rank}
                  </span>
                  <span className="text-[10px] text-muted-foreground">x{prize.quantity}</span>
                </div>
                <p className="text-xs font-medium text-foreground truncate">{prize.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold mb-2">Description</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{ichibanProduct.description}</p>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">Number of draws:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawCount(Math.max(1, drawCount - 1))}
              className="size-7 rounded-full border border-border flex items-center justify-center text-sm font-bold"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-semibold">{drawCount}</span>
            <button
              onClick={() => setDrawCount(Math.min(ichibanProduct.remainingTickets, drawCount + 1))}
              className="size-7 rounded-full border border-border flex items-center justify-center text-sm font-bold"
            >
              +
            </button>
          </div>
          <span className="ml-auto text-sm font-bold text-primary">
            {formatPrice(drawCount * ichibanProduct.pricePerDraw)}
          </span>
        </div>
        <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold">
          Draw {drawCount > 1 ? `${drawCount}x` : "Now"}
        </Button>
      </div>
    </div>
  )
}
