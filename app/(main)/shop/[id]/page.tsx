"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Check, Minus, Plus, MessageCircle, ShoppingCart, ChevronRight, Info, Truck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { PriceHistoryChart } from "@/components/price-history-chart"

const product = {
  id: "1",
  name: "Pikachu VMAX Rainbow Rare",
  subtitle: "Vivid Voltage 188/185",
  price: 250,
  originalPrice: 300,
  shippingFee: 15,
  images: [
    "/cards/pokemon-1.jpg",
    "/cards/pokemon-2.jpg",
    "/cards/yugioh-1.jpg",
  ],
  seller: {
    name: "CardMaster",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    location: "United States",
    followers: 156,
    totalSold: 1234,
    positiveRate: 98.5,
    verified: true,
  },
  condition: "A-Near Mint or Better: Like New Item",
  conditionGrade: "A",
  shippingMethod: "Express",
  rarity: "Rainbow Rare",
  description: "Card in perfect condition, freshly pulled from booster pack. Immediately sleeved and put in toploader. No whitening or scratches.",
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
  const { toast } = useToast()
  const [liked, setLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} x${quantity} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    router.push(`/checkout?product=${product.id}&quantity=${quantity}`)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
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
          <span className="text-base font-semibold text-foreground">Details</span>
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
          src={product.images[selectedImage]}
          alt={product.name}
          fill
          className="object-contain p-4"
          priority
        />
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {selectedImage + 1}/{product.images.length}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-card px-4 py-4 border-b border-border">
        {/* Name */}
        <h1 className="text-lg font-bold text-foreground mb-2 text-balance">
          {product.name}
        </h1>
        
        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
            Only {product.stock} left
          </div>
        </div>
        
        {/* Shipping Fee */}
        <p className="text-sm text-muted-foreground mt-1">
          +{formatPrice(product.shippingFee)} shipping
        </p>
        
        {/* Quantity */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-sm font-medium text-foreground">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="size-8 rounded-full bg-secondary border border-border flex items-center justify-center disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="font-semibold w-6 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              className="size-8 rounded-full bg-secondary border border-border flex items-center justify-center disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Condition / Rating */}
      <div className="bg-card px-4 py-3.5 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rating / Condition</span>
          <div className="flex items-center gap-2">
            <div className="size-5 bg-green-500 rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{product.conditionGrade}</span>
            </div>
            <span className="text-sm text-foreground">{product.condition}</span>
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
            <span className="text-sm text-foreground">{product.shippingMethod}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card px-4 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
        <div className="mb-3">
          <span className="inline-block bg-secondary text-xs text-foreground px-2.5 py-1 rounded-md border border-border">
            {product.rarity}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Price History Chart */}
      <PriceHistoryChart currentPrice={product.price} cardName={product.name} />

      {/* Seller Info */}
      <div className="bg-card px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border-2 border-border">
              <AvatarImage src={product.seller.avatar} />
              <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">{product.seller.name}</span>
                {product.seller.verified && (
                  <div className="size-4 bg-primary rounded-full flex items-center justify-center">
                    <Check className="size-2.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {product.seller.location} | {product.seller.followers} followers
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
          <span className="text-muted-foreground">{product.seller.totalSold} sold</span>
          <span className="text-muted-foreground mx-1">|</span>
          <span className="text-yellow-500">&#9733;</span>
          <span className="text-green-400 font-medium">{product.seller.positiveRate}% positive</span>
        </div>
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
          <li>2. Once the seller accepts your offer, payment must be completed within 3 days, otherwise the account will be frozen.</li>
          <li>3. Please inspect the product carefully upon receipt and report any issues within 24 hours.</li>
        </ol>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
        <div className="flex gap-2 p-3 max-w-md mx-auto">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="size-11 rounded-xl border-border bg-secondary shrink-0">
              <ShoppingCart className="size-5" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="h-11 px-4 rounded-xl border-border bg-secondary gap-1.5 shrink-0"
            onClick={handleAddToCart}
          >
            <Plus className="size-4" />
            <span className="text-sm">Add to Cart</span>
          </Button>
          <Button 
            className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-accent text-sm font-semibold"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  )
}
