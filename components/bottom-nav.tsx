"use client"

import { Home, ShoppingBag, PlusSquare, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/shop", icon: ShoppingBag, label: "Toko" },
  { href: "/publish", icon: PlusSquare, label: "", isCenter: true },
  { href: "/messages", icon: MessageCircle, label: "Pesan" },
  { href: "/profile", icon: User, label: "Profil" },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide nav on auth pages
  if (pathname.startsWith("/onboarding") || pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password") || pathname.startsWith("/setup-profile")) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex h-20 max-w-lg items-center justify-around px-2 pb-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center -mt-4"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-foreground transition-transform hover:scale-105 active:scale-95">
                  <Icon className="size-6 text-background" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] py-2 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-6", isActive && "stroke-[2.5px]")} />
              <span className={cn("text-xs", isActive ? "font-semibold" : "font-medium")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
