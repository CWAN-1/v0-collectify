"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Star, Zap, Scissors, Share2, Wallet, Store, ChevronRight, MoreHorizontal, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"

const liveStreamData = {
  user: {
    name: "weedil",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
    rating: 5.0,
  },
  viewers: 8,
  thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=900&fit=crop",
}

const currentItem = {
  image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
  title: "Pokemon 151 Japanese pack x 1",
  condition: "Near Mint",
  price: 8,
  left: 21,
  shipping: "Shipping & Tax",
  flag: "GB",
}

const chatMessages = [
  { id: "1", user: "joined", isMod: false, message: "joined 👋", avatar: null, isSystem: true },
  { id: "2", user: "london_calling", isMod: false, message: "Got you so high indeed", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=40&h=40&fit=crop" },
  { id: "3", user: "ewanmonty", isMod: false, message: "My mams a catholic and da is a proddy", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop" },
  { id: "4", user: "_thoa_", isMod: true, message: "funkos 🔥 one piece 🔥 pokemon tcg 🔥 check store 🍀", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", highlighted: true },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 2000)
    const hideTimer = setTimeout(() => setShowCelebration(false), 5000)
    return () => { clearTimeout(timer); clearTimeout(hideTimer) }
  }, [])

  return (
    <div className="fixed inset-0 bg-black">
      {/* Full-screen video background */}
      <div className="absolute inset-0">
        <Image
          src={liveStreamData.thumbnail}
          alt="Live stream"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        {/* Subtle gradient — only at very top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-40% to-black/30" />
      </div>

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-3 pt-12">
        {/* Left: avatar + name + rating + follow */}
        <div className="flex items-center gap-2">
          <Avatar className="size-10 border-2 border-white/40">
            <AvatarImage src={liveStreamData.user.avatar} />
            <AvatarFallback>{liveStreamData.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-white text-sm font-semibold drop-shadow">{liveStreamData.user.name}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="size-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs">{liveStreamData.user.rating.toFixed(1)}</span>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold ml-1 ${
                  isFollowing ? "bg-white/20 text-white" : "bg-white text-black"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: crown + viewers + chevron */}
        <div className="flex items-center gap-2 mt-1">
          {/* Crown badge */}
          <div className="size-9 rounded-lg bg-yellow-400 flex items-center justify-center">
            <Crown className="size-5 text-black fill-black" />
          </div>
          {/* Viewers badge */}
          <div className="flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1.5">
            <div className="size-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-xs font-semibold">{liveStreamData.viewers}</span>
          </div>
          {/* Minimize */}
          <button
            onClick={() => router.back()}
            className="size-9 rounded-full bg-black/40 flex items-center justify-center"
          >
            <ChevronDown className="size-5 text-white" />
          </button>
        </div>
      </div>

      {/* ── RIGHT SIDE TOOLBAR ── */}
      <div className="absolute right-2 flex flex-col items-center gap-4" style={{ top: "38%" }}>
        {/* More */}
        <div className="flex flex-col items-center gap-1">
          <button className="flex flex-col items-center gap-0.5">
            <MoreHorizontal className="size-5 text-white drop-shadow" />
            <span className="text-[10px] text-white/90">More</span>
          </button>
        </div>

        {/* Boost */}
        <div className="flex flex-col items-center gap-1">
          <div className="size-10 rounded-full bg-black/40 flex items-center justify-center">
            <Zap className="size-5 text-white" />
          </div>
          <span className="text-[10px] text-white/90">Boost</span>
        </div>

        {/* Clip */}
        <div className="flex flex-col items-center gap-1">
          <div className="size-10 rounded-full bg-black/40 flex items-center justify-center">
            <Scissors className="size-5 text-white" />
          </div>
          <span className="text-[10px] text-white/90">Clip</span>
        </div>

        {/* Share with badge */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative size-10 rounded-full bg-black/40 flex items-center justify-center">
            <Share2 className="size-5 text-white" />
            <span className="absolute -top-1 -right-1 size-4 bg-white rounded-full text-[9px] font-bold text-black flex items-center justify-center">1</span>
          </div>
          <span className="text-[10px] text-white/90">Share</span>
        </div>

        {/* Wallet */}
        <div className="flex flex-col items-center gap-1">
          <div className="size-10 rounded-full bg-black/40 flex items-center justify-center">
            <Wallet className="size-5 text-white" />
          </div>
          <span className="text-[10px] text-white/90">Wallet</span>
        </div>

        {/* Shop — gold border + price + left count */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative size-11 rounded-xl border-2 border-yellow-400 bg-black/40 flex items-center justify-center">
            <Store className="size-5 text-white" />
            <span className="absolute -top-1.5 -right-1.5 size-5 bg-white rounded-full text-[9px] font-bold text-black flex items-center justify-center">21</span>
          </div>
          <span className="text-[10px] text-white/90">Shop</span>
          <span className="text-xs font-bold text-white">£8</span>
          <span className="text-[10px] text-yellow-400 font-semibold">21 Left</span>
        </div>
      </div>

      {/* ── CHAT MESSAGES ── */}
      <div className="absolute left-3 right-16 flex flex-col gap-2" style={{ bottom: "200px" }}>
        {chatMessages.map((msg) => (
          msg.highlighted ? (
            <div key={msg.id} className="flex items-start gap-2 bg-black/40 rounded-xl px-2.5 py-2 backdrop-blur-sm">
              <Avatar className="size-7 shrink-0">
                <AvatarImage src={msg.avatar ?? undefined} />
                <AvatarFallback className="text-[10px]">{msg.user[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-semibold">{msg.user}</span>
                  {msg.isMod && <span className="bg-gray-500 text-white text-[8px] px-1 py-0.5 rounded font-bold">Mod</span>}
                </div>
                <p className="text-white text-xs leading-snug mt-0.5">{msg.message}</p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-center gap-1.5">
              {msg.avatar && (
                <Avatar className="size-6 shrink-0">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback className="text-[9px]">{msg.user[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              {!msg.avatar && !msg.isSystem && (
                <div className="size-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-white font-bold">{msg.user[0].toUpperCase()}</span>
                </div>
              )}
              <p className="text-white text-xs leading-snug">
                <span className="font-semibold">{msg.isSystem ? "" : msg.user + " "}</span>
                {msg.message}
              </p>
            </div>
          )
        ))}

        {/* Chat input */}
        <div className="mt-1">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Say something..."
            className="h-9 rounded-full bg-black/30 border-white/20 text-white placeholder:text-white/50 text-sm"
          />
        </div>
      </div>

      {/* ── BOTTOM PRODUCT AREA (transparent — video shows through) ── */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-8 pt-3">
        {/* Product card row */}
        <div className="flex items-start gap-3">
          {/* Product image */}
          <div className="size-16 rounded-xl overflow-hidden shrink-0 bg-black/20">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          {/* Product details */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base leading-snug">{currentItem.title}</p>
            <p className="text-white/70 text-xs mt-0.5">{currentItem.condition}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base">🇬🇧</span>
              <span className="text-white/70 text-xs">{currentItem.shipping}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 mt-3">
          <button className="flex-1 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm">
            Options
          </button>
          <button className="flex-[2] h-11 rounded-full bg-yellow-400 text-black font-bold text-base flex items-center justify-center gap-1">
            Buy Now
            <ChevronRight className="size-4 -mr-1" />
            <ChevronRight className="size-4 -ml-2" />
          </button>
        </div>
      </div>

      {/* ── CELEBRATION OVERLAY ── */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-5 -left-5 text-yellow-400 text-2xl animate-ping">✦</div>
              <div className="absolute -top-3 left-10 text-yellow-400 text-xl animate-ping" style={{ animationDelay: "0.2s" }}>✦</div>
              <div className="absolute top-10 -left-7 text-yellow-400 text-lg animate-ping" style={{ animationDelay: "0.4s" }}>✦</div>
              <div className="absolute top-8 left-12 text-yellow-400 text-2xl animate-ping" style={{ animationDelay: "0.1s" }}>✦</div>
              <div className="absolute -top-7 left-5 text-green-400 text-xl animate-ping" style={{ animationDelay: "0.3s" }}>✦</div>
              <Avatar className="size-20 border-4 border-yellow-400 shadow-2xl shadow-yellow-400/50">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-yellow-400 font-bold text-xl mt-3 drop-shadow-lg">alexsmi45760</p>
            <p className="text-white/90 text-sm mt-1">Made a first purchase</p>
          </div>
        </div>
      )}
    </div>
  )
}
