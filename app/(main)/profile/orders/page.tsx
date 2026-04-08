"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Star, MessageCircle, RotateCcw, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "all", label: "All" },
  { id: "pending", label: "Unpaid" },
  { id: "processing", label: "Processing" },
  { id: "shipping", label: "Shipping" },
  { id: "completed", label: "Completed" },
  { id: "refunded", label: "Refunded" },
  { id: "cancelled", label: "Cancelled" },
]

const orders = [
  {
    id: "ORD123456",
    status: "shipping",
    statusLabel: "Shipping",
    items: [
      {
        name: "Pikachu VMAX Rainbow Rare",
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
        price: 250,
        quantity: 1
      }
    ],
    seller: "CardMaster",
    total: 255,
    date: "28 Mar 2024",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD123455",
    status: "completed",
    statusLabel: "Completed",
    items: [
      {
        name: "Charizard Base Set Holo",
        image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&h=200&fit=crop",
        price: 2500,
        quantity: 1
      }
    ],
    seller: "VintageCards",
    total: 2505,
    date: "25 Mar 2024",
    rated: false
  },
  {
    id: "ORD123454",
    status: "pending",
    statusLabel: "Awaiting Payment",
    items: [
      {
        name: "LeBron James Rookie Card",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
        price: 1500,
        quantity: 1
      }
    ],
    seller: "SportsHub",
    total: 1505,
    date: "27 Mar 2024",
    expiry: "28 Mar 2024, 23:59"
  },
  {
    id: "ORD123453",
    status: "refunded",
    statusLabel: "Refunded",
    items: [
      {
        name: "Blue Eyes White Dragon 1st Edition",
        image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&h=200&fit=crop",
        price: 850,
        quantity: 1
      }
    ],
    seller: "YugiohPro",
    total: 855,
    date: "20 Mar 2024",
    refundReason: "Item not as described"
  },
  {
    id: "ORD123452",
    status: "cancelled",
    statusLabel: "Cancelled",
    items: [
      {
        name: "Michael Jordan Rookie Card PSA 10",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
        price: 5000,
        quantity: 1
      }
    ],
    seller: "SportsLegends",
    total: 5015,
    date: "18 Mar 2024",
    cancelReason: "Payment not completed"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
    case "refunded":
      return RotateCcw
    case "cancelled":
      return XCircle
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
        <div className="flex items-center justify-center relative px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 absolute left-4" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-sm font-semibold">My Orders</h1>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
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
                    <span className="text-sm text-muted-foreground">Order Total</span>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-border">
                    {order.status === "pending" && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          Cancel
                        </Button>
                        <Button className="flex-1 rounded-xl">
                          Pay Now
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
                          Track Package
                        </Button>
                      </>
                    )}
                    {order.status === "completed" && !order.rated && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          Buy Again
                        </Button>
                        <Button className="flex-1 rounded-xl gap-1">
                          <Star className="size-4" />
                          Rate
                        </Button>
                      </>
                    )}
                    {order.status === "completed" && order.rated && (
                      <Button variant="outline" className="flex-1 rounded-xl">
                        Buy Again
                      </Button>
                    )}
                    {order.status === "refunded" && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          View Details
                        </Button>
                        <Button className="flex-1 rounded-xl">
                          Buy Again
                        </Button>
                      </>
                    )}
                    {order.status === "cancelled" && (
                      <>
                        <Button variant="outline" className="flex-1 rounded-xl">
                          View Details
                        </Button>
                        <Button className="flex-1 rounded-xl">
                          Reorder
                        </Button>
                      </>
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
            <h3 className="font-semibold text-lg mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Your orders will appear here.
            </p>
            <Link href="/shop">
              <Button className="rounded-full">Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
