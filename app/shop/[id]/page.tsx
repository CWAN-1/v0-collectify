"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  Share2,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 模拟商品数据
const mockProduct = {
  id: "1",
  title: "皮卡丘VMAX闪卡 - 25周年纪念版",
  images: [
    "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=800&fit=crop",
  ],
  price: 2500000,
  originalPrice: 3000000,
  seller: {
    id: "s1",
    name: "官方认证店",
    avatar: "https://i.pravatar.cc/150?img=10",
    verified: true,
    rating: 4.9,
    sales: 1234,
  },
  condition: "完美品",
  category: "宝可梦",
  version: "S8a",
  description:
    "这是一张来自宝可梦25周年纪念系列的皮卡丘VMAX闪卡，品相完美，卡面无任何瑕疵。卡牌已经过专业评级机构认证，保证正品。适合收藏投资或个人收藏。",
  specs: [
    { label: "卡牌系列", value: "25周年纪念版" },
    { label: "版本号", value: "S8a 025/028" },
    { label: "稀有度", value: "RRR" },
    { label: "品相等级", value: "PSA 10" },
    { label: "语言", value: "日语" },
    { label: "发行年份", value: "2021" },
  ],
  stock: 3,
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const discount = mockProduct.originalPrice
    ? Math.round(
        ((mockProduct.originalPrice - mockProduct.price) /
          mockProduct.originalPrice) *
          100
      )
    : 0

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-4 py-3 backdrop-blur-lg">
        <Link
          href="/shop"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <Heart
              className={`h-5 w-5 ${liked ? "fill-accent text-accent" : ""}`}
            />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative aspect-square bg-secondary/50">
        <Image
          src={mockProduct.images[currentImage]}
          alt={mockProduct.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {mockProduct.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentImage === index
                  ? "w-6 bg-primary"
                  : "bg-card/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{mockProduct.category}</Badge>
          <Badge variant="outline">{mockProduct.version}</Badge>
          <Badge variant="outline">{mockProduct.condition}</Badge>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-foreground">
          {mockProduct.title}
        </h1>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-accent">
            Rp {mockProduct.price.toLocaleString()}
          </span>
          {mockProduct.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                Rp {mockProduct.originalPrice.toLocaleString()}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock */}
        <p className="mt-2 text-sm text-muted-foreground">
          库存: {mockProduct.stock} 件
        </p>

        {/* Seller */}
        <div className="mt-4 rounded-xl bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockProduct.seller.avatar} />
                <AvatarFallback>
                  {mockProduct.seller.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">
                    {mockProduct.seller.name}
                  </span>
                  {mockProduct.seller.verified && (
                    <ShieldCheck className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    <span>{mockProduct.seller.rating}</span>
                  </div>
                  <span>|</span>
                  <span>{mockProduct.seller.sales} 已售</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageCircle className="h-4 w-4" />
              联系卖家
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="mb-2 font-medium">商品描述</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {mockProduct.description}
          </p>
        </div>

        {/* Specs */}
        <div className="mt-4">
          <h3 className="mb-2 font-medium">商品规格</h3>
          <div className="rounded-xl bg-card">
            {mockProduct.specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-4 py-3 ${
                  index !== mockProduct.specs.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="text-sm text-muted-foreground">
                  {spec.label}
                </span>
                <span className="text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link
            href="/messages"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Button variant="outline" className="h-12 flex-1 text-base">
            加入购物车
          </Button>
          <Button className="h-12 flex-1 text-base">立即购买</Button>
        </div>
      </div>
    </div>
  )
}
