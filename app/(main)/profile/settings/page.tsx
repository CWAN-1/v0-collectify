"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, User, MapPin, Bell, Lock, Shield, CreditCard, Globe, FileText, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const settingsSections = [
  {
    title: "Account",
    items: [
      { href: "/profile/settings/edit", icon: User, label: "Edit Profile" },
      { href: "/profile/address", icon: MapPin, label: "Shipping Address" },
      { href: "/profile/settings/payment", icon: CreditCard, label: "Payment Methods" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { href: "/profile/settings/notifications", icon: Bell, label: "Notifications" },
      { href: "/profile/language", icon: Globe, label: "Language", value: "English" },
    ]
  },
  {
    title: "Security",
    items: [
      { href: "/profile/settings/password", icon: Lock, label: "Change Password" },
      { href: "/profile/settings/privacy", icon: Shield, label: "Privacy" },
    ]
  },
  {
    title: "About",
    items: [
      { href: "/profile/terms", icon: FileText, label: "Terms & Conditions" },
      { href: "/privacy-policy", icon: Shield, label: "Privacy Policy" },
      { href: "/profile/help", icon: HelpCircle, label: "Help Center" },
    ]
  },
]

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Profile Summary */}
        <Link href="/profile/settings/edit">
          <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border mb-6">
            <Avatar className="size-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Alex Chen</h2>
              <p className="text-muted-foreground">@alexchen</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </div>
        </Link>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-4 hover:bg-muted transition-colors ${
                      index > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.value && (
                      <span className="text-muted-foreground">{item.value}</span>
                    )}
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>CardHub v1.0.0</p>
          <p>Made with love</p>
        </div>
      </main>
    </div>
  )
}
