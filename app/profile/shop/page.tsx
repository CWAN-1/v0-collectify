"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Plus,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  TrendingUp,
  Package,
  DollarSign,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "总销售额",
    value: "Rp 125.5M",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-success",
  },
  {
    label: "总订单",
    value: "234",
    change: "+8.2%",
    icon: Package,
    color: "text-primary",
  },
  {
    label: "商品浏览",
    value: "5.6K",
    change: "+15.3%",
    icon: Eye,
    color: "text-accent",
  },
  {
    label: "店铺粉丝",
    value: "1.2K",
    change: "+5.1%",
    icon: Users,
    color: "text-chart-5",
  },
]

const tabs = [
  { id: "all", label: "全部" },
  { id: "active", label: "在售" },
  { id: "sold", label: "已售" },
  { id: "draft", label: "草稿" },
]

const mockProducts = [
  {
    id: "1",
    title: "皮卡丘VMAX闪卡 - 25周年纪念版",
    image:
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop",
    price: 2500000,
    stock: 3,
    views: 1234,
    status: "active",
  },
  {
    id: "2",
    title: "喷火龙GX 彩虹闪卡",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
    price: 4500000,
    stock: 0,
    views: 892,
    status: "sold",
  },
  {
    id: "3",
    title: "伊布全进化套卡",
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=200&h=200&fit=crop",
    price: 6800000,
    stock: 5,
    views: 567,
    status: "active",
  },
  {
    id: "4",
    title: "新品待上架...",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
    price: 0,
    stock: 1,
    views: 0,
    status: "draft",
  },
]

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  active: { label: "在售", variant: "default" },
  sold: { label: "已售罄", variant: "destructive" },
  draft: { label: "草稿", variant: "secondary" },
}

export default function ShopManagePage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts =
    activeTab === "all"
      ? mockProducts
      : mockProducts.filter((product) => product.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold">我的店铺</h1>
          </div>
          <Link href="/publish/product">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              上架商品
            </Button>
          </Link>
        </div>
      </header>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl bg-card p-4">
                <div className="flex items-center justify-between">
                  <Icon className={cn("h-5 w-5", stat.color)} />
                  <span className="flex items-center gap-0.5 text-xs text-success">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="mt-2 text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-4">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="px-4 py-4">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">暂无商品</p>
            <Link href="/publish/product">
              <Button className="mt-4 gap-1.5">
                <Plus className="h-4 w-4" />
                上架商品
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => {
              const statusInfo = statusConfig[product.status]
              return (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-xl bg-card p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-medium">
                          {product.title}
                        </h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="shrink-0 rounded-full p-1 hover:bg-secondary">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit2 className="mr-2 h-4 w-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              预览
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Badge variant={statusInfo.variant} className="mt-1 text-xs">
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-accent">
                        {product.price > 0
                          ? `Rp ${product.price.toLocaleString()}`
                          : "待定价"}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>库存: {product.stock}</span>
                        <span className="flex items-center gap-0.5">
                          <Eye className="h-3 w-3" />
                          {product.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
