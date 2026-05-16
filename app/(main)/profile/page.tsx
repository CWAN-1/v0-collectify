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
  Pencil,
  Menu
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

// Mock collectibles data - Pokemon TCG cards
const mockCollectibles = [
  { id: "1", name: "Pikachu VMAX Rainbow", image: "https://images.pokemontcg.io/swsh4/188_hires.png", rarity: "Secret Rare" },
  { id: "2", name: "Charizard VMAX", image: "https://images.pokemontcg.io/swsh35/SV107_hires.png", rarity: "Shiny Rare" },
  { id: "3", name: "Mewtwo GX", image: "https://images.pokemontcg.io/sm12/158_hires.png", rarity: "Full Art" },
  { id: "4", name: "Umbreon VMAX", image: "https://images.pokemontcg.io/swsh7/215_hires.png", rarity: "Alt Art" },
  { id: "5", name: "Rayquaza VMAX", image: "https://images.pokemontcg.io/swsh7/218_hires.png", rarity: "Alt Art" },
]

// Mock shop items
const mockShopItems = [
  { id: "s1", name: "Pikachu VMAX Rainbow Rare", price: 250, image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop" },
  { id: "s2", name: "Charizard GX Shiny", price: 450, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop" },
  { id: "s3", name: "Mewtwo EX Full Art", price: 180, image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=200&h=200&fit=crop" },
  { id: "s4", name: "Blastoise Base Set", price: 320, image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=200&h=200&fit=crop" },
]

// Mock upcoming shows
const mockShows = [
  { id: "sh1", title: "Pokemon VMAX Auction", scheduledAt: "Tomorrow · 7:00 PM", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=120&fit=crop", viewers: 0 },
  { id: "sh2", title: "Vintage Cards Special", scheduledAt: "Sat · 3:00 PM", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=120&fit=crop", viewers: 12 },
]

// Mock posts
const mockPosts = [
  { id: "p1", text: "Just pulled a Pikachu VMAX Rainbow! Absolutely stunning card.", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop", likes: 24, comments: 5, timeAgo: "2d" },
  { id: "p2", text: "New collection haul from last week's auction. Can't believe these prices!", image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=300&h=300&fit=crop", likes: 47, comments: 12, timeAgo: "5d" },
]

// Mock past shows
const mockPastShows = [
  { id: "ps1", title: "Pokemon Vintage Grail Auction", date: "Mar 10", duration: "1h 24m", viewers: 143, image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=200&h=120&fit=crop", sales: 8 },
  { id: "ps2", title: "Scarlet & Violet Box Break", date: "Feb 28", duration: "45m", viewers: 89, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=120&fit=crop", sales: 5 },
  { id: "ps3", title: "Weekly Card Show", date: "Feb 14", duration: "2h 5m", viewers: 201, image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=120&fit=crop", sales: 14 },
]

// Mock reviews
const mockReviews = [
  { id: "r1", buyer: "CardMaster99", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop", rating: 5, comment: "Fast shipping, card exactly as described. Great seller!", timeAgo: "1w" },
  { id: "r2", buyer: "PokeFan2024", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", rating: 5, comment: "Amazing condition, well packaged. Would buy again!", timeAgo: "2w" },
  { id: "r3", buyer: "TCGCollector", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", rating: 4, comment: "Good seller, slight delay in shipping but card was perfect.", timeAgo: "1mo" },
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
              <button className="flex items-center gap-1 mb-0.5">
                <h1 className="text-base font-bold text-foreground">{user.name}</h1>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs text-muted-foreground">{user.fullName}</p>
                <Link href="/collector-level" className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-[9px] font-bold text-white">
                  <Crown className="size-2.5" />
                  <span>LV{user.collectorLevel}</span>
                </Link>
              </div>
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

            {/* ── COLLECTIBLES ── Card carousel */}
            {profileNav === "collectibles" && (
              <div className="pt-1 pb-2">
                {/* Cards carousel */}
                <div className="relative flex items-center justify-center h-64 overflow-hidden">
                  {mockCollectibles.map((item, index) => {
                    const offset = index - activeCollectible
                    const isCenter = offset === 0
                    if (Math.abs(offset) > 2) return null
                    const scale = isCenter ? 1 : Math.max(0.6, 0.75 - Math.abs(offset) * 0.08)
                    const tx = offset * 90
                    const opacity = isCenter ? 1 : Math.max(0.3, 0.6 - Math.abs(offset) * 0.15)
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveCollectible(index)}
                        className="absolute transition-all duration-300 ease-out"
                        style={{ transform: `translateX(${tx}px) scale(${scale})`, zIndex: isCenter ? 10 : 5 - Math.abs(offset), opacity }}
                      >
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl ${isCenter ? "ring-2 ring-primary/50" : ""}`} style={{ width: 140, height: 196 }}>
                          <Image src={item.image} alt={item.name} fill className="object-contain bg-muted/30" unoptimized />
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Item info */}
                <div className="text-center mt-1.5">
                  <p className="text-sm font-semibold text-foreground">{mockCollectibles[activeCollectible]?.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{mockCollectibles[activeCollectible]?.rarity}</p>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {mockCollectibles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCollectible(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${i === activeCollectible ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
                    />
                  ))}
                </div>

                {/* Edit button */}
                <div className="flex justify-center mt-3">
                  <Button variant="outline" size="sm" className="h-7 px-4 rounded-full text-[11px] font-medium gap-1.5">
                    <Pencil className="size-3" />
                    Edit Collection Display
                  </Button>
                </div>
              </div>
            )}

            {/* ── SHOP ── */}
            {profileNav === "shop" && (
              <div className="grid grid-cols-2 gap-3">
                {mockShopItems.map((item) => (
                  <Link key={item.id} href={`/shop/${item.id}`} className="block">
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                      <div className="relative aspect-square bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="p-2">
                        <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight">{item.name}</p>
                        <p className="text-xs font-bold text-primary mt-0.5">Rp {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ── SHOWS ── */}
            {profileNav === "shows" && (
              <div className="space-y-3">
                {mockShows.map((show) => (
                  <div key={show.id} className="bg-card border border-border rounded-xl overflow-hidden flex gap-3 p-3">
                    <div className="relative rounded-lg overflow-hidden shrink-0 bg-muted" style={{ width: 88, height: 60 }}>
                      <Image src={show.image} alt={show.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">{show.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{show.scheduledAt}</p>
                      {show.viewers > 0 && <p className="text-[10px] text-primary mt-0.5">{show.viewers} interested</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── POSTS ── */}
            {profileNav === "posts" && (
              <div className="space-y-3">
                {mockPosts.map((post) => (
                  <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="relative w-full bg-muted" style={{ height: 180 }}>
                      <Image src={post.image} alt="post" fill className="object-cover" unoptimized />
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] text-foreground leading-relaxed line-clamp-2">{post.text}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                        <span className="ml-auto">{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── PAST SHOWS ── */}
            {profileNav === "past-shows" && (
              <div className="space-y-3">
                {mockPastShows.map((show) => (
                  <div key={show.id} className="bg-card border border-border rounded-xl overflow-hidden flex gap-3 p-3">
                    <div className="relative rounded-lg overflow-hidden shrink-0 bg-muted" style={{ width: 88, height: 60 }}>
                      <Image src={show.image} alt={show.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">{show.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{show.date} · {show.duration}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                        <span>{show.viewers} viewers</span>
                        <span>·</span>
                        <span>{show.sales} sold</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── REVIEWS ── */}
            {profileNav === "reviews" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-foreground">5.0</span>
                  <div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-500 text-sm">★</span>)}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{mockReviews.length} reviews</p>
                  </div>
                </div>
                {mockReviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="size-7 shrink-0">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback className="text-[10px]">{review.buyer[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">{review.buyer}</p>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={`text-[10px] ${s <= review.rating ? "text-yellow-500" : "text-muted-foreground/30"}`}>★</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[9px] text-muted-foreground shrink-0">{review.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
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
