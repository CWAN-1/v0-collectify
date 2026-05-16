"use client"

import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  Package,
  Radio,
  DollarSign,
  ClipboardList,
  Users,
  Lightbulb,
  Tag,
  Crown,
  Truck,
  BarChart3,
  GraduationCap,
  Gift,
  CreditCard,
  MapPin,
  ShieldCheck,
  Bell,
  Mail,
  Lock,
  Settings,
  MessageSquare,
  AlertTriangle,
  Receipt,
  FileText,
  HelpCircle,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

type TabType = "seller-hub" | "account"
type ProfileNavType = "collectibles" | "shop" | "shows" | "posts" | "past-shows" | "reviews"

const user = {
  name: "alexsmi45760",
  fullName: "Alex Smith",
  followers: 0,
  following: 1,
  avatar: "",
  collectorLevel: 10,
}

// Mock collectibles data
const mockCollectibles = [
  { id: "1", name: "Pikachu VMAX Rainbow", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=400&fit=crop", rarity: "Secret Rare" },
  { id: "2", name: "Charizard GX Shiny", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop", rarity: "Ultra Rare" },
  { id: "3", name: "Mewtwo EX Full Art", image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=300&h=400&fit=crop", rarity: "Full Art" },
  { id: "4", name: "Blastoise Base Set", image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=300&h=400&fit=crop", rarity: "Holo Rare" },
  { id: "5", name: "Umbreon VMAX Alt Art", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop", rarity: "Alt Art" },
]

const sellerHubGrid = [
  { id: "inventory", label: "Inventory", icon: Package, href: "/seller/inventory" },
  { id: "shows", label: "Shows", icon: Radio, href: "/seller/shows" },
  { id: "payouts", label: "Payouts", icon: DollarSign, href: "/seller/payouts" },
  { id: "orders", label: "Orders", icon: ClipboardList, href: "/seller/orders" },
]

const sellerHubMenu = [
  { id: "invite", label: "Invite a Seller & Earn $100", subtitle: "Balance: $0.00", subtitleColor: "text-green-500", icon: Users, href: "/seller/invite" },
  { id: "tips", label: "Tips", icon: Lightbulb, href: "/seller/tips" },
  { id: "offers", label: "Offers", icon: Tag, href: "/seller/offers" },
  { id: "premier", label: "Premier Shop", icon: Crown, href: "/seller/premier" },
  { id: "shipping", label: "Shipping", icon: Truck, href: "/seller/shipping" },
  { id: "status", label: "Seller Status", icon: BarChart3, href: "/seller/status" },
  { id: "training", label: "Seller Training", icon: GraduationCap, href: "/seller/training" },
  { id: "analytics", label: "Seller Analytics", icon: BarChart3, href: "/seller/analytics" },
]

const rewardCards = [
  { id: "referrals", label: "Referrals & Credits", subtitle: "Balance: $0.00", subtitleColor: "text-green-500", icon: Users, href: "/account/referrals" },
  { id: "rewards", label: "My Rewards", subtitle: "View Coupons", icon: Gift, href: "/account/rewards" },
]

const accountMenu = [
  { id: "payments", label: "Payments & Shipping", icon: CreditCard, href: "/account/payments" },
  { id: "addresses", label: "Addresses", icon: MapPin, href: "/account/addresses" },
  { id: "verified", label: "Verified Buyer", icon: ShieldCheck, href: "/account/verified" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/account/notifications" },
  { id: "email", label: "Change Email", icon: Mail, href: "/account/email" },
  { id: "password", label: "Change Password", icon: Lock, href: "/account/password" },
  { id: "preferences", label: "Preferences", icon: Settings, href: "/account/preferences" },
]

const helpLegalMenu = [
  { id: "contact", label: "Contact Us", icon: MessageSquare, href: "/help/contact" },
  { id: "reports", label: "User Reports", icon: AlertTriangle, href: "/help/reports" },
  { id: "tax", label: "Sales Tax Exemption", icon: Receipt, href: "/help/tax" },
  { id: "privacy", label: "Privacy Policy", icon: FileText, href: "/help/privacy", external: true },
  { id: "terms", label: "Terms & Conditions", icon: FileText, href: "/help/terms", external: true },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/help/faq", external: true },
]

const profileNavItems: { id: ProfileNavType; label: string }[] = [
  { id: "collectibles", label: "Collectibles" },
  { id: "shop", label: "Shop" },
  { id: "shows", label: "Shows" },
  { id: "posts", label: "Posts" },
  { id: "past-shows", label: "Past Shows" },
  { id: "reviews", label: "Reviews" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("seller-hub")
  const [profileNav, setProfileNav] = useState<ProfileNavType>("collectibles")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeCollectible, setActiveCollectible] = useState(2) // Center item index

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-12 pb-0">
        {/* Top row: avatar + user info + drawer button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-14 border border-border shrink-0">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl font-semibold bg-muted text-muted-foreground">
                {user.name[0].toLowerCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <button className="flex items-center gap-1">
                  <h1 className="text-base font-bold text-foreground">{user.name}</h1>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
                <Link href="/collector-level" className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-[9px] font-bold text-white">
                  <Crown className="size-2.5" />
                  <span>LV{user.collectorLevel}</span>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{user.followers}</span> Followers
                {" · "}
                <span className="font-semibold text-foreground">{user.following}</span> Following
              </p>
            </div>
          </div>

          {/* Drawer toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="size-9 flex items-center justify-center rounded-full hover:bg-secondary/60 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="size-5 text-foreground" />
          </button>
        </div>

        {/* Seller Hub / Account Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("seller-hub")}
            className={`flex-1 pb-2.5 text-xs font-semibold text-center transition-colors ${
              activeTab === "seller-hub"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground"
            }`}
          >
            Seller Hub
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`flex-1 pb-2.5 text-xs font-semibold text-center transition-colors ${
              activeTab === "account"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground"
            }`}
          >
            Account
          </button>
        </div>

        {/* Profile horizontal nav (only in Account tab) */}
        {activeTab === "account" && (
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2 border-b border-border">
            {profileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setProfileNav(item.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  profileNav === item.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="px-4 pt-3">
        {/* SELLER HUB TAB */}
        {activeTab === "seller-hub" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              {sellerHubGrid.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.id} href={item.href}>
                    <div className="bg-card border border-border rounded-xl p-3 flex flex-col items-start gap-2 hover:bg-secondary/50 transition-colors">
                      <div className="size-8 rounded-full border border-border flex items-center justify-center">
                        <Icon className="size-4 text-foreground" />
                      </div>
                      <span className="text-[11px] font-medium text-foreground">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {sellerHubMenu.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-secondary/50 transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-8 rounded-full border border-border flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-medium text-foreground">{item.label}</span>
                      {item.subtitle && (
                        <p className={`text-[9px] ${item.subtitleColor || "text-muted-foreground"}`}>{item.subtitle}</p>
                      )}
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === "account" && (
          <div className="py-2">
            {/* Collectibles - Spotlight Carousel */}
            {profileNav === "collectibles" && (
              <div className="relative">
                {/* Spotlight background effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-64 bg-gradient-to-b from-yellow-500/20 via-yellow-500/10 to-transparent rounded-full blur-2xl" />
                </div>

                {/* Carousel container */}
                <div className="relative flex items-center justify-center h-64 overflow-hidden">
                  {mockCollectibles.map((item, index) => {
                    const offset = index - activeCollectible
                    const isCenter = offset === 0
                    const isVisible = Math.abs(offset) <= 2

                    if (!isVisible) return null

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveCollectible(index)}
                        className="absolute transition-all duration-300 ease-out"
                        style={{
                          transform: `translateX(${offset * 80}px) scale(${isCenter ? 1 : 0.7 - Math.abs(offset) * 0.1})`,
                          zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                          opacity: isCenter ? 1 : 0.5 - Math.abs(offset) * 0.15,
                        }}
                      >
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${isCenter ? "ring-2 ring-yellow-500/50" : ""}`}>
                          <div className="w-28 h-40 bg-muted">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Spotlight glow for center item */}
                          {isCenter && (
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-transparent to-white/10 pointer-events-none" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Center item info */}
                <div className="text-center mt-2">
                  <p className="text-sm font-semibold text-foreground">{mockCollectibles[activeCollectible]?.name}</p>
                  <p className="text-[10px] text-muted-foreground">{mockCollectibles[activeCollectible]?.rarity}</p>
                </div>

                {/* Navigation dots */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {mockCollectibles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCollectible(index)}
                      className={`size-1.5 rounded-full transition-all ${
                        index === activeCollectible ? "bg-yellow-500 w-4" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Swipe hint */}
                <p className="text-[9px] text-muted-foreground text-center mt-2">Swipe to explore collection</p>
              </div>
            )}

            {profileNav === "shop" && <p className="text-center text-xs text-muted-foreground py-8">No items in shop yet.</p>}
            {profileNav === "shows" && <p className="text-center text-xs text-muted-foreground py-8">No shows yet.</p>}
            {profileNav === "posts" && <p className="text-center text-xs text-muted-foreground py-8">No posts yet.</p>}
            {profileNav === "past-shows" && <p className="text-center text-xs text-muted-foreground py-8">No past shows yet.</p>}
            {profileNav === "reviews" && <p className="text-center text-xs text-muted-foreground py-8">No reviews yet.</p>}
          </div>
        )}
      </main>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-[80vw] max-w-xs h-full bg-background flex flex-col overflow-y-auto shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 pt-12 pb-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Settings</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="size-8 flex items-center justify-center rounded-full hover:bg-secondary/60"
                aria-label="Close menu"
              >
                <X className="size-4 text-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1">
              {/* Reward Cards */}
              <div className="grid grid-cols-2 gap-2">
                {rewardCards.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.id} href={item.href} onClick={() => setDrawerOpen(false)}>
                      <div className="bg-card border border-border rounded-xl p-2.5 flex flex-col items-start gap-1.5 hover:bg-secondary/50 transition-colors">
                        <div className="size-7 rounded-full border border-border flex items-center justify-center">
                          <Icon className="size-3.5 text-foreground" />
                        </div>
                        <div>
                          <span className="text-[10px] font-medium text-foreground block leading-tight">{item.label}</span>
                          <p className={`text-[9px] ${item.subtitleColor || "text-muted-foreground"}`}>{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Account Menu */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {accountMenu.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-secondary/50 transition-colors ${
                        index > 0 ? "border-t border-border" : ""
                      }`}
                    >
                      <div className="size-7 rounded-full border border-border flex items-center justify-center shrink-0">
                        <Icon className="size-3 text-foreground" />
                      </div>
                      <span className="flex-1 text-[11px] font-medium text-foreground">{item.label}</span>
                      <ChevronRight className="size-3 text-muted-foreground shrink-0" />
                    </Link>
                  )
                })}
              </div>

              {/* Help & Legal */}
              <div>
                <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-1">Help & Legal</h3>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  {helpLegalMenu.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-secondary/50 transition-colors ${
                          index > 0 ? "border-t border-border" : ""
                        }`}
                      >
                        <div className="size-7 rounded-full border border-border flex items-center justify-center shrink-0">
                          <Icon className="size-3 text-foreground" />
                        </div>
                        <span className="flex-1 text-[11px] font-medium text-foreground">{item.label}</span>
                        {item.external ? (
                          <ExternalLink className="size-3 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronRight className="size-3 text-muted-foreground shrink-0" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Sign Out */}
              <Button
                variant="secondary"
                className="w-full h-9 rounded-xl text-[11px] font-semibold gap-1.5"
                onClick={() => setDrawerOpen(false)}
              >
                <LogOut className="size-3.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
