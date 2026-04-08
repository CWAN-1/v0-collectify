import { BottomNav } from "@/components/bottom-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background w-full max-w-full">
      <div className="pb-16">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
