"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Star, Zap, Scissors, Share2, Wallet, Store, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock live stream data
const liveStreamData = {
  id: "live-1",
  user: {
    name: "jirehsales",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
    rating: 4.9,
    isFollowing: false,
  },
  title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODDS!",
  viewers: 68,
  category: "Pokemon Cards",
  thumbnail: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=900&fit=crop",
}

// Current auction item
const currentItem = {
  id: "item-1",
  image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
  title: "Flashlight Gloves 1 pair Right and Left #20",
  condition: "Brand New",
  currentBid: 10,
  status: "sold", // "bidding" | "sold" | "awaiting" | "ended"
  winner: "amyamy96811",
  tags: ["Free Shipping", "+ Taxes"],
}

// Chat messages
const chatMessages = [
  { id: "1", user: "jirecards01", isMod: true, message: "From a mess into a message. Dios es bueno!", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop" },
  { id: "2", user: "dreiv", isMod: false, message: "Make the cactus dance", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=40&h=40&fit=crop" },
  { id: "3", user: "ilikecards01", isMod: true, message: "Tips are welcomed. Jirehsales has a men's home and all tips go to...", hasMore: true, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop" },
]

// Right side action buttons
const sideActions = [
  { id: "boost", icon: Zap, label: "Boost", count: null },
  { id: "clip", icon: Scissors, label: "Clip", count: null },
  { id: "share", icon: Share2, label: "Share", count: 8 },
  { id: "wallet", icon: Wallet, label: "Wallet", count: null },
  { id: "shop", icon: Store, label: "View\nShop", count: null },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [bidAmount, setBidAmount] = useState(1)

  // Simulate celebration animation periodically
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 2000)
    const hideTimer = setTimeout(() => setShowCelebration(false), 5000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Full screen video background */}
      <div className="absolute inset-0">
        <Image
          src={liveStreamData.thumbnail}
          alt={liveStreamData.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Content overlay */}
      <div className="relative flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-3 pt-12">
          {/* Streamer info - left */}
          <div className="flex items-center gap-2">
            <Avatar className="size-9 border-2 border-white/30">
              <AvatarImage src={liveStreamData.user.avatar} />
              <AvatarFallback>{liveStreamData.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-sm font-semibold">{liveStreamData.user.name}</span>
                <div className="flex items-center gap-0.5 bg-black/40 px-1.5 py-0.5 rounded-full">
                  <Star className="size-2.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] text-white">{liveStreamData.user.rating}</span>
                </div>
              </div>
              <Button
                size="sm"
                className={`h-5 px-2 text-[10px] rounded-full mt-0.5 ${
                  isFollowing 
                    ? "bg-white/20 text-white hover:bg-white/30" 
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          {/* Viewer count & minimize - right */}
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white text-xs font-bold pl-2 pr-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              <span>{liveStreamData.viewers}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full bg-black/30 text-white"
              onClick={() => router.back()}
            >
              <ChevronDown className="size-5" />
            </Button>
          </div>
        </div>

        {/* Purchase celebration overlay */}
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="flex flex-col items-center animate-bounce">
              {/* Sparkles */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-yellow-400 text-2xl animate-ping">✦</div>
                <div className="absolute -top-2 left-8 text-yellow-400 text-xl animate-ping" style={{ animationDelay: "0.2s" }}>✦</div>
                <div className="absolute top-8 -left-6 text-yellow-400 text-lg animate-ping" style={{ animationDelay: "0.4s" }}>✦</div>
                <div className="absolute top-6 left-10 text-yellow-400 text-2xl animate-ping" style={{ animationDelay: "0.1s" }}>✦</div>
                <div className="absolute -top-6 left-4 text-green-400 text-xl animate-ping" style={{ animationDelay: "0.3s" }}>✦</div>
                <Avatar className="size-16 border-4 border-yellow-400 shadow-lg shadow-yellow-400/50">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-green-400 font-bold text-lg mt-2">alexsmi45760</p>
              <p className="text-white/80 text-sm">Made a first purchase</p>
            </div>
          </div>
        )}

        {/* Right side action buttons */}
        <div className="absolute right-2 top-1/3 flex flex-col items-center gap-3">
          {sideActions.map((action) => (
            <button key={action.id} className="flex flex-col items-center gap-0.5">
              <div className="size-10 rounded-full bg-black/40 flex items-center justify-center relative">
                <action.icon className="size-5 text-white" />
                {action.count && (
                  <span className="absolute -top-1 -right-1 size-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {action.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/80 text-center whitespace-pre-line">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Chat messages - left side floating */}
        <div className="flex-1 flex flex-col justify-end px-3 pb-2 max-w-[75%]">
          <div className="space-y-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2 bg-black/30 rounded-xl px-2 py-1.5 backdrop-blur-sm">
                <Avatar className="size-6 shrink-0">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-white text-[11px] font-medium">{msg.user}</span>
                    {msg.isMod && (
                      <span className="bg-green-600 text-white text-[8px] px-1 rounded font-bold">Mod</span>
                    )}
                  </div>
                  <p className="text-white/90 text-[11px] leading-tight">
                    {msg.message}
                    {msg.hasMore && <span className="text-blue-400 ml-1">More</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="mt-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Say something..."
              className="h-9 rounded-full bg-black/40 border-white/20 text-white placeholder:text-white/50 text-sm"
            />
          </div>
        </div>

        {/* Bottom section - Current item card */}
        <div className="bg-black/60 backdrop-blur-md px-3 py-2 pb-6">
          {/* Winner announcement if sold */}
          {currentItem.status === "sold" && currentItem.winner && (
            <div className="flex items-center gap-1 mb-2">
              <Avatar className="size-5">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span className="text-yellow-400 text-xs font-medium">{currentItem.winner}</span>
              <span className="text-yellow-400 text-xs">won!</span>
            </div>
          )}

          {/* Item card */}
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-2">
            {/* Item image */}
            <div className="size-14 rounded-lg overflow-hidden shrink-0 bg-muted">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Item info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{currentItem.title}</p>
              <p className="text-white/60 text-[10px]">{currentItem.condition}</p>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {currentItem.tags.map((tag, i) => (
                  <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${
                    tag === "Free Shipping" ? "bg-green-600 text-white" : "bg-white/20 text-white/80"
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & status */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-white font-bold text-lg">${currentItem.currentBid}</span>
              {currentItem.status === "sold" && (
                <span className="text-red-400 text-[10px] font-medium">Sold</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-3">
            {currentItem.status === "awaiting" ? (
              <div className="flex-1 bg-white/20 text-white/60 text-center py-3 rounded-full text-sm font-medium">
                Awaiting Next Item
              </div>
            ) : currentItem.status === "ended" ? (
              <div className="flex-1 bg-white/20 text-white/60 text-center py-3 rounded-full text-sm font-medium">
                Auction Ended
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Custom
                </Button>
                <Button
                  className="flex-[2] h-11 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold flex items-center justify-center gap-1"
                >
                  Bid: ${bidAmount}
                  <ChevronRight className="size-4" />
                  <ChevronRight className="size-4 -ml-2.5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
