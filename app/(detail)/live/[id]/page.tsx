"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Star, Share2, Wallet, Store, MoreHorizontal, X, Search, SlidersHorizontal, Bell, Plus, CreditCard, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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

const shopProducts = [
  { id: "1", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop", title: "5-in-1 Microcurrent Facial Massager BLACK", qty: 40, price: 6, bids: 4, hasShipping: true, notify: 35 },
  { id: "2", image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=200&h=200&fit=crop", title: "7 Color LED light Beauty Rejuvenation Device Rose Gold", qty: 25, price: 6, bids: 6, hasShipping: true, notify: 10 },
  { id: "3", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", title: "7 Color LED light Beauty Rejuvenation Device White", qty: 106, price: 4, bids: 4, hasShipping: true, notify: 8 },
  { id: "4", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop", title: "8K ULTRA HD WIFI TRAIL CAMERA 32GB mini SD Cars", qty: 7, price: 1, bids: 1, hasShipping: false, notify: 1, condition: "Open-box" },
]

const chatMessages = [
  { id: "1", user: "ilikecards01", isMod: true, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=40&h=40&fit=crop", color: "bg-indigo-600", message: "From a mess into a message. Dios es bueno!" },
  { id: "2", user: "drejo", isMod: false, avatar: null, color: "bg-orange-500", message: "Make the cactus dance" },
  { id: "3", user: "ilikecards01", isMod: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", color: "bg-indigo-600", message: "Tips are welcomed. Jirehsales has a men's home and all tips go to...", hasMore: true },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showWinner, setShowWinner] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [shopFilter, setShopFilter] = useState("all")
  const [shopSearch, setShopSearch] = useState("")

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

        {/* Wallet Button */}
        <button onClick={() => setShowWallet(true)} className="flex flex-col items-center gap-0.5">
          <div className="size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Wallet className="size-[18px] text-white" />
          </div>
          <span className="text-white/80 text-[9px]">Wallet</span>
        </button>

        {/* Shop Button */}
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

      {/* ── CHAT MESSAGES ── */}
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

      {/* ── CHAT INPUT ── */}
      <div className="absolute left-3" style={{ right: "60px", bottom: "128px" }}>
        <Input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Say something..."
          className="h-8 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/45 text-[12px] px-4"
        />
      </div>

      {/* ── BOTTOM PRODUCT AREA ── */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-5">
        <div className="flex items-start gap-2.5 mb-2">
          <div className="size-[48px] rounded-lg overflow-hidden bg-white/10 shrink-0">
            <Image src={auctionItem.image} alt={auctionItem.title} width={48} height={48} className="w-full h-full object-cover" unoptimized />
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
              <span className="bg-indigo-500 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full">{auctionItem.shipping}</span>
              {auctionItem.hasTax && <span className="text-white/65 text-[8px]">+ Taxes</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-6 px-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-[10px]">Custom</button>
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

      {/* ══════════════════════════════════════════════════════════════════════
          WALLET SHEET (Half-screen)
      ══════════════════════════════════════════════════════════════════════ */}
      <Sheet open={showWallet} onOpenChange={setShowWallet}>
        <SheetContent side="bottom" className="rounded-t-3xl h-auto max-h-[50vh] bg-background p-0">
          <div className="px-4 pt-4 pb-6">
            <SheetHeader className="mb-3">
              <SheetTitle className="text-left text-sm font-bold">Wallet</SheetTitle>
            </SheetHeader>

            {/* Add Shipping Details */}
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

            {/* Add Payment Method */}
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
          SHOP SHEET (Full-screen)
      ══════════════════════════════════════════════════════════════════════ */}
      <Sheet open={showShop} onOpenChange={setShowShop}>
        <SheetContent side="bottom" className="h-full rounded-none bg-background p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
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

              {/* Filters */}
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

            {/* Products List */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <p className="text-sm font-semibold mb-3">Products ({shopProducts.length})</p>

              <div className="flex flex-col gap-3">
                {shopProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-3 pb-3 border-b border-border">
                    {/* Product Image */}
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

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug line-clamp-2">{product.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {product.qty}{product.condition ? ` · ${product.condition}` : ""}
                      </p>
                      <p className="text-sm font-bold mt-1">${product.price}</p>
                      <p className="text-xs text-muted-foreground">{product.bids} bids</p>
                    </div>

                    {/* Pre-Bid Button */}
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
