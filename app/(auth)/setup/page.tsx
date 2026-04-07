"use client"

import { useState, useRef, Suspense } from "react"
import { ArrowLeft, ArrowRight, Camera, Check, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const cardIPs = [
  { id: "pokemon", name: "Pokemon", color: "bg-yellow-400", emoji: "⚡" },
  { id: "yugioh", name: "Yu-Gi-Oh!", color: "bg-purple-500", emoji: "🎴" },
  { id: "mtg", name: "Magic: The Gathering", color: "bg-orange-500", emoji: "🔮" },
  { id: "sports", name: "Sports Cards", color: "bg-green-500", emoji: "🏆" },
  { id: "onepiece", name: "One Piece", color: "bg-red-500", emoji: "🏴‍☠️" },
  { id: "digimon", name: "Digimon", color: "bg-blue-500", emoji: "🤖" },
  { id: "dragonball", name: "Dragon Ball", color: "bg-orange-400", emoji: "🐉" },
  { id: "lorcana", name: "Disney Lorcana", color: "bg-indigo-500", emoji: "✨" },
]

const regions = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Japan", "South Korea", "Germany", "France",
  "Indonesia", "Singapore", "Malaysia", "Philippines",
  "Thailand", "Vietnam", "China", "Taiwan", "Hong Kong", "Other",
]

// Default avatar as a colored initials placeholder
const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/adventurer/svg?seed=default&backgroundColor=b6e3f4"

function SetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showRegionSheet, setShowRegionSheet] = useState(false)

  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR)
  const [nickname, setNickname] = useState("")
  const [region, setRegion] = useState("")
  const [selectedIPs, setSelectedIPs] = useState<string[]>([])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const toggleIP = (ipId: string) => {
    setSelectedIPs(prev =>
      prev.includes(ipId) ? prev.filter(id => id !== ipId) : [...prev, ipId]
    )
  }

  const handleComplete = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push("/")
  }

  const canProceedStep1 = nickname.trim().length >= 2

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <button onClick={() => step === 1 ? router.back() : setStep(1)} className="p-2 -ml-2">
          <ArrowLeft className="size-5 text-foreground" />
        </button>
        <div className="flex gap-1.5">
          <div className={`w-7 h-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-border"}`} />
          <div className={`w-7 h-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`} />
        </div>
        <div className="w-9" />
      </header>

      {step === 1 ? (
        /* Step 1: Profile Info */
        <div className="flex-1 flex flex-col px-6 overflow-hidden">
          {/* Title */}
          <div className="text-center mb-4 mt-1">
            <h1 className="text-xl font-bold text-foreground mb-1">Set Up Your Profile</h1>
            <p className="text-sm text-muted-foreground">Tell us a bit about yourself</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative size-20">
              <div className="size-20 rounded-full overflow-hidden bg-secondary border-2 border-border">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 size-7 bg-primary rounded-full flex items-center justify-center border-2 border-background"
              >
                <Camera className="size-3.5 text-primary-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Tap to change avatar</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          {/* Form */}
          <div className="space-y-3 flex-1">
            {/* Nickname */}
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Nickname</label>
              <Input
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                className="h-11 rounded-xl bg-card border-border text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{nickname.length}/20</p>
            </div>

            {/* Region */}
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Region</label>
              <button
                onClick={() => setShowRegionSheet(true)}
                className="w-full h-11 px-3 rounded-xl bg-card border border-border flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <span className={`text-sm truncate ${region ? "text-foreground" : "text-muted-foreground"}`}>
                    {region || "Select your region"}
                  </span>
                </div>
                <ChevronDown className="size-4 text-muted-foreground shrink-0 ml-2" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pb-6 pt-4 flex flex-col gap-2.5">
            <Button
              onClick={() => nickname.trim() ? setStep(2) : undefined}
              disabled={!canProceedStep1}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
            >
              <span className="flex items-center gap-2">
                Continue
                <ArrowRight className="size-4" />
              </span>
            </Button>
            <button onClick={() => setStep(2)} className="text-xs text-muted-foreground text-center hover:text-foreground">
              Skip for now
            </button>
          </div>
        </div>
      ) : (
        /* Step 2: Select Card IPs */
        <div className="flex-1 flex flex-col px-6 overflow-hidden">
          {/* Title */}
          <div className="text-center mb-3 mt-1">
            <h1 className="text-xl font-bold text-foreground mb-1">What Do You Collect?</h1>
            <p className="text-sm text-muted-foreground">Select your favorite card franchises</p>
          </div>

          {/* Card IPs Grid */}
          <div className="flex-1 overflow-y-auto pb-2">
            <div className="grid grid-cols-2 gap-2.5">
              {cardIPs.map((ip) => {
                const isSelected = selectedIPs.includes(ip.id)
                return (
                  <button
                    key={ip.id}
                    onClick={() => toggleIP(ip.id)}
                    className={`relative rounded-xl border-2 overflow-hidden transition-all py-4 px-3 flex flex-col items-center gap-2 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    {/* Color stripe */}
                    <div className={`size-10 rounded-xl ${ip.color} flex items-center justify-center text-xl`}>
                      {ip.emoji}
                    </div>
                    <span className="text-xs font-medium text-foreground text-center line-clamp-2 leading-tight">
                      {ip.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 size-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="size-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pb-6 pt-3 flex flex-col gap-2.5 shrink-0">
            <p className="text-xs text-muted-foreground text-center">
              {selectedIPs.length} selected
            </p>
            <Button
              onClick={handleComplete}
              disabled={isLoading || selectedIPs.length === 0}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
            <button onClick={handleComplete} disabled={isLoading} className="text-xs text-muted-foreground text-center hover:text-foreground">
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* Region Sheet */}
      <Sheet open={showRegionSheet} onOpenChange={setShowRegionSheet}>
        <SheetContent side="bottom" className="h-[65vh] rounded-t-3xl">
          <SheetHeader className="pb-3">
            <SheetTitle>Select Region</SheetTitle>
            <SheetDescription className="sr-only">Choose your region from the list below</SheetDescription>
          </SheetHeader>
          <div className="overflow-auto h-[calc(100%-60px)]">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => { setRegion(r); setShowRegionSheet(false) }}
                className={`w-full flex items-center justify-between py-3.5 border-b border-border last:border-0 ${
                  region === r ? "text-primary" : "text-foreground"
                }`}
              >
                <span className="text-sm">{r}</span>
                {region === r && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-background flex items-center justify-center">
        <span className="size-7 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SetupContent />
    </Suspense>
  )
}
