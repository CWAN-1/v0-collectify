"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Star, Share2, Wallet, Store, MoreHorizontal, Scissors, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"

const liveData = {
  user: {
    name: "jirehsales",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
    rating: 4.9,
  },
  viewers: 68,
  thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=1200&fit=crop",
}

const auctionItem = {
  image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=160&h=160&fit=crop",
  title: "Flashlight Gloves 1 pair Right and Left  #20",
  condition: "Brand New",
  price: 10,
  sold: true,
  shipping: "Free Shipping",
  hasTax: true,
  winner: "amyamy96811",
}

const chatMessages = [
  { id: "1", user: "ilikecards01", isMod: true,  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=40&h=40&fit=crop", color: "bg-indigo-600", message: "From a mess into a message. Dios es bueno!" },
  { id: "2", user: "drejo",         isMod: false, avatar: null, color: "bg-orange-500", message: "Make the cactus dance" },
  { id: "3", user: "ilikecards01", isMod: true,  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", color: "bg-indigo-600", message: "Tips are welcomed. Jirehsales has a men's home and all tips go to...", hasMore: true },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showWinner, setShowWinner] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowWinner(true), 1500)
    const t2 = setTimeout(() => setShowWinner(false), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">

      {/* Full-screen black BG */}
      <div className="absolute inset-0 bg-black" />

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 pt-10 pb-2">
        {/* Left: avatar + info — 20% smaller */}
        <div className="flex items-center gap-1.5">
          <Avatar className="size-7 border border-white/50 shrink-0">
            <AvatarImage src={liveData.user.avatar} />
            <AvatarFallback>{liveData.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-white text-[11px] font-semibold leading-none drop-shadow">{liveData.user.name}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="size-2 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-[10px] leading-none">{liveData.user.rating}</span>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold leading-none ${
                  isFollowing ? "bg-white/25 text-white" : "bg-yellow-400 text-black"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: viewers pill + close — 20% smaller */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full pl-1.5 pr-2.5 py-1">
            <div className="flex items-end gap-px h-3">
              {[2, 4, 3, 5, 2].map((h, i) => (
                <div key={i} className="w-0.5 bg-red-500 rounded-full" style={{ height: `${h * 2}px` }} />
              ))}
            </div>
            <span className="text-white text-[11px] font-semibold">{liveData.viewers}</span>
          </div>
          <button
            onClick={() => router.back()}
            className="size-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronDown className="size-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* ── RIGHT TOOLBAR ── */}
      <div className="absolute right-2.5 top-1/3 flex flex-col items-center gap-3.5">
        {/* More (...) */}
        <div className="flex flex-col items-center gap-0.5">
          <MoreHorizontal className="size-5 text-white drop-shadow" />
          <span className="text-white/80 text-[9px]">More</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="size-[18px] text-white" />
            </div>
            <div className="absolute -top-1 -right-1 size-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">8</span>
            </div>
          </div>
          <span className="text-white/80 text-[9px]">Share</span>
        </div>

        {/* Wallet */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Wallet className="size-[18px] text-white" />
          </div>
          <span className="text-white/80 text-[9px]">Wallet</span>
        </div>

        {/* View Shop */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Store className="size-[18px] text-white" />
            </div>
            <div className="absolute -top-1 -right-1 size-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">35</span>
            </div>
          </div>
          <span className="text-white/80 text-[9px]">Shop</span>
        </div>
      </div>

      {/* ── CHAT MESSAGES ── messages only, above the input bar */}
      <div
        className="absolute left-3 flex flex-col justify-end gap-1.5 overflow-hidden"
        style={{ right: "60px", top: "50%", bottom: "168px" }}
      >
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-1.5">
            <div className={`size-6 rounded-full shrink-0 overflow-hidden flex items-center justify-center ${msg.color}`}>
              {msg.avatar ? (
                <Image src={msg.avatar} alt={msg.user} width={24} height={24} className="w-full h-full object-cover" unoptimized />
              ) : (
                <span className="text-[9px] text-white font-bold">{msg.user[0].toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-white text-[11px] font-semibold">{msg.user} </span>
              {msg.isMod && (
                <span className="bg-gray-500/80 text-white text-[8px] px-1 py-px rounded font-bold align-middle mr-1">Mod</span>
              )}
              <span className="text-white text-[11px] leading-snug">
                {msg.message}
                {msg.hasMore && <span className="text-orange-400 font-semibold"> More</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── CHAT INPUT — fixed gap above product area ── */}
      <div
        className="absolute left-3"
        style={{ right: "60px", bottom: "128px" }}
      >
        <Input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Say something..."
          className="h-8 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/45 text-[12px] px-4"
        />
      </div>

      {/* ── BOTTOM PRODUCT AREA — auction mode ── */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-5">
        {/* Product row */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="size-[48px] rounded-lg overflow-hidden bg-white/10 shrink-0">
            <Image
              src={auctionItem.image}
              alt={auctionItem.title}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-white font-bold text-[11px] leading-snug flex-1">{auctionItem.title}</p>
              <div className="shrink-0 text-right">
                <p className="text-white font-bold text-[11px] leading-none">${auctionItem.price}</p>
              </div>
            </div>
            <p className="text-white/65 text-[9px] mt-0.5">{auctionItem.condition}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="bg-indigo-500 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full">
                {auctionItem.shipping}
              </span>
              {auctionItem.hasTax && (
                <span className="text-white/65 text-[8px]">+ Taxes</span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons: Custom + Bid — 20% smaller height */}
        <div className="flex items-center gap-2">
          <button className="h-6 px-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-[10px]">
            Custom
          </button>
          <button className="flex-1 h-6 rounded-full bg-yellow-400 text-black font-bold text-[10px] flex items-center justify-center gap-1">
            Bid: $1 <span className="text-[9px]">&gt;&gt;</span>
          </button>
        </div>
      </div>

      {/* ── AUCTION WIN CELEBRATION ── */}
      {showWinner && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="flex flex-col items-center">
            <div className="relative">
              {[[-20,-20,"text-xl",0],[-10,32,"text-lg",200],[28,-14,"text-2xl",100],[24,30,"text-xl",300],[-28,14,"text-lg",150]].map(([t,l,sz,delay], i) => (
                <span key={i} className={`absolute ${sz} text-yellow-400 animate-ping`} style={{ top: Number(t), left: Number(l), animationDelay: `${delay}ms` }}>✦</span>
              ))}
              <Avatar className="size-16 border-4 border-yellow-400 shadow-2xl shadow-yellow-500/60">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-yellow-400 font-bold text-lg mt-3 drop-shadow-lg">{auctionItem.winner}</p>
            <p className="text-white/90 text-xs mt-0.5">won the auction!</p>
          </div>
        </div>
      )}
    </div>
  )
}
