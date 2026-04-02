"use client"

import { useState, useRef, Suspense } from "react"
import { ArrowLeft, ArrowRight, Camera, Check, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Card IPs / Franchises
const cardIPs = [
  { id: "pokemon", name: "Pokemon", image: "/brands/pokemon.png", color: "bg-yellow-500" },
  { id: "yugioh", name: "Yu-Gi-Oh!", image: "/brands/yugioh.png", color: "bg-purple-500" },
  { id: "mtg", name: "Magic: The Gathering", image: "/brands/mtg.png", color: "bg-orange-500" },
  { id: "sports", name: "Sports Cards", image: "/brands/sports.png", color: "bg-green-500" },
  { id: "onepiece", name: "One Piece", image: "/brands/onepiece.png", color: "bg-red-500" },
  { id: "digimon", name: "Digimon", image: "/brands/digimon.png", color: "bg-blue-500" },
  { id: "dragonball", name: "Dragon Ball", image: "/brands/dragonball.png", color: "bg-orange-400" },
  { id: "disney", name: "Disney Lorcana", image: "/brands/disney.png", color: "bg-indigo-500" },
]

// Regions
const regions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "South Korea",
  "Germany",
  "France",
  "Indonesia",
  "Singapore",
  "Malaysia",
  "Philippines",
  "Thailand",
  "Vietnam",
  "China",
  "Taiwan",
  "Hong Kong",
  "Other",
]

function SetupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showRegionSheet, setShowRegionSheet] = useState(false)
  
  const [avatar, setAvatar] = useState<string | null>(null)
  const [nickname, setNickname] = useState("")
  const [region, setRegion] = useState("")
  const [selectedIPs, setSelectedIPs] = useState<string[]>([])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleIP = (ipId: string) => {
    if (selectedIPs.includes(ipId)) {
      setSelectedIPs(selectedIPs.filter(id => id !== ipId))
    } else {
      setSelectedIPs([...selectedIPs, ipId])
    }
  }

  const handleNext = () => {
    if (step === 1 && nickname.trim()) {
      setStep(2)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to home
    router.push("/")
  }

  const canProceedStep1 = nickname.trim().length >= 2
  const canProceedStep2 = selectedIPs.length >= 1

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <button 
          onClick={() => step === 1 ? router.back() : setStep(1)} 
          className="p-2 -ml-2"
        >
          <ArrowLeft className="size-6 text-foreground" />
        </button>
        <div className="flex gap-1.5">
          <div className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
          <div className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
        </div>
        <div className="w-10" />
      </header>

      {step === 1 ? (
        /* Step 1: Profile Info */
        <div className="flex-1 flex flex-col px-6 py-4">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Set Up Your Profile</h1>
            <p className="text-muted-foreground">Tell us a bit about yourself</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAvatarClick}
              className="relative size-28 rounded-full bg-card border-2 border-dashed border-border flex items-center justify-center overflow-hidden group"
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <Camera className="size-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="size-6 text-white" />
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Nickname */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Nickname</label>
              <Input
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                className="h-14 rounded-xl bg-card border-border text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1.5 text-right">{nickname.length}/20</p>
            </div>

            {/* Region */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Region</label>
              <button
                onClick={() => setShowRegionSheet(true)}
                className="w-full h-14 px-4 rounded-xl bg-card border border-border flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-muted-foreground" />
                  <span className={region ? "text-foreground" : "text-muted-foreground"}>
                    {region || "Select your region"}
                  </span>
                </div>
                <ChevronDown className="size-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Continue Button */}
          <Button
            onClick={handleNext}
            disabled={!canProceedStep1}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base mb-4"
          >
            <span className="flex items-center gap-2">
              Continue
              <ArrowRight className="size-5" />
            </span>
          </Button>

          {/* Skip */}
          <button
            onClick={() => setStep(2)}
            className="text-sm text-muted-foreground text-center hover:text-foreground"
          >
            Skip for now
          </button>
        </div>
      ) : (
        /* Step 2: Select Card IPs */
        <div className="flex-1 flex flex-col px-6 py-4">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">What Do You Collect?</h1>
            <p className="text-muted-foreground">Select your favorite card franchises</p>
          </div>

          {/* Card IPs Grid */}
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-auto pb-4">
            {cardIPs.map((ip) => {
              const isSelected = selectedIPs.includes(ip.id)
              return (
                <button
                  key={ip.id}
                  onClick={() => toggleIP(ip.id)}
                  className={`relative aspect-[4/3] rounded-2xl border-2 overflow-hidden transition-all ${
                    isSelected 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 ${ip.color} opacity-20`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="size-12 rounded-xl bg-card/80 backdrop-blur flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold">{ip.name[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground text-center line-clamp-1">
                      {ip.name}
                    </span>
                  </div>

                  {/* Selected Check */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 size-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="size-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected Count */}
          <p className="text-sm text-muted-foreground text-center mb-4">
            {selectedIPs.length} selected
          </p>

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            disabled={isLoading || !canProceedStep2}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base mb-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="size-5" />
              </span>
            )}
          </Button>

          {/* Skip */}
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className="text-sm text-muted-foreground text-center hover:text-foreground"
          >
            Skip for now
          </button>
        </div>
      )}

      {/* Region Sheet */}
      <Sheet open={showRegionSheet} onOpenChange={setShowRegionSheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl" aria-describedby={undefined}>
          <SheetHeader className="pb-4">
            <SheetTitle>Select Region</SheetTitle>
          </SheetHeader>
          <div className="overflow-auto h-[calc(100%-60px)] -mx-6 px-6">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRegion(r)
                  setShowRegionSheet(false)
                }}
                className={`w-full flex items-center justify-between py-4 border-b border-border ${
                  region === r ? 'text-primary' : 'text-foreground'
                }`}
              >
                <span>{r}</span>
                {region === r && <Check className="size-5 text-primary" />}
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SetupContent />
    </Suspense>
  )
}
