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
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type TabType = "seller-hub" | "account"

const user = {
  name: "alexsmi45760",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
}

// Seller Hub grid items
const sellerHubGrid = [
  { id: "inventory", label: "Inventory", icon: Package, href: "/seller/inventory" },
  { id: "shows", label: "Shows", icon: Radio, href: "/seller/shows" },
  { id: "payouts", label: "Payouts", icon: DollarSign, href: "/seller/payouts" },
  { id: "orders", label: "Orders", icon: ClipboardList, href: "/seller/orders" },
]

// Seller Hub menu items
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

// Account reward cards
const rewardCards = [
  { id: "referrals", label: "Referrals & Credits", subtitle: "Balance: $0.00", subtitleColor: "text-green-500", icon: Users, href: "/account/referrals" },
  { id: "rewards", label: "My Rewards", subtitle: "View Coupons", icon: Gift, href: "/account/rewards" },
]

// Account menu items
const accountMenu = [
  { id: "payments", label: "Payments & Shipping", icon: CreditCard, href: "/account/payments" },
  { id: "addresses", label: "Addresses", icon: MapPin, href: "/account/addresses" },
  { id: "verified", label: "Verified Buyer", icon: ShieldCheck, href: "/account/verified" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/account/notifications" },
  { id: "email", label: "Change Email", icon: Mail, href: "/account/email" },
  { id: "password", label: "Change Password", icon: Lock, href: "/account/password" },
  { id: "preferences", label: "Preferences", icon: Settings, href: "/account/preferences" },
]

// Help & Legal items
const helpLegalMenu = [
  { id: "contact", label: "Contact Us", icon: MessageSquare, href: "/help/contact" },
  { id: "reports", label: "User Reports", icon: AlertTriangle, href: "/help/reports" },
  { id: "tax", label: "Sales Tax Exemption", icon: Receipt, href: "/help/tax" },
  { id: "privacy", label: "Privacy Policy", icon: FileText, href: "/help/privacy", external: true },
  { id: "terms", label: "Terms & Conditions", icon: FileText, href: "/help/terms", external: true },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/help/faq", external: true },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("seller-hub")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-12 pb-3">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2.5">
          <Avatar className="size-12 border-2 border-border shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-base font-semibold bg-muted text-muted-foreground">
              {user.name[0].toLowerCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <button className="flex items-center gap-1 mb-1.5">
              <h1 className="text-base font-bold text-foreground">{user.name}</h1>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            <Link href="/profile/view">
              <Button size="sm" className="h-7 px-3 bg-foreground text-background hover:bg-foreground/90 rounded-full text-[11px] font-semibold">
                View Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
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
      </header>

      <main className="px-4">
        {/* ── SELLER HUB TAB ── */}
        {activeTab === "seller-hub" && (
          <div className="space-y-3">
            {/* Grid Cards */}
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

            {/* Menu List */}
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

        {/* ── ACCOUNT TAB ── */}
        {activeTab === "account" && (
          <div className="space-y-3">
            {/* Reward Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {rewardCards.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.id} href={item.href}>
                    <div className="bg-card border border-border rounded-xl p-3 flex flex-col items-start gap-1.5 hover:bg-secondary/50 transition-colors">
                      <div className="size-8 rounded-full border border-border flex items-center justify-center">
                        <Icon className="size-4 text-foreground" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-foreground block">{item.label}</span>
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
                    className={`flex items-center gap-2.5 px-3 py-2.5 hover:bg-secondary/50 transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-8 rounded-full border border-border flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-foreground" />
                    </div>
                    <span className="flex-1 text-[11px] font-medium text-foreground">{item.label}</span>
                    <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                  </Link>
                )
              })}
            </div>

            {/* Help & Legal */}
            <div>
              <h3 className="text-[11px] font-semibold text-foreground mb-1.5 px-1">Help & Legal</h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {helpLegalMenu.map((item, index) => {
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
                      <span className="flex-1 text-[11px] font-medium text-foreground">{item.label}</span>
                      {item.external ? (
                        <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Sign Out */}
            <Button
              variant="secondary"
              className="w-full h-10 rounded-xl text-[11px] font-semibold gap-1.5"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
