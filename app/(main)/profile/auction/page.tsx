"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Trophy, XCircle, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const activeBids = [
  {
    id: "auction-1",
    image: "/cards/pokemon-1.jpg",
    name: "Walking Wake ex Hyper Rare",
    currentBid: 225,
    myBid: 220,
    isHighestBidder: false,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    bidCount: 7,
  },
  {
    id: "auction-2",
    image: "/cards/yugioh-1.jpg",
    name: "Dark Magician Ultimate Rare",
    currentBid: 450,
    myBid: 450,
    isHighestBidder: true,
    endTime: new Date(Date.now() + 45 * 60 * 1000),
    bidCount: 12,
  },
  {
    id: "auction-3",
    image: "/cards/onepiece-1.jpg",
    name: "Shanks Manga Art Secret",
    currentBid: 320,
    myBid: 300,
    isHighestBidder: false,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    bidCount: 9,
  },
]

const bidHistory = [
  {
    id: "1",
    image: "/cards/pokemon-1.jpg",
    name: "Pikachu VMAX Rainbow Rare",
    myBid: 245,
    finalPrice: 250,
    status: "won",
    endedAt: "2 days ago",
  },
  {
    id: "2",
    image: "/cards/yugioh-1.jpg",
    name: "Blue-Eyes White Dragon 1st Ed",
    myBid: 800,
    finalPrice: 920,
    status: "lost",
    endedAt: "5 days ago",
  },
  {
    id: "3",
    image: "/cards/onepiece-1.jpg",
    name: "Luffy Gear 5 Secret Rare",
    myBid: 175,
    finalPrice: 175,
    status: "won",
    endedAt: "1 week ago",
  },
  {
    id: "4",
    image: "/cards/mtg-1.jpg",
    name: "Black Lotus Alpha",
    myBid: 20000,
    finalPrice: 25000,
    status: "lost",
    endedAt: "2 weeks ago",
  },
]

function formatTimeLeft(endTime: Date) {
  const now = new Date().getTime()
  const end = endTime.getTime()
  const diff = Math.max(0, end - now)
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function AuctionCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
}

export default function AuctionPage() {
  const [activeTab, setActiveTab] = useState("bidding")
  const [showBidSheet, setShowBidSheet] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState<typeof activeBids[0] | null>(null)
  const [customBidAmount, setCustomBidAmount] = useState("")

  const wonBids = bidHistory.filter(b => b.status === "won")
  const lostBids = bidHistory.filter(b => b.status === "lost")

  const quickBidOptions = [
    { label: "+$1", value: 1 },
    { label: "+$5", value: 5 },
    { label: "+$10", value: 10 },
  ]

  const openBidSheet = (auction: typeof activeBids[0]) => {
    setSelectedAuction(auction)
    setShowBidSheet(true)
  }

  const handleQuickBid = (addAmount: number) => {
    if (selectedAuction) {
      const newBid = selectedAuction.currentBid + addAmount
      console.log(`Quick bid: $${newBid}`)
      setShowBidSheet(false)
    }
  }

  const handleCustomBid = () => {
    if (selectedAuction && customBidAmount) {
      console.log(`Custom bid: $${customBidAmount}`)
      setCustomBidAmount("")
      setShowBidSheet(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Link href="/profile" className="absolute left-4">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold">Auction</h1>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("bidding")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeTab === "bidding"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              Bidding
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              Bid History
            </button>
          </div>
        </div>
      </header>

      <main className="p-4">
        {activeTab === "bidding" && (
          <>
            {activeBids.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Gavel className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No active bids</h3>
                <p className="text-sm text-muted-foreground">Start bidding on auctions!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeBids.map((auction) => (
                  <div key={auction.id} className="bg-card rounded-xl border border-border p-3">
                    <div className="flex items-start gap-3">
                      <div className="size-16 rounded-lg overflow-hidden shrink-0 relative">
                        <Image
                          src={auction.image}
                          alt={auction.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{auction.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Current:</span>
                          <span className="text-sm font-semibold text-primary">${auction.currentBid}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">Your bid:</span>
                          <span className="text-sm font-medium">${auction.myBid}</span>
                          {auction.isHighestBidder ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-500">Highest</span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500">Outbid</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-red-500 text-xs font-medium">
                          <Clock className="size-3" />
                          <AuctionCountdown endTime={auction.endTime} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{auction.bidCount} bids</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => openBidSheet(auction)}
                      className="w-full h-9 mt-3 rounded-xl text-sm"
                      variant={auction.isHighestBidder ? "outline" : "default"}
                    >
                      {auction.isHighestBidder ? "Increase Bid" : "Place Higher Bid"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                <Trophy className="size-5 text-green-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-green-500">{wonBids.length}</p>
                <p className="text-[10px] text-muted-foreground">Won</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <XCircle className="size-5 text-red-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-red-500">{lostBids.length}</p>
                <p className="text-[10px] text-muted-foreground">Lost</p>
              </div>
            </div>

            {/* Bid List */}
            {bidHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Clock className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No bid history</h3>
                <p className="text-sm text-muted-foreground">Start bidding on auctions!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {bidHistory.map((bid) => (
                  <Link key={bid.id} href={`/auction/${bid.id}`}>
                    <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
                      <div className="size-14 rounded-lg overflow-hidden shrink-0 relative">
                        <Image
                          src={bid.image}
                          alt={bid.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{bid.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">Your bid:</span>
                          <span className="text-xs font-semibold text-primary">${bid.myBid}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">Final:</span>
                          <span className="text-xs font-medium">${bid.finalPrice}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          bid.status === "won" 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-red-500/20 text-red-500"
                        }`}>
                          {bid.status === "won" ? "Won" : "Lost"}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-1">{bid.endedAt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Bid Sheet */}
      <Sheet open={showBidSheet} onOpenChange={setShowBidSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-8">
          <SheetHeader className="text-left pb-3">
            <SheetTitle className="text-base">Place Your Bid</SheetTitle>
            <SheetDescription className="text-sm">
              Current bid: ${selectedAuction?.currentBid}
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4">
            {/* Quick Bid Options */}
            <div>
              <p className="text-sm font-medium mb-2">Quick Bid</p>
              <div className="grid grid-cols-3 gap-2">
                {quickBidOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="h-10 rounded-xl text-sm font-semibold"
                    onClick={() => handleQuickBid(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Custom Bid */}
            <div>
              <p className="text-sm font-medium mb-2">Custom Amount</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    placeholder={`${(selectedAuction?.currentBid || 0) + 1} or higher`}
                    value={customBidAmount}
                    onChange={(e) => setCustomBidAmount(e.target.value)}
                    className="h-10 pl-7 text-sm rounded-xl"
                  />
                </div>
                <Button 
                  className="h-10 px-5 rounded-xl font-semibold"
                  onClick={handleCustomBid}
                  disabled={!customBidAmount}
                >
                  Confirm
                </Button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground text-center pt-1">
              By placing a bid, you agree to pay if you win.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
