"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "all", label: "全部" },
  { id: "pending", label: "待付款" },
  { id: "shipped", label: "待发货" },
  { id: "received", label: "待收货" },
  { id: "completed", label: "已完成" },
]

const mockOrders = [
  {
    id: "ORD001",
    status: "received",
    statusLabel: "运送中",
    statusColor: "bg-primary",
    product: {
      title: "皮卡丘VMAX闪卡 - 25周年纪念版",
      image:
        "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop",
      price: 2500000,
      quantity: 1,
    },
    seller: "官方认证店",
    orderTime: "2024-01-15 10:30",
  },
  {
    id: "ORD002",
    status: "pending",
    statusLabel: "待付款",
    statusColor: "bg-warning",
    product: {
      title: "梅西 2022世界杯冠军签名卡",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
      price: 15000000,
      quantity: 1,
    },
    seller: "球星卡专营",
    orderTime: "2024-01-14 18:45",
  },
  {
    id: "ORD003",
    status: "completed",
    statusLabel: "已完成",
    statusColor: "bg-success",
    product: {
      title: "青眼白龙 初版 日版",
      image:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
      price: 8500000,
      quantity: 1,
    },
    seller: "游戏王收藏馆",
    orderTime: "2024-01-10 14:20",
  },
  {
    id: "ORD004",
    status: "shipped",
    statusLabel: "待发货",
    statusColor: "bg-accent",
    product: {
      title: "喷火龙GX 彩虹闪卡",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
      price: 4500000,
      quantity: 2,
    },
    seller: "卡牌天地",
    orderTime: "2024-01-13 09:15",
  },
]

const statusIcons: Record<string, typeof Package> = {
  pending: Clock,
  shipped: Package,
  received: Truck,
  completed: CheckCircle,
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">我的订单</h1>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Order List */}
      <div className="px-4 py-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">暂无订单</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status] || Package
              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl bg-card"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {order.seller}
                      </span>
                    </div>
                    <Badge className={cn("text-xs", order.statusColor)}>
                      {order.statusLabel}
                    </Badge>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={order.product.image}
                          alt={order.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <h3 className="line-clamp-2 text-sm font-medium">
                          {order.product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            x{order.product.quantity}
                          </span>
                          <span className="font-bold text-accent">
                            Rp {order.product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      订单号: {order.id}
                    </span>
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <Button size="sm">立即付款</Button>
                      )}
                      {order.status === "received" && (
                        <Button size="sm">确认收货</Button>
                      )}
                      {order.status === "completed" && (
                        <Button size="sm" variant="outline">
                          再次购买
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
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
