"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Crown, Star, Gift, Percent, Truck, Shield, Sparkles, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const levels = [
  { level: 1, name: "Starter", minXP: 0, maxXP: 100, color: "from-gray-400 to-gray-500", itemsNeeded: 2, spendNeeded: 50 },
  { level: 2, name: "Collector", minXP: 100, maxXP: 300, color: "from-green-400 to-green-500", itemsNeeded: 5, spendNeeded: 150 },
  { level: 3, name: "Enthusiast", minXP: 300, maxXP: 600, color: "from-blue-400 to-blue-500", itemsNeeded: 10, spendNeeded: 300 },
  { level: 4, name: "Expert", minXP: 600, maxXP: 1000, color: "from-purple-400 to-purple-500", itemsNeeded: 15, spendNeeded: 500 },
  { level: 5, name: "Master", minXP: 1000, maxXP: 1500, color: "from-orange-400 to-orange-500", itemsNeeded: 25, spendNeeded: 800 },
  { level: 6, name: "Elite", minXP: 1500, maxXP: 2200, color: "from-pink-400 to-pink-500", itemsNeeded: 35, spendNeeded: 1200 },
  { level: 7, name: "Champion", minXP: 2200, maxXP: 3000, color: "from-red-400 to-red-500", itemsNeeded: 50, spendNeeded: 1800 },
  { level: 8, name: "Legend", minXP: 3000, maxXP: 4000, color: "from-yellow-400 to-yellow-500", itemsNeeded: 70, spendNeeded: 2500 },
  { level: 9, name: "Mythic", minXP: 4000, maxXP: 5500, color: "from-cyan-400 to-cyan-500", itemsNeeded: 100, spendNeeded: 3500 },
  { level: 10, name: "Grandmaster", minXP: 5500, maxXP: 9999, color: "from-yellow-500 to-amber-600", itemsNeeded: 0, spendNeeded: 0 },
]

// Benefits per level - used to show in the swipeable banner
const levelBenefits: Record<number, { icon: any; title: string; description: string }[]> = {
  1: [{ icon: Gift, title: "Welcome Bonus", description: "5% off first purchase" }],
  2: [{ icon: Star, title: "Priority Support", description: "Faster response times" }],
  3: [{ icon: Percent, title: "Exclusive Discounts", description: "Up to 10% on select items" }],
  4: [{ icon: Truck, title: "Free Shipping", description: "On orders over $50" }],
  5: [{ icon: Shield, title: "Buyer Protection+", description: "Extended return window" }],
  6: [{ icon: Sparkles, title: "Early Access", description: "New drops & auctions" }],
  7: [{ icon: Crown, title: "VIP Badge", description: "Exclusive profile badge" }],
  8: [{ icon: Gift, title: "Monthly Rewards", description: "Free collectible coupons" }],
  9: [{ icon: Star, title: "Seller Perks", description: "Reduced selling fees" }],
  10: [{ icon: Crown, title: "Grandmaster Status", description: "All perks + exclusive events" }],
}

// All benefits shown in the benefits section
const allBenefits = [
  { icon: Gift, title: "Welcome Bonus", description: "5% off first purchase", level: 1 },
  { icon: Star, title: "Priority Support", description: "Faster response times", level: 2 },
  { icon: Percent, title: "Exclusive Discounts", description: "Up to 10% on select items", level: 3 },
  { icon: Truck, title: "Free Shipping", description: "On orders over $50", level: 4 },
  { icon: Shield, title: "Buyer Protection+", description: "Extended return window", level: 5 },
  { icon: Sparkles, title: "Early Access", description: "New drops & auctions", level: 6 },
  { icon: Zap, title: "Entry Effects", description: "Special entrance animation in live shows", level: 7 },
  { icon: User, title: "Exclusive Avatar Frame", description: "Unique profile border for your level", level: 8 },
  { icon: Sparkles, title: "Auction Win Effects", description: "Celebration animation when you win", level: 9 },
  { icon: Crown, title: "Grandmaster Status", description: "All perks + exclusive events", level: 10 },
]

const currentLevel = 10
const currentXP = 5800

export default function CollectorLevelPage() {
  const [viewingLevel, setViewingLevel] = useState(currentLevel)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentLevelData = levels.find(l => l.level === currentLevel) || levels[0]
  const viewingLevelData = levels.find(l => l.level === viewingLevel) || levels[0]
  const progress = Math.min(((currentXP - currentLevelData.minXP) / (currentLevelData.maxXP - currentLevelData.minXP)) * 100, 100)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const cardWidth = scrollRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / cardWidth) + 1
    if (newIndex !== viewingLevel && newIndex >= 1 && newIndex <= 10) {
      setViewingLevel(newIndex)
    }
  }

  const scrollToLevel = (level: number) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.offsetWidth
    scrollRef.current.scrollTo({ left: (level - 1) * cardWidth, behavior: "smooth" })
    setViewingLevel(level)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="size-8 rounded-full">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold text-foreground">Collector Level</h1>
        </div>
      </header>

      <main className="py-4 space-y-5">
        {/* Swipeable Level Banners */}
        <div>
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {levels.map((level) => {
              const isCurrentLevel = level.level === currentLevel
              const isUnlocked = level.level <= currentLevel
              const levelProgress = isCurrentLevel ? progress : isUnlocked ? 100 : 0
              const benefits = levelBenefits[level.level] || []

              return (
                <div 
                  key={level.level}
                  className="w-full shrink-0 snap-center px-4"
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${level.color} p-4 ${!isUnlocked ? "opacity-60" : ""}`}>
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative flex items-center gap-3">
                      <div className="size-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Crown className="size-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/80 text-[10px] font-medium">
                          {isCurrentLevel ? "Current Level" : isUnlocked ? "Unlocked" : "Locked"}
                        </p>
                        <p className="text-white text-xl font-bold">Level {level.level}</p>
                        <p className="text-white/90 text-xs font-medium">{level.name}</p>
                      </div>
                    </div>

                    {/* Benefit preview */}
                    {benefits.length > 0 && (
                      <div className="relative mt-3 bg-white/10 rounded-lg p-2 flex items-center gap-2">
                        {(() => {
                          const Icon = benefits[0].icon
                          return <Icon className="size-4 text-white shrink-0" />
                        })()}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-white">{benefits[0].title}</p>
                          <p className="text-[9px] text-white/70 truncate">{benefits[0].description}</p>
                        </div>
                      </div>
                    )}

                    {/* XP Progress - only show for current level */}
                    {isCurrentLevel && (
                      <div className="relative mt-3">
                        <div className="flex items-center justify-between text-[9px] text-white/80 mb-1">
                          <span>{currentXP} XP</span>
                          <span>{currentLevelData.maxXP} XP</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all"
                            style={{ width: `${levelProgress}%` }}
                          />
                        </div>
                        {/* Upgrade hint */}
                        {currentLevel < 10 && (
                          <div className="mt-2 text-[9px] text-white/80 space-y-0.5">
                            <p>Purchase <span className="font-bold text-white">{levels[currentLevel]?.itemsNeeded || 0} more items</span> to level up</p>
                            <p>Or spend <span className="font-bold text-white">${levels[currentLevel]?.spendNeeded || 0}</span> to reach next level</p>
                          </div>
                        )}
                        {currentLevel === 10 && (
                          <p className="mt-2 text-[9px] text-white/90 font-medium">You&apos;ve reached the highest level!</p>
                        )}
                      </div>
                    )}

                    {/* Locked level hint */}
                    {!isUnlocked && (
                      <div className="relative mt-3 text-[9px] text-white/70">
                        <p>Reach Level {level.level - 1} to unlock this level</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Level dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 px-4">
            {levels.map((level) => (
              <button
                key={level.level}
                onClick={() => scrollToLevel(level.level)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  level.level === viewingLevel 
                    ? "w-4 bg-primary" 
                    : level.level <= currentLevel 
                      ? "w-1.5 bg-primary/40" 
                      : "w-1.5 bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground text-center mt-1">Swipe to view other levels</p>
        </div>

        {/* Benefits Section */}
        <div className="px-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Your Benefits</h2>
          <div className="space-y-2">
            {allBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              const levelData = levels.find(l => l.level === benefit.level)
              const isUnlocked = benefit.level <= currentLevel
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 bg-card border border-border rounded-xl ${!isUnlocked ? "opacity-50" : ""}`}
                >
                  <div className={`size-9 rounded-full bg-gradient-to-br ${levelData?.color} flex items-center justify-center shrink-0 ${!isUnlocked ? "grayscale" : ""}`}>
                    <Icon className="size-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-foreground">{benefit.title}</p>
                    <p className="text-[10px] text-muted-foreground">{benefit.description}</p>
                  </div>
                  <span className={`text-[9px] font-medium shrink-0 ${isUnlocked ? "text-green-500" : "text-muted-foreground"}`}>
                    {isUnlocked ? "Unlocked" : `LV${benefit.level}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
