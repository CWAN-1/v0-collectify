"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Custom game-style icons
function HomeIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  )
}

function ShopIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ChatIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function ProfileIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  )
}

const navItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/shop", icon: ShopIcon, label: "Shop" },
  { href: "/publish", icon: PlusIcon, label: "", isCenter: true },
  { href: "/messages", icon: ChatIcon, label: "Chat" },
  { href: "/profile", icon: ProfileIcon, label: "Profile" },
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
      <div className="flex h-16 w-full items-center justify-evenly max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center -mt-5"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/40 transition-transform hover:scale-105 active:scale-95 rotate-45">
                  <div className="-rotate-45">
                    <Icon className="size-5 text-white" />
                  </div>
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-14 py-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" active={isActive} />
              <span className={cn("text-[9px]", isActive ? "font-bold" : "font-medium")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-card" />
    </nav>
  )
}
