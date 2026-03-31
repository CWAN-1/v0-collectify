"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, Star, Check, Minus, Plus, MessageCircle, ShoppingBag, ChevronRight, Flame, Shield } from "lucide-react"
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
    "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&h=600&fit=crop",
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
  hp: "330",
  type: "Pokemon-GX",
  abilities: [
    { name: "G-Max Volt Crash", damage: "300", description: "This attack does 30 damage to each of your opponent's Benched Pokemon." }
  ]
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
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground mb-1 text-balance">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              </div>
              <div className="bg-primary/20 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-primary">HP {product.hp}</span>
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

          {/* Card Ability */}
          <div className="mx-4 bg-secondary rounded-2xl p-4 mb-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">⚡</span>
              </div>
              <span className="font-semibold">{product.abilities[0].name}</span>
              <span className="ml-auto font-bold text-primary">{product.abilities[0].damage}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.abilities[0].description}
            </p>
          </div>

          {/* Specifications */}
          <div className="mx-4 bg-secondary rounded-2xl p-4 mb-4 border border-border">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="size-4 text-primary" />
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium text-green-400">{product.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Set</span>
                <span className="font-medium">{product.set}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number</span>
                <span className="font-medium">{product.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rarity</span>
                <span className="font-medium text-purple-400">{product.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language</span>
                <span className="font-medium">{product.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">{product.stock} left</span>
              </div>
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
