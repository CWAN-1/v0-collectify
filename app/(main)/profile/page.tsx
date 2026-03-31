"use client"

import { Settings, ChevronRight, Package, Heart, Bookmark, Clock, Store, Wallet, Star, HelpCircle, LogOut, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const orderStatuses = [
  { id: "pending", label: "Unpaid", icon: Clock, count: 1 },
  { id: "processing", label: "Processing", icon: Package, count: 2 },
  { id: "shipping", label: "Shipping", icon: Package, count: 1 },
  { id: "review", label: "Review", icon: Star, count: 3 },
]

const menuItems = [
  {
    section: "Purchases",
    items: [
      { href: "/profile/orders", icon: Package, label: "My Orders" },
      { href: "/profile/wishlist", icon: Heart, label: "Wishlist" },
      { href: "/profile/saved", icon: Bookmark, label: "Saved" },
    ]
  },
  {
    section: "Sales",
    items: [
      { href: "/profile/shop", icon: Store, label: "My Shop" },
      { href: "/profile/wallet", icon: Wallet, label: "Balance & Withdraw" },
    ]
  },
  {
    section: "Account",
    items: [
      { href: "/profile/settings", icon: Settings, label: "Settings" },
      { href: "/help", icon: HelpCircle, label: "Help & Support" },
    ]
  },
]

const user = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  verified: true,
  followers: 1250,
  following: 456,
  posts: 23,
  isSeller: true,
  rating: 4.9,
  totalSold: 156
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Compact Header */}
      <header className="bg-gradient-to-br from-primary/80 to-accent/80 text-white px-4 pt-12 pb-5 rounded-b-[2rem]">
        <div className="flex items-center justify-end mb-4">
          <Link href="/profile/settings">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 size-9">
              <Settings className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Profile Info — compact horizontal layout */}
        <div className="flex items-center gap-3">
          <Avatar className="size-16 border-2 border-white/40 ring-2 ring-primary shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-primary bg-white text-xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold truncate">{user.name}</h2>
              {user.verified && (
                <div className="size-4 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Check className="size-2.5 text-primary" />
                </div>
              )}
            </div>
            <p className="text-white/70 text-sm">{user.username}</p>
            {user.isSeller && (
              <div className="flex items-center gap-2 mt-0.5">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{user.rating}</span>
                <span className="text-white/40">·</span>
                <span className="text-sm text-white/70">{user.totalSold} sold</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats — compact */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-lg font-bold">{user.posts}</p>
            <p className="text-xs text-white/70">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user.followers.toLocaleString()}</p>
            <p className="text-xs text-white/70">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user.following}</p>
            <p className="text-xs text-white/70">Following</p>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-3 relative z-10">
        {/* Order Status */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">My Orders</h3>
            <Link href="/profile/orders" className="text-xs text-primary flex items-center gap-0.5">
              View All <ChevronRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {orderStatuses.map((status) => {
              const Icon = status.icon
              return (
                <Link key={status.id} href={`/profile/orders?status=${status.id}`}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <div className="size-11 rounded-full bg-secondary flex items-center justify-center border border-border">
                        <Icon className="size-4 text-primary" />
                      </div>
                      {status.count > 0 && (
                        <span className="absolute -top-1 -right-1 size-4 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {status.count}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-center leading-tight">{status.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section) => (
          <div key={section.section} className="mb-3">
            <h3 className="text-xs font-medium text-muted-foreground mb-1.5 px-1 uppercase tracking-wide">
              {section.section}
            </h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-3.5 hover:bg-secondary transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-9 rounded-xl bg-secondary flex items-center justify-center border border-border">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <span className="flex-1 font-medium text-sm">{item.label}</span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 gap-2 mt-3"
        >
          <LogOut className="size-4" />
          Log Out
        </Button>
      </main>
    </div>
  )
}
