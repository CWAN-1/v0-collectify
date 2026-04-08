"use client"

import { useState, useRef, Suspense } from "react"
import { ArrowLeft, ArrowRight, Camera, Check, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const cardIPs = [
  { id: "pokemon", name: "Pokemon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { id: "yugioh", name: "Yu-Gi-Oh!", image: "https://images.ygoprodeck.com/images/cards_cropped/46986414.jpg" },
  { id: "mtg", name: "MTG", image: "https://cards.scryfall.io/art_crop/front/0/c/0c3a7e26-27ec-4f77-a189-37f27b3d5162.jpg" },
  { id: "sports", name: "Sports", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop" },
  { id: "onepiece", name: "One Piece", image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=100&h=100&fit=crop" },
  { id: "digimon", name: "Digimon", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=100&fit=crop" },
]

const regions = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Japan", "South Korea", "Germany", "France",
  "Singapore", "Malaysia", "Philippines", "Thailand", "Other",
]

const genders = ["Male", "Female", "Other", "Prefer not to say"]
const ageRanges = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"]

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/adventurer/svg?seed=default&backgroundColor=b6e3f4"

function SetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showRegionSheet, setShowRegionSheet] = useState(false)
  const [showGenderSheet, setShowGenderSheet] = useState(false)
  const [showAgeSheet, setShowAgeSheet] = useState(false)

  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR)
  const [nickname, setNickname] = useState("")
  const [region, setRegion] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
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
          <div className={`w-6 h-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-border"}`} />
          <div className={`w-6 h-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`} />
        </div>
        <div className="w-9" />
      </header>

      {step === 1 ? (
        <div className="flex-1 flex flex-col px-5 overflow-hidden">
          {/* Title */}
          <div className="text-center mb-3">
            <h1 className="text-lg font-bold text-foreground mb-0.5">Set Up Your Profile</h1>
            <p className="text-xs text-muted-foreground">Tell us a bit about yourself</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-3">
            <div className="relative size-16">
              <div className="size-16 rounded-full overflow-hidden bg-secondary border-2 border-border">
                <Image src={avatar} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" unoptimized />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-0.5 -right-0.5 size-6 bg-primary rounded-full flex items-center justify-center border-2 border-background"
              >
                <Camera className="size-3 text-primary-foreground" />
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          {/* Form */}
          <div className="space-y-2.5 flex-1">
            {/* Nickname */}
            <div>
              <label className="text-[10px] font-medium text-muted-foreground mb-1 block">NICKNAME (max 20 chars)</label>
              <Input
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                className="h-10 rounded-xl bg-card border-border text-sm"
              />
            </div>

            {/* Region */}
            <div>
              <label className="text-[10px] font-medium text-muted-foreground mb-1 block">REGION</label>
              <button
                onClick={() => setShowRegionSheet(true)}
                className="w-full h-10 px-3 rounded-xl bg-card border border-border flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                  <span className={`text-sm truncate ${region ? "text-foreground" : "text-muted-foreground"}`}>
                    {region || "Select region"}
                  </span>
                </div>
                <ChevronDown className="size-4 text-muted-foreground shrink-0" />
              </button>
            </div>

            {/* Gender & Age Row */}
            <div className="flex gap-2.5">
              <div className="flex-1">
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">GENDER</label>
                <button
                  onClick={() => setShowGenderSheet(true)}
                  className="w-full h-10 px-3 rounded-xl bg-card border border-border flex items-center justify-between text-left"
                >
                  <span className={`text-sm truncate ${gender ? "text-foreground" : "text-muted-foreground"}`}>
                    {gender || "Select"}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                </button>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-medium text-muted-foreground mb-1 block">AGE</label>
                <button
                  onClick={() => setShowAgeSheet(true)}
                  className="w-full h-10 px-3 rounded-xl bg-card border border-border flex items-center justify-between text-left"
                >
                  <span className={`text-sm truncate ${age ? "text-foreground" : "text-muted-foreground"}`}>
                    {age || "Select"}
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pb-5 pt-3 flex flex-col gap-2">
            <Button
              onClick={() => nickname.trim() ? setStep(2) : undefined}
              disabled={!canProceedStep1}
              className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
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
        <div className="flex-1 flex flex-col px-5 overflow-hidden">
          {/* Title */}
          <div className="text-center mb-3">
            <h1 className="text-lg font-bold text-foreground mb-0.5">What Do You Collect?</h1>
            <p className="text-xs text-muted-foreground">Select your favorite card franchises</p>
          </div>

          {/* Card IPs Grid */}
          <div className="flex-1 overflow-y-auto pb-2">
            <div className="grid grid-cols-3 gap-2">
              {cardIPs.map((ip) => {
                const isSelected = selectedIPs.includes(ip.id)
                return (
                  <button
                    key={ip.id}
                    onClick={() => toggleIP(ip.id)}
                    className={`relative rounded-xl border-2 overflow-hidden transition-all p-2 flex flex-col items-center gap-1.5 ${
                      isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div className="size-12 rounded-lg overflow-hidden bg-muted">
                      <Image src={ip.image} alt={ip.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <span className="text-[10px] font-medium text-foreground text-center line-clamp-1">{ip.name}</span>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 size-4 bg-primary rounded-full flex items-center justify-center">
                        <Check className="size-2.5 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pb-5 pt-3 flex flex-col gap-2 shrink-0">
            <p className="text-[10px] text-muted-foreground text-center">{selectedIPs.length} selected</p>
            <Button
              onClick={handleComplete}
              disabled={isLoading || selectedIPs.length === 0}
              className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating...
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
        <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl px-4">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-base">Select Region</SheetTitle>
            <SheetDescription className="sr-only">Choose your region</SheetDescription>
          </SheetHeader>
          <div className="overflow-auto h-[calc(100%-50px)]">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => { setRegion(r); setShowRegionSheet(false) }}
                className={`w-full flex items-center justify-between py-3 border-b border-border last:border-0 ${region === r ? "text-primary" : "text-foreground"}`}
              >
                <span className="text-sm">{r}</span>
                {region === r && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Gender Sheet */}
      <Sheet open={showGenderSheet} onOpenChange={setShowGenderSheet}>
        <SheetContent side="bottom" className="h-auto rounded-t-3xl px-4 pb-8">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-base">Select Gender</SheetTitle>
            <SheetDescription className="sr-only">Choose your gender</SheetDescription>
          </SheetHeader>
          <div>
            {genders.map((g) => (
              <button
                key={g}
                onClick={() => { setGender(g); setShowGenderSheet(false) }}
                className={`w-full flex items-center justify-between py-3 border-b border-border last:border-0 ${gender === g ? "text-primary" : "text-foreground"}`}
              >
                <span className="text-sm">{g}</span>
                {gender === g && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Age Sheet */}
      <Sheet open={showAgeSheet} onOpenChange={setShowAgeSheet}>
        <SheetContent side="bottom" className="h-auto rounded-t-3xl px-4 pb-8">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-base">Select Age Range</SheetTitle>
            <SheetDescription className="sr-only">Choose your age range</SheetDescription>
          </SheetHeader>
          <div>
            {ageRanges.map((a) => (
              <button
                key={a}
                onClick={() => { setAge(a); setShowAgeSheet(false) }}
                className={`w-full flex items-center justify-between py-3 border-b border-border last:border-0 ${age === a ? "text-primary" : "text-foreground"}`}
              >
                <span className="text-sm">{a}</span>
                {age === a && <Check className="size-4 text-primary" />}
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
        <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SetupContent />
    </Suspense>
  )
}
