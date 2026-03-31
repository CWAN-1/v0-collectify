"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, User, MapPin, Bell, Lock, Shield, CreditCard, Globe, FileText, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const settingsSections = [
  {
    title: "Akun",
    items: [
      { href: "/profile/settings/edit", icon: User, label: "Edit Profil" },
      { href: "/profile/settings/address", icon: MapPin, label: "Alamat Pengiriman" },
      { href: "/profile/settings/payment", icon: CreditCard, label: "Metode Pembayaran" },
    ]
  },
  {
    title: "Preferensi",
    items: [
      { href: "/profile/settings/notifications", icon: Bell, label: "Notifikasi" },
      { href: "/profile/settings/language", icon: Globe, label: "Bahasa", value: "Indonesia" },
    ]
  },
  {
    title: "Keamanan",
    items: [
      { href: "/profile/settings/password", icon: Lock, label: "Ubah Kata Sandi" },
      { href: "/profile/settings/privacy", icon: Shield, label: "Privasi" },
    ]
  },
  {
    title: "Tentang",
    items: [
      { href: "/terms", icon: FileText, label: "Syarat & Ketentuan" },
      { href: "/privacy-policy", icon: Shield, label: "Kebijakan Privasi" },
      { href: "/help", icon: HelpCircle, label: "Bantuan" },
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
          <h1 className="text-xl font-bold">Pengaturan</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Profile Summary */}
        <Link href="/profile/settings/edit">
          <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border mb-6">
            <Avatar className="size-16">
              <AvatarImage src="/avatars/user-1.jpg" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Budi Santoso</h2>
              <p className="text-muted-foreground">@budisantoso</p>
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
          <p>Made with love in Indonesia</p>
        </div>
      </main>
    </div>
  )
}
