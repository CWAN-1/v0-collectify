"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Package, Clock, CheckCircle, XCircle, TrendingUp, Eye, ShoppingBag, MoreHorizontal, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "overview", label: "Ringkasan" },
  { id: "products", label: "Produk" },
  { id: "orders", label: "Pesanan" },
]

const stats = [
  { label: "Total Penjualan", value: "Rp 45.5 Jt", icon: TrendingUp, change: "+12%" },
  { label: "Produk Dilihat", value: "2,345", icon: Eye, change: "+8%" },
  { label: "Pesanan", value: "156", icon: ShoppingBag, change: "+5%" },
]

const products = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 2500000,
    image: "/products/product-1.jpg",
    status: "active",
    views: 234,
    stock: 1
  },
  {
    id: "2",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 8500000,
    image: "/products/product-3.jpg",
    status: "active",
    views: 567,
    stock: 1
  },
  {
    id: "3",
    name: "Luffy Gear 5 Secret Rare",
    price: 1800000,
    image: "/products/product-4.jpg",
    status: "sold",
    views: 123,
    stock: 0
  },
]

const sellerOrders = [
  {
    id: "SELL123456",
    status: "pending",
    statusLabel: "Perlu Dikirim",
    buyer: "Ahmad Rizky",
    product: {
      name: "Charizard Base Set Holo",
      image: "/products/product-5.jpg",
      price: 25000000
    },
    date: "Hari ini, 10:30"
  },
  {
    id: "SELL123455",
    status: "shipping",
    statusLabel: "Dalam Pengiriman",
    buyer: "Dewi Kartika",
    product: {
      name: "Pikachu VMAX Rainbow Rare",
      image: "/products/product-1.jpg",
      price: 2500000
    },
    date: "Kemarin"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ShopManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-xl font-bold">Toko Saya</h1>
          </div>
          <Link href="/publish/product">
            <Button size="sm" className="rounded-full gap-1">
              <Plus className="size-4" />
              Produk
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-card rounded-2xl border border-border p-3">
                    <Icon className="size-5 mb-2 text-muted-foreground" />
                    <p className="font-bold text-lg">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  </div>
                )
              })}
            </div>

            {/* Recent Orders */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Pesanan Terbaru</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-sm text-muted-foreground"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-3">
                {sellerOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="bg-card rounded-2xl border border-border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={order.status === "pending" ? "default" : "secondary"}>
                        {order.statusLabel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="size-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={order.product.image}
                          alt={order.product.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{order.product.name}</p>
                        <p className="text-xs text-muted-foreground">Pembeli: {order.buyer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Produk Aktif</h3>
                <button
                  onClick={() => setActiveTab("products")}
                  className="text-sm text-muted-foreground"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-3">
                {products.filter(p => p.status === "active").slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-3">
                    <div className="size-14 rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                      <p className="font-bold text-sm">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{product.views} dilihat</span>
                        <span>Stok: {product.stock}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="size-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-3">
                <div className="size-16 rounded-xl overflow-hidden bg-muted relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                  {product.status === "sold" && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs font-semibold">Terjual</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                  <p className="font-bold text-sm">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" />
                      {product.views}
                    </span>
                    <span>Stok: {product.stock}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-3">
            {sellerOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={order.status === "pending" ? "default" : "secondary"}>
                    {order.statusLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="size-14 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={order.product.image}
                      alt={order.product.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{order.product.name}</p>
                    <p className="font-bold text-sm">{formatPrice(order.product.price)}</p>
                    <p className="text-xs text-muted-foreground">Pembeli: {order.buyer}</p>
                  </div>
                </div>
                {order.status === "pending" && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl">
                      Tolak
                    </Button>
                    <Button className="flex-1 rounded-xl">
                      Proses Pesanan
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
