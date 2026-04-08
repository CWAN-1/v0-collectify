"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Package, Clock, CheckCircle, TrendingUp, Eye, ShoppingBag, MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "auctions", label: "Auctions" },
  { id: "orders", label: "Orders" },
]

const stats = [
  { label: "Total Sales", value: "$4,550", icon: TrendingUp, change: "+12%" },
  { label: "Product Views", value: "2,345", icon: Eye, change: "+8%" },
  { label: "Orders", value: "156", icon: ShoppingBag, change: "+5%" },
]

const products = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    image: "/cards/pokemon-1.jpg",
    status: "active",
    views: 234,
    stock: 1,
    condition: "Mint"
  },
  {
    id: "2",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    image: "/cards/yugioh-1.jpg",
    status: "active",
    views: 567,
    stock: 1,
    condition: "Near Mint"
  },
  {
    id: "3",
    name: "Luffy Gear 5 Secret Rare",
    price: 180,
    image: "/cards/onepiece-1.jpg",
    status: "sold",
    views: 123,
    stock: 0,
    condition: "Mint"
  },
]

const myAuctions = [
  {
    id: "auction-1",
    name: "Walking Wake ex Hyper Rare",
    startPrice: 100,
    currentBid: 225,
    image: "/cards/pokemon-1.jpg",
    status: "active",
    bidCount: 7,
    views: 312,
    condition: "Mint",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: "auction-2",
    name: "Dark Magician Ultimate Rare",
    startPrice: 200,
    currentBid: 450,
    image: "/cards/yugioh-1.jpg",
    status: "active",
    bidCount: 12,
    views: 189,
    condition: "Near Mint",
    endTime: new Date(Date.now() + 45 * 60 * 1000),
  },
]

const sellerOrders = [
  {
    id: "SELL123456",
    status: "pending",
    statusLabel: "Needs Shipping",
    buyer: "John Smith",
    product: {
      name: "Charizard Base Set Holo",
      image: "/cards/pokemon-2.jpg",
      price: 2500
    },
    date: "Today, 10:30"
  },
  {
    id: "SELL123455",
    status: "shipping",
    statusLabel: "In Transit",
    buyer: "Sarah Johnson",
    product: {
      name: "Pikachu VMAX Rainbow Rare",
      image: "/cards/pokemon-1.jpg",
      price: 250
    },
    date: "Yesterday"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function formatTimeLeft(endTime: Date) {
  const now = new Date().getTime()
  const end = endTime.getTime()
  const diff = Math.max(0, end - now)
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function AuctionCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
}

export default function ShopManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="size-9" onClick={() => router.back()}>
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-base font-semibold">My Shop</h1>
          </div>
          <Link href="/publish">
            <Button size="sm" className="h-8 rounded-full gap-1 text-xs bg-gradient-to-r from-primary to-accent">
              <Plus className="size-3.5" />
              List
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border"
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
                      <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  </div>
                )
              })}
            </div>

            {/* Auctions */}
            {myAuctions.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-red-500 rounded-full animate-pulse" />
                    <h3 className="font-semibold">Auctions</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("auctions")}
                    className="text-sm text-primary"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {myAuctions.slice(0, 2).map((auction) => (
                    <div key={auction.id} className="bg-card rounded-2xl border border-border p-3">
                      <div className="flex gap-3">
                        <div className="size-16 rounded-xl overflow-hidden bg-muted relative shrink-0">
                          <Image
                            src={auction.image}
                            alt={auction.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-1 left-1 bg-red-500/90 text-white text-[8px] font-semibold px-1 py-0.5 rounded-full flex items-center gap-0.5">
                            <Clock className="size-2" />
                            <AuctionCountdown endTime={auction.endTime} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{auction.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div>
                              <span className="text-[10px] text-muted-foreground">Current Bid</span>
                              <p className="font-bold text-primary text-sm">{formatPrice(auction.currentBid)}</p>
                            </div>
                            <div>
                              <span className="text-[10px] text-muted-foreground">Bids</span>
                              <p className="font-semibold text-sm">{auction.bidCount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-sm text-primary"
                >
                  View All
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
                        <p className="text-xs text-muted-foreground">Buyer: {order.buyer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Products */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Active Listings</h3>
                <button
                  onClick={() => setActiveTab("products")}
                  className="text-sm text-primary"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {products.filter(p => p.status === "active").slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-3">
                    <div className="size-14 rounded-xl overflow-hidden bg-muted shrink-0">
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
                      <p className="font-bold text-sm text-primary">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{product.views} views</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="size-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="size-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                <div className="size-16 rounded-xl overflow-hidden bg-muted relative shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                  {product.status === "sold" && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-xs font-semibold">Sold</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                  <span className="text-xs text-green-400">{product.condition}</span>
                  <p className="font-bold text-sm text-primary">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" />
                      {product.views}
                    </span>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="size-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="size-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="size-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}

        {activeTab === "auctions" && (
          <div className="space-y-3">
            {myAuctions.length > 0 ? (
              myAuctions.map((auction) => (
                <div key={auction.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="flex gap-3 p-3">
                    <div className="size-20 rounded-xl overflow-hidden bg-muted relative shrink-0">
                      <Image
                        src={auction.image}
                        alt={auction.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{auction.name}</p>
                      <span className="text-xs text-green-400">{auction.condition}</span>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Current Bid</span>
                          <span className="font-bold text-primary">{formatPrice(auction.currentBid)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Bids</span>
                          <span className="font-semibold">{auction.bidCount}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground block">Views</span>
                          <span className="font-semibold">{auction.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-orange-500/10 text-orange-400 text-xs font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3" />
                      <span>Ends in <AuctionCountdown endTime={auction.endTime} /></span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive hover:text-destructive">
                      Cancel Auction
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="size-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No active auctions</p>
                <Link href="/publish?type=auction">
                  <Button className="mt-4 rounded-full">Start an Auction</Button>
                </Link>
              </div>
            )}
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
                    <p className="font-bold text-sm text-primary">{formatPrice(order.product.price)}</p>
                    <p className="text-xs text-muted-foreground">Buyer: {order.buyer}</p>
                  </div>
                </div>
                {order.status === "pending" && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl">
                      Decline
                    </Button>
                    <Button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent">
                      Process Order
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
