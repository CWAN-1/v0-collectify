"use client"

import { useState } from "react"
import { ArrowLeft, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

// Prize grades with color coding matching the reference screenshot
const gradeColors: Record<string, string> = {
  A: "text-yellow-400",
  B: "text-blue-400",
  C: "text-green-400",
  D: "text-orange-400",
  E: "text-purple-400",
  F: "text-pink-400",
  G: "text-cyan-400",
  H: "text-red-400",
  Last: "text-yellow-500",
}

const ichibanProduct = {
  id: "ichiban-1",
  name: "Pokémon Scarlet & Violet Ichiban Kuji",
  seller: "PokeImport JP",
  sellerAvatar: "/cards/pokemon-1.jpg",
  pricePerDraw: 15,
  sets: [
    { id: 1, label: "Set 1/2", total: 300, remaining: 129 },
    { id: 2, label: "Set 2", total: 300, remaining: 255 },
  ],
  prizes: [
    {
      id: "prize-a",
      grade: "A",
      name: "Charizard ex SAR",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-1.jpg",
      marketPrice: 28.8,
      cardId: "1",
    },
    {
      id: "prize-b",
      grade: "B",
      name: "Pikachu VMAX Rainbow",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-2.jpg",
      marketPrice: 28.8,
      cardId: "2",
    },
    {
      id: "prize-c",
      grade: "C",
      name: "Umbreon VMAX Alt Art",
      total: 1,
      remaining: 1,
      sold: false,
      probability: 0.78,
      image: "/cards/pokemon-1.jpg",
      marketPrice: 28.8,
      cardId: "3",
    },
    {
      id: "prize-d",
      grade: "D",
      name: "Gengar VMAX Rainbow",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-2.jpg",
      marketPrice: 28.8,
      cardId: "4",
    },
    {
      id: "prize-e",
      grade: "E",
      name: "Sylveon VMAX Alt Art",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-1.jpg",
      marketPrice: 28.8,
      cardId: "5",
    },
    {
      id: "prize-f",
      grade: "F",
      name: "Mewtwo VSTAR Rainbow",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-2.jpg",
      marketPrice: 28.8,
      cardId: "6",
    },
    {
      id: "prize-g",
      grade: "G",
      name: "Rayquaza VMAX",
      total: 1,
      remaining: 1,
      sold: false,
      probability: 0.78,
      image: "/cards/pokemon-1.jpg",
      marketPrice: 28.8,
      cardId: "7",
    },
    {
      id: "prize-h",
      grade: "H",
      name: "Mew VMAX Alt Art",
      total: 1,
      remaining: 0,
      sold: true,
      probability: null,
      image: "/cards/pokemon-2.jpg",
      marketPrice: 28.8,
      cardId: "8",
    },
    {
      id: "prize-last",
      grade: "Last",
      name: "Full Set Display Board",
      total: 60,
      remaining: 21,
      sold: false,
      probability: 16.28,
      image: "/cards/pokemon-1.jpg",
      marketPrice: 8.64,
      cardId: "9",
      isFree: true,
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

  // Buy options
  const buyOptions = [
    { label: "Buy All", sublabel: formatPrice(ichibanProduct.prizes.length * ichibanProduct.pricePerDraw), all: true },
    { label: "Buy 10", sublabel: formatPrice(10 * ichibanProduct.pricePerDraw) },
    { label: "Buy 3", sublabel: formatPrice(3 * ichibanProduct.pricePerDraw) },
    { label: "Buy 1", sublabel: formatPrice(1 * ichibanProduct.pricePerDraw) },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 shrink-0" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          {/* Seller avatar + name */}
          <div className="relative size-8 rounded-full overflow-hidden shrink-0 border border-border">
            <Image src={ichibanProduct.sellerAvatar} alt={ichibanProduct.seller} fill className="object-cover" />
          </div>
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

        {/* Tabs: 商品预览 / 记录 */}
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
          {/* Set Selector */}
          <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {ichibanProduct.sets.map((set, idx) => (
              <button
                key={set.id}
                onClick={() => setSelectedSet(idx)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
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
            {ichibanProduct.prizes.map((prize) => (
              <div key={prize.id} className="bg-card rounded-xl overflow-hidden border border-border">
                {/* Image - click navigates to card detail */}
                <Link href={`/shop/${prize.cardId}`}>
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

                    {/* Free trial badge */}
                    {prize.isFree && (
                      <div className="absolute bottom-6 right-1.5 bg-yellow-500 text-black text-[8px] font-bold px-1.5 py-1 rounded-full leading-tight text-center">
                        Free<br/>Trial
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
