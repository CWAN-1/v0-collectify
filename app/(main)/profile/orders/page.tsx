"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "all", label: "Semua" },
  { id: "pending", label: "Belum Bayar" },
  { id: "processing", label: "Diproses" },
  { id: "shipping", label: "Dikirim" },
  { id: "completed", label: "Selesai" },
]

const orders = [
  {
    id: "ORD123456",
    status: "shipping",
    statusLabel: "Sedang Dikirim",
    items: [
      {
        name: "Pikachu VMAX Rainbow Rare",
        image: "/products/product-1.jpg",
        price: 2500000,
        quantity: 1
      }
    ],
    seller: "CardMaster Jakarta",
    total: 2525000,
    date: "28 Mar 2024",
    trackingNumber: "JKT123456789"
  },
  {
    id: "ORD123455",
    status: "completed",
    statusLabel: "Selesai",
    items: [
      {
        name: "Charizard Base Set Holo",
        image: "/products/product-5.jpg",
        price: 25000000,
        quantity: 1
      }
    ],
    seller: "VintageCards",
    total: 25030000,
    date: "25 Mar 2024",
    rated: false
  },
  {
    id: "ORD123454",
    status: "pending",
    statusLabel: "Menunggu Pembayaran",
    items: [
      {
        name: "LeBron James Rookie Card",
        image: "/products/product-2.jpg",
        price: 15000000,
        quantity: 1
      }
    ],
    seller: "SportsHub",
    total: 15030000,
    date: "27 Mar 2024",
    expiry: "28 Mar 2024, 23:59"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return Clock
    case "processing":
      return Package
    case "shipping":
      return Truck
    case "completed":
      return CheckCircle
    default:
      return Package
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold">Pesanan Saya</h1>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <div key={order.id} className="bg-card rounded-2xl border border-border p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="size-4" />
                      <span className="font-semibold text-sm">{order.statusLabel}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </div>

                  {/* Items */}
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3 mb-3">
                      <div className="size-16 rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{order.seller}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-sm">{formatPrice(item.price)}</span>
                          <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Total Pesanan</span>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-border">
                    {order.status === "pending" && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          Batal
                        </Button>
                        <Button className="flex-1 rounded-xl">
                          Bayar Sekarang
                        </Button>
                      </>
                    )}
                    {order.status === "shipping" && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl gap-1">
                          <MessageCircle className="size-4" />
                          Chat
                        </Button>
                        <Button className="flex-1 rounded-xl">
                          Lacak Paket
                        </Button>
                      </>
                    )}
                    {order.status === "completed" && !order.rated && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          Beli Lagi
                        </Button>
                        <Button className="flex-1 rounded-xl gap-1">
                          <Star className="size-4" />
                          Beri Nilai
                        </Button>
                      </>
                    )}
                    {order.status === "completed" && order.rated && (
                      <Button variant="outline" className="flex-1 rounded-xl">
                        Beli Lagi
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Package className="size-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Belum Ada Pesanan</h3>
            <p className="text-muted-foreground text-center mb-6">
              Pesanan Anda akan muncul di sini.
            </p>
            <Link href="/shop">
              <Button className="rounded-full">Mulai Belanja</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
