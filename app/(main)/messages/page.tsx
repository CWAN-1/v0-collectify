"use client"

import { useState } from "react"
import {
  Package, Heart, UserPlus, MessageCircle, Check, Bell, Settings,
  FolderPlus, Folder, MoreVertical, X, TrendingUp, Trophy, XCircle,
  Gavel, ShoppingBag, Bookmark, Clock, ChevronRight
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

// ── Types ──────────────────────────────────────────────
type ActivityTab = "purchases" | "bids" | "messages" | "saved"

// ── Mock Data ──────────────────────────────────────────
const purchaseFilters = ["All", "In Progress", "Completed", "Refunds", "Cancelled"]

const mockPurchases = [
  {
    id: "p1",
    title: "Ear Wax OTOSCOPE Wireless iPhone/...",
    price: 12.03,
    status: "Preparing Package",
    date: "2/10/25",
    seller: "jirehsales",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop",
  },
  {
    id: "p2",
    title: "Pikachu VMAX Rainbow Rare Vivid Voltage",
    price: 250.00,
    status: "Shipped",
    date: "2/8/25",
    seller: "CardMaster",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=120&h=120&fit=crop",
  },
  {
    id: "p3",
    title: "Charizard GX Shiny Secret Rare",
    price: 450.00,
    status: "Completed",
    date: "1/30/25",
    seller: "PokeFan",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=120&h=120&fit=crop",
  },
]

const bidFilters = ["All", "Outbid", "Winning", "Recently Ended"]

const userBids = [
  {
    id: "b1",
    title: "2019 Panini Playbook Football Patrick Maho...",
    currentBid: 57,
    myBid: 55,
    image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=200&h=200&fit=crop",
    seller: { name: "sportscards1", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop", rating: 5.0 },
    status: "Winning",
    timeLeft: "2h 45m",
    bids: 12,
  },
  {
    id: "b2",
    title: "Jalen Carter Superbowl RC Dye Cut Silver holo...",
    currentBid: 4,
    myBid: 3.50,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    seller: { name: "davecrack", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop", rating: 5.0 },
    status: "Outbid",
    timeLeft: "5h 20m",
    bids: 8,
  },
  {
    id: "b3",
    title: "2024 Topps Chrome Update Series Refractor",
    currentBid: 7,
    myBid: 6.50,
    image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=200&h=200&fit=crop",
    seller: { name: "sportshub", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", rating: 4.8 },
    status: "Winning",
    timeLeft: "1d 3h",
    bids: 5,
  },
]

const savedItems = [
  {
    id: "s1",
    title: "Pikachu VMAX Rainbow Rare",
    price: 250,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
    seller: "CardMaster",
  },
  {
    id: "s2",
    title: "Blue-Eyes White Dragon Secret",
    price: 850,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&h=200&fit=crop",
    seller: "YugiCollector",
  },
  {
    id: "s3",
    title: "Charizard Base Set Holo",
    price: 1200,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
    seller: "VintageCards",
  },
  {
    id: "s4",
    title: "Shanks Manga Art Secret Rare",
    price: 350,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop",
    seller: "OnePieceCollector",
  },
]

const initialChats = [
  {
    id: "1",
    user: { name: "jirehsales", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "hi",
    time: "6h",
    unread: 0,
    isOnline: true,
    folderId: null,
  },
  {
    id: "2",
    user: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "Your card has been shipped!",
    time: "10:30",
    unread: 2,
    isOnline: true,
    folderId: null,
  },
  {
    id: "3",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    lastMessage: "Wow, amazing collection!",
    time: "Yesterday",
    unread: 0,
    isOnline: true,
    folderId: null,
  },
  {
    id: "4",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: false },
    lastMessage: "I sent the additional photos",
    time: "Yesterday",
    unread: 1,
    isOnline: false,
    folderId: null,
  },
]

const notifications = [
  { id: "a1", type: "auction_outbid", category: "auction", icon: TrendingUp, title: "You've Been Outbid!", message: "Charizard Base Set Holo - New bid: $2,600", time: "5 min ago", read: false, link: "/profile/auction" },
  { id: "a2", type: "auction_won", category: "auction", icon: Trophy, title: "Auction Won!", message: "Congratulations! You won Pikachu VMAX for $250", time: "1 hour ago", read: false, link: "/profile/auction" },
  { id: "a3", type: "auction_lost", category: "auction", icon: XCircle, title: "Auction Ended", message: "Blue-Eyes Dragon sold to another bidder", time: "3 hours ago", read: true, link: "/profile/auction" },
  { id: "n1", type: "order", category: "order", icon: Package, title: "Order Shipped", message: "Order #ORD123456 is on its way", time: "2 hours ago", read: false },
  { id: "n2", type: "like", category: "post", icon: Heart, title: "Post liked", message: "Alex and 23 others liked your post", time: "3 hours ago", read: false },
  { id: "n3", type: "follow", category: "follow", icon: UserPlus, title: "New follower", message: "CardMaster started following you", time: "5 hours ago", read: true },
  { id: "n4", type: "system", category: "system", icon: Bell, title: "Account Verified", message: "Your seller account has been verified", time: "3 days ago", read: true },
]

// ── Status badge ───────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Preparing Package": "bg-yellow-500/15 text-yellow-600",
    "Shipped": "bg-blue-500/15 text-blue-600",
    "Completed": "bg-green-500/15 text-green-600",
    "Cancelled": "bg-red-500/15 text-red-600",
  }
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${colors[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  )
}

// ── Main Page ──────────────────────────────────────────
export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<ActivityTab>("purchases")
  const [purchaseFilter, setPurchaseFilter] = useState("All")
  const [bidFilter, setBidFilter] = useState("All")
  const [chats, setChats] = useState(initialChats)
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([
    { id: "sellers", name: "Sellers" },
    { id: "friends", name: "Friends" },
  ])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showNewFolderSheet, setShowNewFolderSheet] = useState(false)
  const [showMoveChatSheet, setShowMoveChatSheet] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [movingChatId, setMovingChatId] = useState<string | null>(null)

  const filteredChats = selectedFolder === null
    ? chats.filter((c) => c.folderId === null)
    : chats.filter((c) => c.folderId === selectedFolder)

  const createFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { id: Date.now().toString(), name: newFolderName.trim() }])
      setNewFolderName("")
      setShowNewFolderSheet(false)
    }
  }

  const moveToFolder = (chatId: string, folderId: string | null) => {
    setChats(chats.map((c) => (c.id === chatId ? { ...c, folderId } : c)))
    setShowMoveChatSheet(false)
    setMovingChatId(null)
  }

  const openMoveSheet = (chatId: string) => {
    setMovingChatId(chatId)
    setShowMoveChatSheet(true)
  }

  const tabs: { id: ActivityTab; label: string }[] = [
    { id: "purchases", label: "Purchases" },
    { id: "bids", label: "Bids" },
    { id: "messages", label: "Messages" },
    { id: "saved", label: "Saved" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-5 pb-0">
          <h1 className="text-xl font-bold text-foreground">Activity</h1>
        </div>

        {/* Main Tabs */}
        <div className="flex overflow-x-auto no-scrollbar mt-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Secondary filter bar */}
        {activeTab === "purchases" && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
            {purchaseFilters.map((f) => (
              <button
                key={f}
                onClick={() => setPurchaseFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  purchaseFilter === f
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {activeTab === "bids" && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
            {bidFilters.map((f) => (
              <button
                key={f}
                onClick={() => setBidFilter(f)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  bidFilter === f
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                selectedFolder === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              All Chats
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors flex items-center gap-1 ${
                  selectedFolder === folder.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border"
                }`}
              >
                <Folder className="size-3" />
                {folder.name}
              </button>
            ))}
            <button
              onClick={() => setShowNewFolderSheet(true)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-dashed border-border text-muted-foreground flex items-center gap-1"
            >
              <FolderPlus className="size-3" />
              New
            </button>
          </div>
        )}
      </header>

      <main>
        {/* ── PURCHASES ── */}
        {activeTab === "purchases" && (
          <div className="divide-y divide-border">
            {mockPurchases.map((item) => (
              <Link key={item.id} href={`/order/${item.id}`} className="flex items-center gap-3 px-4 py-4 hover:bg-secondary/30 transition-colors">
                <div className="size-16 rounded-xl overflow-hidden bg-muted shrink-0">
                  <Image src={item.image} alt={item.title} width={64} height={64} className="w-full h-full object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <StatusBadge status={item.status} />
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight mt-1">{item.title}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Purchased: {item.date}</p>
                  <p className="text-xs text-muted-foreground">
                    From: <span className="text-primary">{item.seller}</span>
                  </p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* ── BIDS ── */}
        {activeTab === "bids" && (
          <div className="px-4 py-4">
            {userBids.length === 0 ? (
              <div className="relative rounded-2xl overflow-hidden bg-yellow-400 p-5 flex items-center justify-between min-h-[100px]">
                <p className="text-base font-bold text-black max-w-[55%] leading-snug">
                  You have no active bids. Browse auctions to place a bid.
                </p>
                <div className="absolute right-0 top-0 bottom-0 w-40 overflow-hidden rounded-r-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop"
                    alt="Cards"
                    fill
                    className="object-cover opacity-70"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {userBids.map((bid) => (
                  <Link key={bid.id} href={`/shop/${bid.id}`} className="block">
                    <div className="rounded-xl overflow-hidden bg-card border border-border">
                      {/* Image */}
                      <div className="relative aspect-square bg-muted">
                        <Image src={bid.image} alt={bid.title} fill className="object-cover" unoptimized />
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-1.5 py-0.5">
                          <Gavel className="size-3 text-white" />
                          <span className="text-[10px] text-white font-medium">{bid.bids}</span>
                        </div>
                        {/* Status badge */}
                        <div className="absolute bottom-2 left-2">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            bid.status === "Winning" 
                              ? "bg-green-500/90 text-white" 
                              : "bg-red-500/90 text-white"
                          }`}>
                            {bid.status}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-2">
                        {/* Seller */}
                        <div className="flex items-center gap-1 mb-1">
                          <Avatar className="size-4 shrink-0">
                            <AvatarImage src={bid.seller.avatar} />
                            <AvatarFallback className="text-[8px]">{bid.seller.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-[9px] text-muted-foreground truncate">{bid.seller.name}</span>
                          <span className="text-[9px] text-yellow-500">★{bid.seller.rating}</span>
                        </div>

                        {/* Title */}
                        <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight mb-1">{bid.title}</p>

                        {/* Bids and time */}
                        <div className="flex items-center justify-between mb-1.5 text-[9px] text-muted-foreground">
                          <span>{bid.bids} bids</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="size-2.5" />
                            {bid.timeLeft}
                          </span>
                        </div>

                        {/* Price info */}
                        <div className="space-y-0.5">
                          <div>
                            <p className="text-[9px] text-muted-foreground">Current bid</p>
                            <p className="text-sm font-bold text-foreground">${bid.currentBid}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-muted-foreground">Your bid</p>
                            <p className="text-xs font-semibold text-primary">${bid.myBid}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <div>
            {filteredChats.length === 0 ? (
              <div className="text-center py-16">
                <Folder className="size-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No chats in this folder</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredChats.map((chat) => (
                  <div key={chat.id} className="flex items-center gap-3 px-4 py-3">
                    <Link href={`/messages/chat/${chat.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="relative shrink-0">
                        <Avatar className="size-11">
                          <AvatarImage src={chat.user.avatar} />
                          <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm truncate">{chat.user.name}</span>
                            {chat.user.verified && (
                              <div className="size-3.5 bg-primary rounded-full flex items-center justify-center shrink-0">
                                <Check className="size-2 text-white" />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate pr-2">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <Badge className="size-4 p-0 flex items-center justify-center rounded-full bg-primary text-white text-[10px] border-0 shrink-0">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 shrink-0">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openMoveSheet(chat.id)}>
                          <Folder className="size-4 mr-2" />
                          Move to folder
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SAVED ── */}
        {activeTab === "saved" && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {savedItems.map((item) => (
                <Link key={item.id} href={`/shop/${item.id}`} className="block">
                  <div className="bg-card rounded-xl overflow-hidden border border-border">
                    <div className="relative aspect-square">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      <button
                        className="absolute top-2 right-2 size-7 bg-black/50 rounded-full flex items-center justify-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="size-3.5 text-white fill-white" />
                      </button>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] text-muted-foreground truncate">{item.seller}</p>
                      <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{item.title}</p>
                      <p className="text-sm font-bold text-primary mt-1">${item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* New Folder Sheet */}
      <Sheet open={showNewFolderSheet} onOpenChange={setShowNewFolderSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Create Folder</SheetTitle>
            <SheetDescription className="sr-only">Create a new folder for organizing chats</SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="h-11 rounded-xl"
            />
            <Button onClick={createFolder} disabled={!newFolderName.trim()} className="w-full h-11 rounded-xl">
              Create Folder
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Move Chat Sheet */}
      <Sheet open={showMoveChatSheet} onOpenChange={setShowMoveChatSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Move to Folder</SheetTitle>
            <SheetDescription className="sr-only">Select a folder to move this chat</SheetDescription>
          </SheetHeader>
          <div className="space-y-2">
            <button
              onClick={() => movingChatId && moveToFolder(movingChatId, null)}
              className="w-full p-3 rounded-xl text-left text-sm font-medium bg-card border border-border hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <X className="size-4" />
              Remove from folder
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => movingChatId && moveToFolder(movingChatId, folder.id)}
                className="w-full p-3 rounded-xl text-left text-sm font-medium bg-card border border-border hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Folder className="size-4" />
                {folder.name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
