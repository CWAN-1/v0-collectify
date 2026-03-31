"use client"

import { Settings, ChevronRight, Clock, Heart, Users, Gavel, CreditCard, MapPin, Globe, FileText, HelpCircle, Info, LogOut, Wallet, Coins, Package, CheckCircle, Truck, XCircle } from "lucide-react"
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
  { id: "pending", label: "Pending", icon: Clock },
  { id: "paid", label: "Paid", icon: CreditCard },
  { id: "shipping", label: "To Ship", icon: Truck },
  { id: "delivered", label: "Received", icon: CheckCircle },
  { id: "completed", label: "Done", icon: CheckCircle },
  { id: "refunded", label: "Refunded", icon: XCircle },
  { id: "cancelled", label: "Cancelled", icon: XCircle },
]

// Sales menu
const salesMenu = [
  { href: "/profile/wallet", icon: Wallet, label: "CardHub Balance" },
  { href: "/profile/coins", icon: Coins, label: "CardHub Mall & Coins" },
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
  coins: 520,
  rating: 4.9,
  totalSold: 156,
  followers: 1250,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-400 text-black px-4 pt-12 pb-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl font-bold">$</div>
          <div className="absolute top-8 right-8 text-4xl font-bold">$</div>
          <div className="absolute bottom-4 left-1/4 text-5xl font-bold">$</div>
        </div>
        
        {/* Settings button */}
        <div className="flex items-center justify-end mb-4 relative z-10">
          <Link href="/profile/settings">
            <Button variant="ghost" size="icon" className="text-black/70 hover:bg-black/10 size-9">
              <Settings className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-3 relative z-10">
          <Avatar className="size-16 border-2 border-white/50 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-amber-600 bg-white text-xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{user.name}</h2>
            <div className="flex items-center gap-1.5">
              <div className="size-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Coins className="size-2.5 text-white" />
              </div>
              <span className="text-sm font-medium">{user.coins} coins</span>
            </div>
          </div>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <div className="grid grid-cols-4 gap-3">
            {actionButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <Link key={btn.id} href={btn.href}>
                  <div className="flex flex-col items-center gap-2">
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
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-4 mb-4 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h3 className="text-black font-bold text-base mb-1">Start Selling Now!</h3>
              <p className="text-black/70 text-xs mb-3 leading-relaxed">
                Lowest commission — Join the most active card trading platform!
              </p>
              <Link href="/profile/shop">
                <Button size="sm" className="h-8 px-4 bg-black text-white hover:bg-black/80 rounded-lg text-xs font-semibold">
                  Join
                </Button>
              </Link>
            </div>
            <div className="w-24 h-20 relative shrink-0">
              <Image
                src="/images/seller-banner.jpg"
                alt="Seller"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* My Orders */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <Link href="/profile/orders" className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">My Orders</h3>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {orderStatuses.slice(0, 4).map((status) => {
              const Icon = status.icon
              return (
                <Link key={status.id} href={`/profile/orders?status=${status.id}`}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="size-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center">{status.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {orderStatuses.slice(4).map((status) => {
              const Icon = status.icon
              return (
                <Link key={status.id} href={`/profile/orders?status=${status.id}`}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="size-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center">{status.label}</span>
                  </div>
                </Link>
              )
            })}
            <div /> {/* Empty spacer */}
          </div>
        </div>

        {/* Sales Section */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          {salesMenu.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3.5 hover:bg-secondary transition-colors ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="size-9 rounded-xl bg-secondary flex items-center justify-center">
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
          {accountMenu.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3.5 hover:bg-secondary transition-colors ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="size-9 rounded-xl bg-secondary flex items-center justify-center">
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
          className="w-full h-12 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 gap-2"
        >
          <LogOut className="size-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
