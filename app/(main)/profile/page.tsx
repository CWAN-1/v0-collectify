"use client"

import { useState } from "react"
import { Settings, ChevronRight, Package, Heart, Bookmark, Clock, Store, Wallet, Star, HelpCircle, LogOut, Moon, Sun, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
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
    section: "Others",
    items: [
      { href: "/profile/settings", icon: Settings, label: "Settings" },
      { href: "/help", icon: HelpCircle, label: "Help" },
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
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/80 to-accent/80 text-white px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Profile</h1>
          <Link href="/profile/settings">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <Avatar className="size-20 border-4 border-white/30 ring-2 ring-primary">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-primary bg-white text-2xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{user.name}</h2>
              {user.verified && (
                <div className="size-5 bg-white rounded-full flex items-center justify-center">
                  <Check className="size-3 text-primary" />
                </div>
              )}
            </div>
            <p className="text-white/70">{user.username}</p>
            {user.isSeller && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{user.rating}</span>
                </div>
                <span className="text-white/50">|</span>
                <span className="text-sm">{user.totalSold} sold</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.posts}</p>
            <p className="text-sm text-white/70">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.followers.toLocaleString()}</p>
            <p className="text-sm text-white/70">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.following}</p>
            <p className="text-sm text-white/70">Following</p>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-4 relative z-10">
        {/* Order Status */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">My Orders</h3>
            <Link href="/profile/orders" className="text-sm text-primary flex items-center gap-1">
              View All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {orderStatuses.map((status) => {
              const Icon = status.icon
              return (
                <Link key={status.id} href={`/profile/orders?status=${status.id}`}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <div className="size-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                        <Icon className="size-5 text-primary" />
                      </div>
                      {status.count > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {status.count}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-center">{status.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Dark Mode Toggle - Hidden since always dark theme */}
        {/* <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
              <span className="font-medium">Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div> */}

        {/* Menu Sections */}
        {menuItems.map((section) => (
          <div key={section.section} className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              {section.section}
            </h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-4 hover:bg-secondary transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 gap-2 mt-4 mb-6"
        >
          <LogOut className="size-5" />
          Logout
        </Button>
      </main>
    </div>
  )
}
