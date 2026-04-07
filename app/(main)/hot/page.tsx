"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Heart, Star, Check, Flame } from "lucide-react"
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

const hotProducts = [
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
    isVerified: true,
    category: "pokemon",
    trend: "+15%"
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/cards/pokemon-2.jpg",
    seller: "VintageCards",
    rating: 4.9,
    sold: 12,
    condition: "Excellent",
    isVerified: true,
    category: "pokemon",
    trend: "+8%"
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
    isVerified: true,
    category: "yugioh",
    trend: "+22%"
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
    isVerified: false,
    category: "onepiece",
    trend: "+30%"
  },
  {
    id: "5",
    name: "LeBron James Rookie Card",
    price: 1500,
    image: "/cards/sports-1.jpg",
    seller: "SportsHub",
    rating: 5.0,
    sold: 23,
    condition: "Excellent",
    isVerified: true,
    category: "sports",
    trend: "+12%"
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
    isVerified: true,
    category: "mtg",
    trend: "+5%"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function ProductCard({ product }: { product: typeof hotProducts[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Hot Badge */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame className="size-2.5" />
            {product.trend}
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
          <div className="mt-2">
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
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

export default function HotPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  const filteredProducts = hotProducts.filter(product => 
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
            <Flame className="size-5 text-orange-500" />
            <span className="font-semibold text-lg">Hot Items</span>
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
          {filteredProducts.length} trending items
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
