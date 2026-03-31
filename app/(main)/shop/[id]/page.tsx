"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Share2, Star, Check, Minus, Plus, MessageCircle, ShoppingBag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

const product = {
  id: "1",
  name: "Pikachu VMAX Rainbow Rare - Vivid Voltage",
  price: 2500000,
  originalPrice: 3000000,
  images: [
    "/products/product-1.jpg",
    "/products/product-1-2.jpg",
    "/products/product-1-3.jpg",
    "/products/product-1-4.jpg",
  ],
  seller: {
    name: "CardMaster Jakarta",
    avatar: "/avatars/seller-1.jpg",
    rating: 4.9,
    totalSold: 1234,
    verified: true,
    responseTime: "< 1 jam"
  },
  condition: "Mint/Near Mint",
  set: "Vivid Voltage",
  number: "188/185",
  rarity: "Rainbow Rare",
  language: "English",
  description: "Kartu dalam kondisi sempurna, baru dibuka dari booster pack. Langsung dimasukkan ke sleeve dan toploader. Tidak ada whitening atau scratches.",
  rating: 4.9,
  reviews: 156,
  sold: 234,
  stock: 1,
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductDetailPage() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-background/80 backdrop-blur-sm rounded-full"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm rounded-full"
            >
              <Share2 className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLiked(!liked)}
              className="bg-background/80 backdrop-blur-sm rounded-full"
            >
              <Heart className={`size-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative aspect-square">
        <Image
          src={product.images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`size-2 rounded-full transition-all ${
                index === selectedImage ? "w-6 bg-foreground" : "bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-background rounded-t-3xl pt-6">
          {/* Title & Price */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-foreground mb-2 text-balance">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-foreground text-foreground" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} ulasan)</span>
            </div>
            <span className="text-muted-foreground">{product.sold} terjual</span>
          </div>

          {/* Specifications */}
          <div className="bg-muted rounded-2xl p-4 mb-6">
            <h3 className="font-semibold mb-3">Spesifikasi</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kondisi</span>
                <span className="font-medium">{product.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Set</span>
                <span className="font-medium">{product.set}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nomor</span>
                <span className="font-medium">{product.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rarity</span>
                <span className="font-medium">{product.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bahasa</span>
                <span className="font-medium">{product.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stok</span>
                <span className="font-medium">{product.stock}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Deskripsi</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Seller */}
          <Link href={`/seller/${product.seller.name}`} className="block">
            <div className="bg-muted rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.seller.name}</span>
                      {product.seller.verified && (
                        <div className="size-4 bg-foreground rounded-full flex items-center justify-center">
                          <Check className="size-2.5 text-background" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="size-3 fill-foreground text-foreground" />
                      <span>{product.seller.rating}</span>
                      <span>|</span>
                      <span>{product.seller.totalSold} terjual</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>
            </div>
          </Link>

          {/* Quantity */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold">Jumlah</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="size-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="size-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="size-14 rounded-2xl border-border">
            <MessageCircle className="size-5" />
          </Button>
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border gap-2">
            <ShoppingBag className="size-5" />
            Keranjang
          </Button>
          <Button className="flex-1 h-14 rounded-2xl">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
