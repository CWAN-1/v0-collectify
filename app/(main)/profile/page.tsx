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
  Percent, 
  Lightbulb, 
  Tag, 
  Crown, 
  Truck, 
  BarChart3, 
  GraduationCap, 
  Palmtree, 
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
  Info,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
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
  { id: "affiliate", label: "Affiliate Program: Earn Cash", icon: Percent, href: "/seller/affiliate" },
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
  { id: "affiliate", label: "Affiliate Program: Earn Cash", icon: Percent, href: "/account/affiliate" },
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
  const [vacationMode, setVacationMode] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-14 pb-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="size-14 border-2 border-border shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-lg font-semibold bg-muted text-muted-foreground">
              {user.name[0].toLowerCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <button className="flex items-center gap-1 mb-2">
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <ChevronDown className="size-5 text-muted-foreground" />
            </button>
            <Link href="/profile/view">
              <Button size="sm" className="h-8 px-4 bg-foreground text-background hover:bg-foreground/90 rounded-full text-xs font-semibold">
                View Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("seller-hub")}
            className={`flex-1 pb-3 text-sm font-semibold text-center transition-colors ${
              activeTab === "seller-hub"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground"
            }`}
          >
            Seller Hub
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`flex-1 pb-3 text-sm font-semibold text-center transition-colors ${
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
          <div className="space-y-4">
            {/* Verification Banner */}
            <div className="bg-foreground rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="size-8 rounded-full bg-muted/20 flex items-center justify-center shrink-0">
                <Info className="size-4 text-background" />
              </div>
              <p className="flex-1 text-sm text-background">
                Reminder, you need to verify your identity in order to cash out.
              </p>
              <ChevronRight className="size-5 text-background/60 shrink-0" />
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-2 gap-3">
              {sellerHubGrid.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.id} href={item.href}>
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-start gap-3 hover:bg-secondary/50 transition-colors">
                      <div className="size-10 rounded-full border border-border flex items-center justify-center">
                        <Icon className="size-5 text-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Menu List */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {sellerHubMenu.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-9 rounded-full border border-border flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      {item.subtitle && (
                        <p className={`text-xs ${item.subtitleColor || "text-muted-foreground"}`}>{item.subtitle}</p>
                      )}
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                  </Link>
                )
              })}

              {/* Vacation Mode */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-t border-border">
                <div className="size-9 rounded-full border border-border flex items-center justify-center shrink-0">
                  <Palmtree className="size-4 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">Vacation Mode</span>
                  <p className="text-xs text-muted-foreground">Temporarily makes items in your store not purchasable</p>
                </div>
                <Switch
                  checked={vacationMode}
                  onCheckedChange={setVacationMode}
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── ACCOUNT TAB ── */}
        {activeTab === "account" && (
          <div className="space-y-4">
            {/* Reward Cards */}
            <div className="grid grid-cols-2 gap-3">
              {rewardCards.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.id} href={item.href}>
                    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-start gap-2 hover:bg-secondary/50 transition-colors">
                      <div className="size-10 rounded-full border border-border flex items-center justify-center">
                        <Icon className="size-5 text-foreground" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground block">{item.label}</span>
                        <p className={`text-xs ${item.subtitleColor || "text-muted-foreground"}`}>{item.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Account Menu */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {accountMenu.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-9 rounded-full border border-border flex items-center justify-center shrink-0">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                  </Link>
                )
              })}
            </div>

            {/* Help & Legal */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 px-1">Help & Legal</h3>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {helpLegalMenu.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
                        index > 0 ? "border-t border-border" : ""
                      }`}
                    >
                      <div className="size-9 rounded-full border border-border flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-foreground" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                      {item.external ? (
                        <ExternalLink className="size-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Sign Out */}
            <Button
              variant="secondary"
              className="w-full h-12 rounded-2xl text-sm font-semibold gap-2"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>

            {/* Version Info */}
            <div className="text-center pb-4">
              <p className="text-xs text-muted-foreground">v25.6.5 (13)</p>
              <p className="text-xs text-muted-foreground">© 2023 Whatnot, Inc.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
