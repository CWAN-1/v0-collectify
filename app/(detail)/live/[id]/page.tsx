"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Star, Share2, Wallet, Store, MoreHorizontal, X, Search, SlidersHorizontal, Bell, Plus, CreditCard, MapPin, Minus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
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

const initialAuctionItem = {
  image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=160&h=160&fit=crop",
  title: "Flashlight Gloves 1 pair Right and Left  #20",
  condition: "Brand New",
  currentPrice: 10,
  shipping: "Free Shipping",
  hasTax: true,
}

const shopProducts = [
  { id: "1", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop", title: "5-in-1 Microcurrent Facial Massager BLACK", qty: 40, price: 6, bids: 4, hasShipping: true, notify: 35 },
  { id: "2", image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=200&h=200&fit=crop", title: "7 Color LED light Beauty Rejuvenation Device Rose Gold", qty: 25, price: 6, bids: 6, hasShipping: true, notify: 10 },
  { id: "3", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", title: "7 Color LED light Beauty Rejuvenation Device White", qty: 106, price: 4, bids: 4, hasShipping: true, notify: 8 },
  { id: "4", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop", title: "8K ULTRA HD WIFI TRAIL CAMERA 32GB mini SD Cars", qty: 7, price: 1, bids: 1, hasShipping: false, notify: 1, condition: "Open-box" },
]

const chatMessages = [
  { id: "1", user: "drejo", level: 1, avatar: null, color: "bg-orange-500", message: "Make the cactus dance", hasGoldFrame: false },
  { id: "2", user: "ilikecards01", level: 10, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", color: "bg-indigo-600", message: "Tips are welcomed. Jirehsales has a men's home and all tips go to...", hasMore: true, hasGoldFrame: true },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showWallet, setShowWallet] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [shopFilter, setShopFilter] = useState("all")
  const [shopSearch, setShopSearch] = useState("")

  // Auction state
  const [currentPrice, setCurrentPrice] = useState(initialAuctionItem.currentPrice)
  const [bidPrice, setBidPrice] = useState(currentPrice + 1) // Bid is always higher than current
  const [countdown, setCountdown] = useState(15) // 15 seconds countdown
  const [isAuctionActive, setIsAuctionActive] = useState(true)
  const [showCustomBid, setShowCustomBid] = useState(false)
  const [customBidAmount, setCustomBidAmount] = useState(currentPrice + 1)
  const [maxBidEnabled, setMaxBidEnabled] = useState(true)
  const [showWinner, setShowWinner] = useState(false)
  const [winner] = useState({ name: "amyamy96811", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" })
  const [entryNotification, setEntryNotification] = useState<{ name: string; level: number } | null>({ name: "collector_jane", level: 10 })

  // Entry notification auto-dismiss after 3s
  useEffect(() => {
    if (entryNotification) {
      const timer = setTimeout(() => setEntryNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [entryNotification])

  // Countdown timer
  useEffect(() => {
    if (!isAuctionActive || countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsAuctionActive(false)
          setShowWinner(true)
          setTimeout(() => {
            setShowWinner(false)
            setCurrentPrice(initialAuctionItem.currentPrice)
            setBidPrice(initialAuctionItem.currentPrice + 1)
            setCountdown(15)
            setIsAuctionActive(true)
          }, 2000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAuctionActive, countdown])

  // Handle quick bid
  const handleBid = useCallback(() => {
    if (!isAuctionActive) return
    setCurrentPrice(bidPrice)
    setBidPrice(bidPrice + 1)
    setCountdown(15) // Reset countdown on new bid
  }, [bidPrice, isAuctionActive])

  // Handle custom bid submit
  const handleCustomBidSubmit = useCallback(() => {
    if (customBidAmount > currentPrice) {
      setCurrentPrice(customBidAmount)
      setBidPrice(customBidAmount + 1)
      setCountdown(15)
      setShowCustomBid(false)
    }
  }, [customBidAmount, currentPrice])

  // Format countdown as MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">

      {/* Full-screen black BG */}
      <div className="absolute inset-0 bg-black" />

      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 pt-10 pb-2">
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
                  isFollowing ? "bg-white/25 text-white" : "bg-red-700 text-white"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>

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
        <div className="flex flex-col items-center gap-0.5">
          <MoreHorizontal className="size-5 text-white drop-shadow" />
          <span className="text-white/80 text-[9px]">More</span>
        </div>

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

        <button onClick={() => setShowWallet(true)} className="flex flex-col items-center gap-0.5">
          <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Wallet className="size-[18px] text-white" />
          </div>
          <span className="text-white/80 text-[9px]">Wallet</span>
        </button>

        <button onClick={() => setShowShop(true)} className="flex flex-col items-center gap-0.5">
          <div className="relative">
            <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Store className="size-[18px] text-white" />
            </div>
            <div className="absolute -top-1 -right-1 size-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">35</span>
            </div>
          </div>
          <span className="text-white/80 text-[9px]">Shop</span>
        </button>
      </div>

      {/* ── ENTRY NOTIFICATION (above chat, higher position) ── */}
      {entryNotification && (
        <div
          className="absolute left-3 flex items-center gap-1.5 animate-in fade-in slide-in-from-left-4 duration-300"
          style={{ right: "60px", top: "42%" }}
        >
          <span className="text-yellow-400 text-sm">&#x1F451;</span>
          <span className="text-white/90 text-[11px]">
            <span className="font-semibold text-white">{entryNotification.name}</span>
            <span className="text-yellow-400 font-bold ml-1">LV{entryNotification.level}</span>
            <span className="text-white/70 ml-1">entered the live room</span>
          </span>
        </div>
      )}

      {/* ── CHAT MESSAGES ── */}
      <div
        className="absolute left-3 flex flex-col justify-end gap-1.5 overflow-hidden"
        style={{ right: "60px", top: "50%", bottom: "168px" }}
      >
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-center gap-2">
            {/* Avatar wrapper — 28x28 to allow crown badge overflow top-left */}
            <div className="relative shrink-0" style={{ width: 32, height: 32 }}>
              <div className={`size-7 rounded-full overflow-hidden flex items-center justify-center absolute bottom-0 right-0 ${msg.color}`}>
                {msg.avatar ? (
                  <Image src={msg.avatar} alt={msg.user} width={28} height={28} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <span className="text-[10px] text-white font-bold">{msg.user[0].toUpperCase()}</span>
                )}
              </div>
              {msg.hasGoldFrame && (
                <div className="absolute bottom-0 right-0 size-7 rounded-full ring-2 ring-yellow-400 pointer-events-none" />
              )}
              {msg.hasGoldFrame && (
                <div className="absolute top-0 left-0 z-10 size-3.5 rounded-full bg-black flex items-center justify-center shadow-sm">
                  <span className="text-yellow-400 leading-none" style={{ fontSize: 8 }}>&#x1F451;</span>
                </div>
              )}
            </div>
            {/* Text: username on top, message below */}
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                <span className="text-white text-[11px] font-semibold leading-none">{msg.user}</span>
                <span className={`text-[8px] px-1 py-px rounded font-bold leading-none ${
                  msg.level >= 10
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gray-400/60 text-white/80"
                }`}>LV{msg.level}</span>
              </div>
              <span className="text-white text-[11px] leading-snug mt-0.5">
                {msg.message}
                {msg.hasMore && <span className="text-orange-400 font-semibold"> More</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── CHAT INPUT ── */}
      <div className="absolute left-3" style={{ right: "60px", bottom: "128px" }}>
        <Input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Say something..."
          className="h-8 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/45 text-[12px] px-4"
        />
      </div>

      {/* ── BOTTOM PRODUCT AREA (Auction Mode) ── fixed height to prevent layout shift */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-5">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="size-[48px] rounded-lg overflow-hidden bg-white/10 shrink-0">
            <Image src={initialAuctionItem.image} alt={initialAuctionItem.title} width={48} height={48} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="text-white font-bold text-[11px] leading-snug flex-1">{initialAuctionItem.title}</p>
              <div className="shrink-0 text-right">
                <p className="text-white font-bold text-[11px] leading-none">${currentPrice.toFixed(2)}</p>
                {/* Fixed-height row: shows countdown or "Sold" — always present to prevent height shift */}
                <p className="text-red-400 text-[10px] font-bold mt-0.5 h-[14px]">
                  {isAuctionActive ? formatCountdown(countdown) : countdown === 0 ? "Sold" : ""}
                </p>
              </div>
            </div>
            <p className="text-white/65 text-[9px] mt-0.5">{initialAuctionItem.condition}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="bg-indigo-500 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full">{initialAuctionItem.shipping}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCustomBidAmount(currentPrice + 1); setShowCustomBid(true) }}
            className="h-6 px-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-[10px]"
          >
            Custom
          </button>
          <button
            onClick={handleBid}
            disabled={!isAuctionActive}
            className="flex-1 h-6 rounded-full bg-red-700 text-white font-bold text-[10px] flex items-center justify-center gap-1 disabled:opacity-50"
          >
            Bid: ${bidPrice} <span className="text-[9px]">&gt;&gt;</span>
          </button>
        </div>
      </div>

      {/* ── AUCTION WIN CELEBRATION (positioned above chat area) ── */}
      {showWinner && (
        <div
          className="absolute left-0 right-0 flex justify-center pointer-events-none z-20"
          style={{ top: "38%" }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Sparkle effects */}
              {[[-20,-20,"text-sm",0],[-12,32,"text-xs",200],[28,-14,"text-base",100],[24,30,"text-sm",300],[-28,14,"text-xs",150]].map(([t,l,sz,delay], i) => (
                <span key={i} className={`absolute ${sz} text-yellow-400 animate-ping`} style={{ top: Number(t), left: Number(l), animationDelay: `${delay}ms` }}>&#10022;</span>
              ))}
              {/* Crown frame wrapping avatar - SVG crown border effect */}
              <div className="relative">
                {/* Crown frame ring */}
                <div className="absolute -inset-1.5 rounded-full border-2 border-yellow-400 shadow-lg shadow-yellow-500/40" />
                {/* Crown icon at top of frame */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-black rounded-full px-1">
                  <span className="text-yellow-400 text-base">&#x1F451;</span>
                </div>
                <Avatar className="size-12 border-2 border-yellow-400">
                  <AvatarImage src={winner.avatar} />
                  <AvatarFallback>{winner.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <p className="text-yellow-400 font-bold text-sm mt-3 drop-shadow-lg">{winner.name}</p>
            <p className="text-white/80 text-[10px] mt-0.5">won the last auction!</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CUSTOM BID SHEET
      ══════════════════════════════════════════════════════════════════════ */}
      <Sheet open={showCustomBid} onOpenChange={setShowCustomBid}>
        <SheetContent side="bottom" className="rounded-t-3xl h-auto max-h-[60vh] bg-black/95 border-t border-white/10 p-0">
          <div className="px-4 pt-4 pb-6">
            {/* Product Info Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-white font-bold text-[12px] leading-snug">{initialAuctionItem.title}</p>
              </div>
              <div className="text-right ml-2">
                <p className="text-white font-bold text-[12px]">US${currentPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Countdown */}
            {isAuctionActive && (
              <p className="text-red-400 text-center text-[12px] font-bold mb-4">{formatCountdown(countdown)}</p>
            )}

            {/* Bid Amount Selector — tapping the number focuses the hidden input */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setCustomBidAmount(Math.max(currentPrice + 1, customBidAmount - 1))}
                className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
              >
                <Minus className="size-5 text-white" />
              </button>
              <div className="relative flex items-center justify-center min-w-[120px]">
                <span className="text-white/60 text-lg mr-1">US$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={customBidAmount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    if (!isNaN(val) && val >= currentPrice + 1) setCustomBidAmount(val)
                  }}
                  className="bg-transparent text-yellow-400 text-4xl font-bold w-[100px] text-center outline-none border-b border-yellow-400/40 focus:border-yellow-400"
                />
              </div>
              <button
                onClick={() => setCustomBidAmount(customBidAmount + 1)}
                className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
              >
                <Plus className="size-5 text-white" />
              </button>
            </div>

            {/* Max Bid Toggle */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-1">
                <span className="text-white text-[11px] font-semibold">Max Bid</span>
                <div className="size-4 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-[8px]">i</span>
                </div>
              </div>
              <Switch checked={maxBidEnabled} onCheckedChange={setMaxBidEnabled} />
            </div>
            <p className="text-white/50 text-[10px] mb-4">
              {"When on, we'll automatically place bids for you, up to this price."}
            </p>

            {/* Submit Button */}
            <button
              onClick={handleCustomBidSubmit}
              disabled={customBidAmount <= currentPrice}
              className="w-full h-10 rounded-full bg-white/10 border border-white/30 text-white font-bold text-[12px] disabled:opacity-50"
            >
              Submit Max Bid
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ══════════════════════════════════════════════════════════════════════
          WALLET SHEET
      ══════════════════════════════════════════════════════════════════════ */}
      <Sheet open={showWallet} onOpenChange={setShowWallet}>
        <SheetContent side="bottom" className="rounded-t-3xl h-auto max-h-[50vh] bg-background p-0">
          <div className="px-4 pt-4 pb-6">
            <SheetHeader className="mb-3">
              <SheetTitle className="text-left text-sm font-bold">Wallet</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between py-2.5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Add Shipping Details</p>
                  <p className="text-[10px] text-muted-foreground">Used to mail your purchases to you</p>
                </div>
              </div>
              <button className="flex items-center gap-0.5 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary">
                <Plus className="size-2.5" />
                Add
              </button>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Add Payment Method</p>
                  <p className="text-[10px] text-muted-foreground">{"You won't be charged until you purchase"}</p>
                </div>
              </div>
              <button className="flex items-center gap-0.5 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary">
                <Plus className="size-2.5" />
                Add
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ══════════════════════════════════════════════════════════════════════
          SHOP SHEET
      ══════════════════════════════════════════════════════════════════════ */}
      <Sheet open={showShop} onOpenChange={setShowShop}>
        <SheetContent side="bottom" className="h-full rounded-none bg-background p-0">
          <div className="flex flex-col h-full">
            <div className="px-4 pt-12 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    placeholder="Search shop..."
                    className="h-9 pl-9 pr-4 text-sm bg-muted border-0 rounded-lg"
                  />
                </div>
                <button onClick={() => setShowShop(false)} className="size-9 flex items-center justify-center">
                  <X className="size-5 text-foreground" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-xs font-medium shrink-0">
                  <SlidersHorizontal className="size-3" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-xs font-medium shrink-0">
                  Sort <ChevronDown className="size-3" />
                </button>
                {["Auction", "Buy Now", "Sold"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setShopFilter(shopFilter === f.toLowerCase() ? "all" : f.toLowerCase())}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
                      shopFilter === f.toLowerCase() ? "bg-foreground text-background" : "border border-border"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <p className="text-sm font-semibold mb-3">Products ({shopProducts.length})</p>

              <div className="flex flex-col gap-3">
                {shopProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 pb-3 border-b border-border">
                    <div className="relative size-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image src={product.image} alt={product.title} fill className="object-cover" unoptimized />
                      {product.hasShipping && (
                        <span className="absolute bottom-1 left-1 bg-indigo-500 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded">
                          Free Shipping
                        </span>
                      )}
                      {product.notify > 0 && (
                        <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-white/90 rounded px-1 py-0.5">
                          <Bell className="size-2.5 text-foreground" />
                          <span className="text-[8px] font-bold text-foreground">{product.notify}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug line-clamp-2">{product.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {product.qty}{product.condition ? ` · ${product.condition}` : ""}
                      </p>
                      <p className="text-sm font-bold mt-1">${product.price}</p>
                      <p className="text-xs text-muted-foreground">{product.bids} bids</p>
                    </div>

                    <button className="shrink-0 px-4 py-2 rounded-full border border-border text-xs font-semibold">
                      Pre-Bid
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
