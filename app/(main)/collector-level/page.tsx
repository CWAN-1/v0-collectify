"use client"

import { ArrowLeft, Crown, Star, Gift, Percent, Truck, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const levels = [
  { level: 1, name: "Starter", minXP: 0, maxXP: 100, color: "from-gray-400 to-gray-500" },
  { level: 2, name: "Collector", minXP: 100, maxXP: 300, color: "from-green-400 to-green-500" },
  { level: 3, name: "Enthusiast", minXP: 300, maxXP: 600, color: "from-blue-400 to-blue-500" },
  { level: 4, name: "Expert", minXP: 600, maxXP: 1000, color: "from-purple-400 to-purple-500" },
  { level: 5, name: "Master", minXP: 1000, maxXP: 1500, color: "from-orange-400 to-orange-500" },
  { level: 6, name: "Elite", minXP: 1500, maxXP: 2200, color: "from-pink-400 to-pink-500" },
  { level: 7, name: "Champion", minXP: 2200, maxXP: 3000, color: "from-red-400 to-red-500" },
  { level: 8, name: "Legend", minXP: 3000, maxXP: 4000, color: "from-yellow-400 to-yellow-500" },
  { level: 9, name: "Mythic", minXP: 4000, maxXP: 5500, color: "from-cyan-400 to-cyan-500" },
  { level: 10, name: "Grandmaster", minXP: 5500, maxXP: 9999, color: "from-yellow-500 to-amber-600" },
]

const benefits = [
  { level: 1, icon: Gift, title: "Welcome Bonus", description: "5% off first purchase" },
  { level: 2, icon: Star, title: "Priority Support", description: "Faster response times" },
  { level: 3, icon: Percent, title: "Exclusive Discounts", description: "Up to 10% on select items" },
  { level: 4, icon: Truck, title: "Free Shipping", description: "On orders over $50" },
  { level: 5, icon: Shield, title: "Buyer Protection+", description: "Extended return window" },
  { level: 6, icon: Sparkles, title: "Early Access", description: "New drops & auctions" },
  { level: 7, icon: Crown, title: "VIP Badge", description: "Exclusive profile badge" },
  { level: 8, icon: Gift, title: "Monthly Rewards", description: "Free collectible coupons" },
  { level: 9, icon: Star, title: "Seller Perks", description: "Reduced selling fees" },
  { level: 10, icon: Crown, title: "Grandmaster Status", description: "All perks + exclusive events" },
]

const currentLevel = 10
const currentXP = 5800

export default function CollectorLevelPage() {
  const currentLevelData = levels.find(l => l.level === currentLevel) || levels[0]
  const progress = Math.min(((currentXP - currentLevelData.minXP) / (currentLevelData.maxXP - currentLevelData.minXP)) * 100, 100)

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

      <main className="px-4 py-4 space-y-6">
        {/* Current Level Card */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${currentLevelData.color} p-5`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative flex items-center gap-4">
            <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
              <Crown className="size-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-xs font-medium">Current Level</p>
              <p className="text-white text-2xl font-bold">Level {currentLevel}</p>
              <p className="text-white/90 text-sm font-medium">{currentLevelData.name}</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="relative mt-4">
            <div className="flex items-center justify-between text-[10px] text-white/80 mb-1">
              <span>{currentXP} XP</span>
              <span>{currentLevelData.maxXP} XP</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {currentLevel < 10 && (
              <p className="text-[10px] text-white/70 mt-1">{currentLevelData.maxXP - currentXP} XP to Level {currentLevel + 1}</p>
            )}
          </div>
        </div>

        {/* Benefits Unlocked */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Your Benefits</h2>
          <div className="space-y-2">
            {benefits.filter(b => b.level <= currentLevel).map((benefit) => {
              const Icon = benefit.icon
              const levelData = levels.find(l => l.level === benefit.level)
              return (
                <div key={benefit.level} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
                  <div className={`size-9 rounded-full bg-gradient-to-br ${levelData?.color} flex items-center justify-center shrink-0`}>
                    <Icon className="size-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-foreground">{benefit.title}</p>
                    <p className="text-[10px] text-muted-foreground">{benefit.description}</p>
                  </div>
                  <span className="text-[9px] font-medium text-muted-foreground">LV{benefit.level}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* All Levels */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">All Levels</h2>
          <div className="space-y-2">
            {levels.map((level) => {
              const isUnlocked = level.level <= currentLevel
              const isCurrent = level.level === currentLevel
              return (
                <div 
                  key={level.level} 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isCurrent 
                      ? "bg-card border-yellow-500/50 ring-1 ring-yellow-500/30" 
                      : isUnlocked 
                        ? "bg-card border-border" 
                        : "bg-muted/30 border-border opacity-50"
                  }`}
                >
                  <div className={`size-8 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shrink-0 ${!isUnlocked ? "grayscale" : ""}`}>
                    <span className="text-[10px] font-bold text-white">{level.level}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-foreground">{level.name}</p>
                    <p className="text-[9px] text-muted-foreground">{level.minXP} - {level.maxXP} XP</p>
                  </div>
                  {isCurrent && (
                    <span className="text-[9px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">Current</span>
                  )}
                  {isUnlocked && !isCurrent && (
                    <span className="text-[9px] text-green-500">Unlocked</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* How to earn XP */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-[11px] font-semibold text-foreground mb-2">How to Earn XP</h3>
          <ul className="space-y-1.5 text-[10px] text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" />
              Complete a purchase: +50 XP
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" />
              Leave a review: +10 XP
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" />
              Attend a live show: +20 XP
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" />
              Refer a friend: +100 XP
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary" />
              Daily login streak: +5 XP/day
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
