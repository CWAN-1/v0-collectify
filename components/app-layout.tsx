"use client"

import { BottomNav } from "./bottom-nav"

interface AppLayoutProps {
  children: React.ReactNode
  showNav?: boolean
}

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={showNav ? "pb-20" : ""}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  )
}
