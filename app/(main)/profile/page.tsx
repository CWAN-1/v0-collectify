"use client"

import { Settings, ChevronRight, Clock, Heart, Users, Gavel, Wallet, Coins, Package, CreditCard, Truck, CheckCircle, RotateCcw, XCircle, Store, MapPin, Globe, FileText, HelpCircle, Info, LogOut, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

// Action buttons
const actionButtons = [
  { id: "posts", label: "Posts", icon: Package, href: "/profile/posts" },
  { id: "bids", label: "Bid History", icon: Gavel, href: "/profile/bids" },
  { id: "favorites", label: "Favorites", icon: Heart, href: "/profile/favorites" },
  { id: "following", label: "Following", icon: Users, href: "/profile/following" },
]

// Order statuses
const orderStatuses = [
  { id: "pending", label: "Pending", icon: Clock, count: 2 },
  { id: "paid", label: "Paid", icon: CreditCard, count: 1 },
  { id: "shipping", label: "To Ship", icon: Truck, count: 0 },
  { id: "received", label: "Received", icon: CheckCircle, count: 3 },
  { id: "refunded", label: "Refunded", icon: RotateCcw, count: 0 },
  { id: "cancelled", label: "Cancelled", icon: XCircle, count: 0 },
]

// Sales menu
const salesMenu = [
  { href: "/profile/shop", icon: Store, label: "My Shop" },
  { href: "/profile/wallet", icon: Wallet, label: "Balance & Withdraw" },
  { href: "/profile/coins", icon: Coins, label: "CardHub Coins" },
]

// Account menu
const accountMenu = [
  { href: "/profile/address", icon: MapPin, label: "Address Management" },
  { href: "/profile/settings", icon: Settings, label: "Account Settings" },
  { href: "/profile/language", icon: Globe, label: "Language" },
  { href: "/profile/terms", icon: FileText, label: "Terms & Policy" },
  { href: "/profile/help", icon: HelpCircle, label: "Help Center" },
  { href: "/profile/about", icon: Info, label: "About Us" },
]

const user = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  rating: 4.9,
  totalSold: 156,
  followers: 1250,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-br from-primary via-primary to-accent px-4 pt-12 pb-4 relative">
        {/* Settings button — absolute top right */}
        <div className="absolute top-3 right-3">
          <Link href="/profile/settings">
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 size-9">
              <Settings className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <Avatar className="size-14 border-2 border-white/30 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-primary bg-white text-lg">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white truncate">{user.name}</h2>
            {/* Stats Row */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-white/90 font-medium">{user.rating}</span>
              </div>
              <div className="w-px h-3 bg-white/30" />
              <span className="text-xs text-white/80">{user.totalSold} sold</span>
              <div className="w-px h-3 bg-white/30" />
              <span className="text-xs text-white/80">{user.followers} followers</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4">
        {/* Action Buttons */}
        <div className="bg-card rounded-2xl border border-border p-3 mb-4">
          <div className="grid grid-cols-4 gap-2">
            {actionButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Link key={btn.id} href={btn.href}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="size-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{btn.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Seller Invitation Banner */}
        <div className="bg-gradient-to-r from-primary/90 to-accent/90 rounded-2xl p-3 mb-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm mb-0.5">Start Selling Now!</h3>
              <p className="text-white/80 text-[10px] leading-relaxed">
                Lowest commission — Join the most active card trading platform!
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-16 h-12 relative shrink-0">
                <Image
                  src="/images/seller-banner.jpg"
                  alt="Seller"
                  fill
                  className="object-contain"
                />
              </div>
              <Link href="/profile/shop">
                <Button size="sm" className="h-6 px-3 bg-white text-primary hover:bg-white/90 rounded-md text-[10px] font-semibold">
                  Join
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* My Orders */}
        <div className="bg-card rounded-2xl border border-border p-3 mb-4">
          <Link href="/profile/orders" className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">My Orders</h3>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
          <div className="grid grid-cols-4 gap-y-3 gap-x-2">
            {orderStatuses.map((status) => {
              const Icon = status.icon
              return (
                <Link key={status.id} href={`/profile/orders?status=${status.id}`}>
                  <div className="flex flex-col items-center gap-1.5 relative">
                    <div className="size-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    {status.count > 0 && (
                      <span className="absolute -top-1 right-3 size-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                        {status.count}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{status.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sales Section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="px-3 py-2 border-b border-border">
            <h3 className="font-semibold text-sm">Sales</h3>
          </div>
          {salesMenu.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 hover:bg-secondary transition-colors ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="size-4 text-primary" />
                </div>
                <span className="flex-1 font-medium text-sm">{item.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )
          })}
        </div>

        {/* Account Section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="px-3 py-2 border-b border-border">
            <h3 className="font-semibold text-sm">Account</h3>
          </div>
          {accountMenu.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 hover:bg-secondary transition-colors ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="size-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <span className="flex-1 font-medium text-sm">{item.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )
          })}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-11 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 gap-2 mb-4"
        >
          <LogOut className="size-4" />
          Log Out
        </Button>
      </main>
    </div>
  )
}
