"use client"

import { Home, ShoppingBag, Plus, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/publish", icon: Plus, label: "", isCenter: true },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  // Hide nav on auth pages and detail pages
  if (
    pathname.startsWith("/onboarding") || 
    pathname.startsWith("/login") || 
    pathname.startsWith("/register") || 
    pathname.startsWith("/forgot-password") || 
    pathname.startsWith("/setup-profile") ||
    pathname.match(/^\/shop\/[^/]+$/) ||
    pathname.match(/^\/post\/[^/]+$/) ||
    pathname.match(/^\/messages\/chat\/[^/]+$/)
  ) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex h-16 w-full items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center -mt-6"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95">
                  <Icon className="size-6 text-white" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "stroke-[2.5px]")} />
              <span className={cn("text-[10px]", isActive ? "font-semibold" : "font-medium")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-card" />
    </nav>
  )
}
