"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, Star, Check, Minus, Plus, MessageCircle, ShoppingBag, ChevronRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

const product = {
  id: "1",
  name: "Pikachu VMAX Rainbow Rare",
  subtitle: "Vivid Voltage 188/185",
  price: 250,
  originalPrice: 300,
  images: [
    "/cards/pokemon-1.jpg",
    "/cards/pokemon-2.jpg",
    "/cards/yugioh-1.jpg",
  ],
  seller: {
    name: "CardMaster",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4.9,
    totalSold: 1234,
    verified: true,
    responseTime: "< 1 hour"
  },
  condition: "Mint/Near Mint",
  set: "Vivid Voltage",
  number: "188/185",
  rarity: "Rainbow Rare",
  language: "English",
  description: "Card in perfect condition, freshly pulled from booster pack. Immediately sleeved and put in toploader. No whitening or scratches.",
  rating: 4.9,
  reviews: 156,
  sold: 234,
  stock: 1,
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductDetailPage() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-card/80 backdrop-blur-sm rounded-full border border-border"
          >
            <ArrowLeft className="size-5" />
          </Button>
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
      <div className="relative aspect-square bg-gradient-to-b from-primary/20 to-background">
        <Image
          src={product.images[selectedImage]}
          alt={product.name}
          fill
          className="object-contain p-8"
          priority
        />
        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`size-2.5 rounded-full transition-all ${
                index === selectedImage ? "w-8 bg-primary" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 relative pb-28">
        <div className="bg-card rounded-t-3xl pt-6 border-t border-x border-border">
          {/* Title & Price */}
          <div className="px-4 mb-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground mb-1 text-balance">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="bg-destructive/20 text-destructive text-xs font-semibold px-2 py-1 rounded-full">
                -17%
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 px-4 mb-6">
            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="size-4 text-orange-500" />
              <span className="text-muted-foreground text-sm">{product.sold} sold</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mx-4 bg-secondary rounded-2xl p-4 mb-4 border border-border">
            <h3 className="font-semibold mb-3 text-sm">Specifications</h3>
            <div className="space-y-2.5">
              {[
                { label: "Condition", value: product.condition, className: "text-green-400" },
                { label: "Set", value: product.set, className: "" },
                { label: "Card Number", value: product.number, className: "" },
                { label: "Rarity", value: product.rarity, className: "text-purple-400" },
                { label: "Language", value: product.language, className: "" },
                { label: "Stock", value: `${product.stock} left`, className: "text-orange-400" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground shrink-0">{row.label}</span>
                  <span className={`font-medium text-right ml-4 ${row.className}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="px-4 mb-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Seller */}
          <Link href={`/seller/${product.seller.name}`} className="block mx-4">
            <div className="bg-secondary rounded-2xl p-4 mb-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.seller.name}</span>
                      {product.seller.verified && (
                        <div className="size-4 bg-primary rounded-full flex items-center justify-center">
                          <Check className="size-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="size-3 fill-yellow-500 text-yellow-500" />
                      <span>{product.seller.rating}</span>
                      <span className="text-border">|</span>
                      <span>{product.seller.totalSold} sold</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>
            </div>
          </Link>

          {/* Quantity */}
          <div className="flex items-center justify-between px-4 mb-6">
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="size-10 rounded-full bg-secondary border border-border flex items-center justify-center disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="size-10 rounded-full bg-secondary border border-border flex items-center justify-center disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
        <div className="flex gap-2 p-3 max-w-md mx-auto">
          <Button variant="outline" size="icon" className="size-11 rounded-xl border-border bg-secondary shrink-0">
            <MessageCircle className="size-5" />
          </Button>
          <Button variant="outline" className="h-11 px-3 rounded-xl border-border bg-secondary gap-1.5 shrink-0">
            <ShoppingBag className="size-4" />
            <span className="text-sm">Cart</span>
          </Button>
          <Button className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold">
            Buy Now
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
