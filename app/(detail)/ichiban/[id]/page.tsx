"use client"

import { useState } from "react"
import { ArrowLeft, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

// Prize grades with color coding - only letters, no "Last"
const gradeColors: Record<string, string> = {
  A: "text-yellow-400",
  B: "text-blue-400",
  C: "text-green-400",
  D: "text-orange-400",
  E: "text-purple-400",
  F: "text-pink-400",
  G: "text-cyan-400",
  H: "text-red-400",
  I: "text-lime-400",
  J: "text-amber-400",
  K: "text-indigo-400",
  L: "text-rose-400",
}

const ichibanProduct = {
  id: "ichiban-1",
  name: "Pokemon Scarlet & Violet Ichiban Kuji",
  seller: "PokeImport JP",
  sellerAvatar: "/cards/pokemon-1.jpg",
  bannerImage: "/cards/pokemon-2.jpg",
  pricePerDraw: 15,
  sets: [
    { 
      id: 1, 
      label: "Set 1/2", 
      total: 300, 
      remaining: 129,
      prizes: [
        { id: "prize-a-1", grade: "A", name: "Charizard ex SAR", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-1.jpg", marketPrice: 28.8, cardId: "1" },
        { id: "prize-b-1", grade: "B", name: "Pikachu VMAX Rainbow", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-2.jpg", marketPrice: 28.8, cardId: "2" },
        { id: "prize-c-1", grade: "C", name: "Umbreon VMAX Alt Art", total: 1, remaining: 1, sold: false, probability: 0.78, image: "/cards/pokemon-1.jpg", marketPrice: 28.8, cardId: "3" },
        { id: "prize-d-1", grade: "D", name: "Gengar VMAX Rainbow", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-2.jpg", marketPrice: 28.8, cardId: "4" },
        { id: "prize-e-1", grade: "E", name: "Sylveon VMAX Alt Art", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-1.jpg", marketPrice: 28.8, cardId: "5" },
        { id: "prize-f-1", grade: "F", name: "Mewtwo VSTAR Rainbow", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-2.jpg", marketPrice: 28.8, cardId: "6" },
        { id: "prize-g-1", grade: "G", name: "Rayquaza VMAX", total: 1, remaining: 1, sold: false, probability: 0.78, image: "/cards/pokemon-1.jpg", marketPrice: 28.8, cardId: "7" },
        { id: "prize-h-1", grade: "H", name: "Mew VMAX Alt Art", total: 1, remaining: 0, sold: true, probability: null, image: "/cards/pokemon-2.jpg", marketPrice: 28.8, cardId: "8" },
        { id: "prize-i-1", grade: "I", name: "Dragonite V Alt Art", total: 60, remaining: 21, sold: false, probability: 16.28, image: "/cards/pokemon-1.jpg", marketPrice: 8.64, cardId: "9" },
      ]
    },
    { 
      id: 2, 
      label: "Set 2", 
      total: 300, 
      remaining: 255,
      prizes: [
        { id: "prize-a-2", grade: "A", name: "Lugia V Alt Art", total: 1, remaining: 1, sold: false, probability: 0.39, image: "/cards/pokemon-2.jpg", marketPrice: 35.0, cardId: "10" },
        { id: "prize-b-2", grade: "B", name: "Giratina VSTAR", total: 1, remaining: 1, sold: false, probability: 0.39, image: "/cards/pokemon-1.jpg", marketPrice: 32.0, cardId: "11" },
        { id: "prize-c-2", grade: "C", name: "Arceus VSTAR Rainbow", total: 2, remaining: 2, sold: false, probability: 0.78, image: "/cards/pokemon-2.jpg", marketPrice: 25.0, cardId: "12" },
        { id: "prize-d-2", grade: "D", name: "Palkia VSTAR", total: 2, remaining: 1, sold: false, probability: 0.39, image: "/cards/pokemon-1.jpg", marketPrice: 22.0, cardId: "13" },
        { id: "prize-e-2", grade: "E", name: "Dialga VSTAR", total: 3, remaining: 3, sold: false, probability: 1.17, image: "/cards/pokemon-2.jpg", marketPrice: 18.0, cardId: "14" },
        { id: "prize-f-2", grade: "F", name: "Espeon VMAX", total: 5, remaining: 4, sold: false, probability: 1.56, image: "/cards/pokemon-1.jpg", marketPrice: 15.0, cardId: "15" },
        { id: "prize-g-2", grade: "G", name: "Leafeon VMAX", total: 10, remaining: 8, sold: false, probability: 3.13, image: "/cards/pokemon-2.jpg", marketPrice: 12.0, cardId: "16" },
        { id: "prize-h-2", grade: "H", name: "Glaceon VMAX", total: 20, remaining: 18, sold: false, probability: 7.03, image: "/cards/pokemon-1.jpg", marketPrice: 10.0, cardId: "17" },
        { id: "prize-i-2", grade: "I", name: "Flareon VMAX", total: 50, remaining: 45, sold: false, probability: 17.58, image: "/cards/pokemon-2.jpg", marketPrice: 6.0, cardId: "18" },
        { id: "prize-j-2", grade: "J", name: "Jolteon VMAX", total: 80, remaining: 72, sold: false, probability: 28.13, image: "/cards/pokemon-1.jpg", marketPrice: 4.0, cardId: "19" },
        { id: "prize-k-2", grade: "K", name: "Vaporeon VMAX", total: 126, remaining: 100, sold: false, probability: 39.06, image: "/cards/pokemon-2.jpg", marketPrice: 3.0, cardId: "20" },
      ]
    },
    { 
      id: 3, 
      label: "Set 3", 
      total: 200, 
      remaining: 180,
      prizes: [
        { id: "prize-a-3", grade: "A", name: "Mewtwo GX Rainbow", total: 1, remaining: 1, sold: false, probability: 0.56, image: "/cards/pokemon-1.jpg", marketPrice: 40.0, cardId: "21" },
        { id: "prize-b-3", grade: "B", name: "Blastoise VMAX", total: 1, remaining: 1, sold: false, probability: 0.56, image: "/cards/pokemon-2.jpg", marketPrice: 30.0, cardId: "22" },
        { id: "prize-c-3", grade: "C", name: "Venusaur VMAX", total: 2, remaining: 2, sold: false, probability: 1.11, image: "/cards/pokemon-1.jpg", marketPrice: 25.0, cardId: "23" },
        { id: "prize-d-3", grade: "D", name: "Snorlax VMAX", total: 5, remaining: 5, sold: false, probability: 2.78, image: "/cards/pokemon-2.jpg", marketPrice: 18.0, cardId: "24" },
        { id: "prize-e-3", grade: "E", name: "Slowpoke & Psyduck", total: 10, remaining: 9, sold: false, probability: 5.0, image: "/cards/pokemon-1.jpg", marketPrice: 12.0, cardId: "25" },
        { id: "prize-f-3", grade: "F", name: "Common Promo Pack", total: 181, remaining: 162, sold: false, probability: 90.0, image: "/cards/pokemon-2.jpg", marketPrice: 2.0, cardId: "26" },
      ]
    },
  ],
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price)
}

type Tab = "preview" | "records"

export default function IchibanDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("preview")
  const [selectedSet, setSelectedSet] = useState(0)

  const currentSet = ichibanProduct.sets[selectedSet]
  const remainingPct = Math.round((currentSet.remaining / currentSet.total) * 100)
  const currentPrizes = currentSet.prizes

  // Buy options
  const buyOptions = [
    { label: "Buy All", sublabel: formatPrice(currentSet.remaining * ichibanProduct.pricePerDraw), count: currentSet.remaining },
    { label: "Buy 10", sublabel: formatPrice(10 * ichibanProduct.pricePerDraw), count: 10 },
    { label: "Buy 3", sublabel: formatPrice(3 * ichibanProduct.pricePerDraw), count: 3 },
    { label: "Buy 1", sublabel: formatPrice(1 * ichibanProduct.pricePerDraw), count: 1 },
  ]

  const handleBuy = (count: number) => {
    router.push(`/checkout?type=ichiban&id=${ichibanProduct.id}&set=${currentSet.id}&count=${count}&price=${count * ichibanProduct.pricePerDraw}`)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 shrink-0" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="flex-1 text-sm font-semibold truncate">{ichibanProduct.name}</h1>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" className="size-9">
              <RefreshCw className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-9">
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(["preview", "records"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-foreground border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "preview" ? "Product Preview" : "Records"}
            </button>
          ))}
        </div>
      </header>

      {activeTab === "records" ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-sm gap-2">
          <p>No draw records yet.</p>
        </div>
      ) : (
        <>
          {/* Banner Image */}
          <div className="relative w-full aspect-[2.5/1]">
            <Image 
              src={ichibanProduct.bannerImage} 
              alt={ichibanProduct.name} 
              fill 
              className="object-cover" 
            />
          </div>

          {/* Set Selector - Scrollable */}
          <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
            {ichibanProduct.sets.map((set, idx) => (
              <button
                key={set.id}
                onClick={() => setSelectedSet(idx)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors min-w-[100px] ${
                  selectedSet === idx
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                <div className="text-base font-bold leading-tight">
                  {set.remaining}
                  <span className="text-xs font-normal">/{set.total}</span>
                </div>
                <div className="text-[10px] mt-0.5 opacity-80">Remaining · {set.label}</div>
              </button>
            ))}
          </div>

          {/* Remaining progress */}
          <div className="px-4 pb-3">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all"
                style={{ width: `${remainingPct}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{currentSet.remaining} tickets remaining</p>
          </div>

          {/* Prize Grid */}
          <div className="px-3 grid grid-cols-3 gap-2">
            {currentPrizes.map((prize) => (
              <div key={prize.id} className="bg-card rounded-xl overflow-hidden border border-border">
                {/* Image - click navigates to card info page */}
                <Link href={`/card/${prize.cardId}`}>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={prize.image}
                      alt={prize.name}
                      fill
                      className="object-cover"
                    />

                    {/* Sold out overlay */}
                    {prize.sold && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-[10px] font-semibold border border-white/60 px-2 py-0.5 rounded">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Probability badge top-right */}
                    {prize.probability && !prize.sold && (
                      <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[9px] font-semibold px-1 py-0.5 rounded">
                        {prize.probability}%
                      </div>
                    )}

                    {/* Grade label bottom-left */}
                    <div className="absolute bottom-1 left-1.5 flex items-end gap-0.5">
                      <span className={`text-xl font-black leading-none ${gradeColors[prize.grade] ?? "text-white"} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}>
                        {prize.grade}
                      </span>
                      <span className="text-white text-[8px] font-bold leading-none mb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Prize
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Info below image */}
                <div className="px-2 pt-1.5 pb-2">
                  {/* Stock count */}
                  <p className="text-[9px] text-muted-foreground mb-0.5">
                    {prize.remaining}/{prize.total}
                  </p>
                  {/* Name */}
                  <p className="text-[10px] font-semibold text-foreground leading-tight truncate">
                    {prize.name}
                  </p>
                  {/* Market price */}
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    Market Ref. {formatPrice(prize.marketPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Buy Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex">
          {buyOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleBuy(opt.count)}
              className={`flex-1 py-3 flex flex-col items-center justify-center transition-colors active:opacity-80 ${
                i === 0
                  ? "bg-yellow-500 text-black"
                  : "bg-card text-foreground border-l border-border"
              }`}
            >
              <span className="text-[10px] font-medium leading-tight">{opt.label}</span>
              <span className={`text-xs font-bold leading-tight mt-0.5 ${i === 0 ? "text-black" : "text-primary"}`}>
                {opt.sublabel}
              </span>
            </button>
          ))}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
