"use client"

import { ProductCard } from "./product-card"

const mockProducts = [
  {
    id: "1",
    title: "皮卡丘VMAX闪卡 - 25周年纪念版",
    image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&h=400&fit=crop",
    price: 2500000,
    originalPrice: 3000000,
    seller: { name: "官方认证店", verified: true },
    condition: "完美品",
    hotScore: 95,
    category: "宝可梦",
    version: "S8a",
  },
  {
    id: "2",
    title: "梅西 2022世界杯冠军签名卡",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop",
    price: 15000000,
    seller: { name: "球星卡专营", verified: true },
    condition: "近完美",
    hotScore: 88,
    category: "球星卡",
    version: "Topps",
  },
  {
    id: "3",
    title: "青眼白龙 初版 日版",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop",
    price: 8500000,
    originalPrice: 10000000,
    seller: { name: "游戏王收藏馆", verified: true },
    condition: "优秀",
    hotScore: 82,
    category: "游戏王",
    version: "LOB",
  },
  {
    id: "4",
    title: "路飞 漫画封面纪念卡套装",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: 1800000,
    seller: { name: "海贼王专卖", verified: false },
    condition: "完美品",
    hotScore: 75,
    category: "海贼王",
    version: "OP-01",
  },
  {
    id: "5",
    title: "喷火龙GX 彩虹闪卡",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    price: 4500000,
    originalPrice: 5500000,
    seller: { name: "卡牌天地", verified: true },
    condition: "近完美",
    hotScore: 91,
    category: "宝可梦",
    version: "SM12a",
  },
  {
    id: "6",
    title: "C罗 曼联新秀卡 PSA 10",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop",
    price: 25000000,
    seller: { name: "足球卡收藏家", verified: true },
    condition: "完美品",
    hotScore: 85,
    category: "球星卡",
    version: "Panini",
  },
  {
    id: "7",
    title: "黑魔导女孩 20周年纪念",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop",
    price: 3200000,
    seller: { name: "决斗者商店", verified: false },
    condition: "优秀",
    hotScore: 78,
    category: "游戏王",
    version: "20AP",
  },
  {
    id: "8",
    title: "伊布全进化套卡",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop",
    price: 6800000,
    originalPrice: 8000000,
    seller: { name: "官方认证店", verified: true },
    condition: "完美品",
    hotScore: 89,
    category: "宝可梦",
    version: "S6a",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-4">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
