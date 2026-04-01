"use client"

import { ArrowLeft, Clock, Trophy, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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

export default function BidHistoryPage() {
  const wonBids = bidHistory.filter(b => b.status === "won")
  const lostBids = bidHistory.filter(b => b.status === "lost")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Bid History</h1>
        </div>
      </header>

      <main className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
            <Trophy className="size-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-500">{wonBids.length}</p>
            <p className="text-xs text-muted-foreground">Auctions Won</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <XCircle className="size-6 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-500">{lostBids.length}</p>
            <p className="text-xs text-muted-foreground">Auctions Lost</p>
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
          <div className="space-y-3">
            {bidHistory.map((bid) => (
              <Link key={bid.id} href={`/auction/${bid.id}`}>
                <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
                  <div className="size-16 rounded-lg overflow-hidden shrink-0 relative">
                    <Image
                      src={bid.image}
                      alt={bid.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">{bid.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Your bid:</span>
                      <span className="text-sm font-semibold text-primary">${bid.myBid}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">Final:</span>
                      <span className="text-sm font-medium">${bid.finalPrice}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
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
      </main>
    </div>
  )
}
