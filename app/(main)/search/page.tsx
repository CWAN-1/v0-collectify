"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X, ChevronRight, Heart, Play, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

// Suggested keywords
const suggestedKeywords = ["pokemon", "pikachu", "one piece"]

// Mock Shows data
const mockShows = [
  { id: "live-1", title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODD...", thumbnail: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop", user: { name: "pokepullzs", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" }, viewers: 47, isLive: true },
  { id: "live-2", title: "BIG GIVEAWAYIES WALL OF SEALED BREAK", thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=400&h=500&fit=crop", user: { name: "alexcardshop", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=80&h=80&fit=crop" }, viewers: 130, isLive: true },
  { id: "live-3", title: "Prismatic SPC Giveaways!!! $1 start sl...", thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop", user: { name: "card_lair", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop" }, viewers: 241, isLive: true },
  { id: "live-4", title: "WoTC - EX era $1 starts Giveaways", thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop", user: { name: "caascollectibles", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" }, viewers: 101, isLive: true },
]

// Mock Products data (Buy Now + Auction)
const mockProducts = [
  { id: "1", name: "Pikachu VMAX Rainbow Rare", price: 250, image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop", seller: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }, type: "buynow" },
  { id: "2", name: "Charizard GX Shiny", price: 450, image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=300&h=300&fit=crop", seller: { name: "PokeFan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, type: "auction", currentBid: 380, endTime: "2h 15m" },
  { id: "3", name: "Blue-Eyes White Dragon", price: 850, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop", seller: { name: "YugiCollector", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, type: "buynow" },
  { id: "4", name: "Luffy Gear 5 Secret Rare", price: 180, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop", seller: { name: "OnePieceID", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }, type: "auction", currentBid: 155, endTime: "45m" },
]

// Mock Posts data
const mockPosts = [
  { id: "1", title: "Unboxing Pikachu VMAX", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=400&fit=crop", user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" }, likes: 2431 },
  { id: "2", title: "NBA Rookie Cards Collection", image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=400&h=400&fit=crop", user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" }, likes: 1892 },
  { id: "3", title: "Blue-Eyes White Dragon Review", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }, likes: 3210 },
  { id: "4", title: "Rare Pokemon Cards Haul", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop", user: { name: "CardKing", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }, likes: 1560 },
]

// Mock Users data
const mockUsers = [
  { id: "1", name: "dhipokemon", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", followers: 0, itemsSold: 12 },
  { id: "2", name: "Pokemonban", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", followers: 0, itemsSold: 5 },
  { id: "3", name: "Aqshal pokemon", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", followers: 6, itemsSold: 89 },
  { id: "4", name: "NruPokemon", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", followers: 20, itemsSold: 156 },
  { id: "5", name: "JAYPOKEMON", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", followers: 0, itemsSold: 3 },
  { id: "6", name: "tcgpokemon", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", followers: 0, itemsSold: 0 },
]

// Market price history mock data with volume
const priceHistoryData = [
  { date: "1/2", price: 8.5, volume: 25 },
  { date: "1/6", price: 8.8, volume: 38 },
  { date: "1/9", price: 9.2, volume: 42 },
  { date: "1/13", price: 9.5, volume: 35 },
  { date: "1/16", price: 9.8, volume: 48 },
  { date: "1/20", price: 10.2, volume: 52 },
  { date: "1/23", price: 10.5, volume: 45 },
  { date: "1/27", price: 10.8, volume: 58 },
  { date: "1/30", price: 11.2, volume: 62 },
  { date: "2/3", price: 11.5, volume: 55 },
  { date: "2/6", price: 11.9, volume: 68 },
  { date: "2/10", price: 12.2, volume: 75 },
]

// Featured product for price history
const featuredProduct = {
  name: "Pikachu VMAX Rainbow Rare",
  subtitle: "Vivid Voltage 188/185",
  avgPrice: 11.76,
  change: 35.48,
  listings: 291,
  image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=120&h=120&fit=crop",
}

type SearchTab = "all" | "shows" | "products" | "posts" | "users"

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState<SearchTab>("all")
  const [hasSearched, setHasSearched] = useState(!!initialQuery)

  const handleCancel = () => {
    router.back()
  }

  const clearSearch = () => {
    setSearchQuery("")
    setHasSearched(false)
  }

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword)
    setHasSearched(true)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true)
    }
  }

  const tabs: { id: SearchTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "products", label: "Products" },
    { id: "shows", label: "Shows" },
    { id: "posts", label: "Posts" },
    { id: "users", label: "Users" },
  ]

  // Show Card component
  const ShowCard = ({ show }: { show: typeof mockShows[0] }) => (
    <Link href={`/live/${show.id}`} className="block shrink-0 w-[140px]">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="size-5 rounded-full overflow-hidden bg-muted shrink-0">
          <Image src={show.user.avatar} alt={show.user.name} width={20} height={20} className="w-full h-full object-cover" unoptimized />
        </div>
        <span className="text-[10px] font-medium truncate text-foreground">{show.user.name}</span>
      </div>
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
        <Image src={show.thumbnail} alt={show.title} fill className="object-cover" unoptimized />
        {show.isLive && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <span>Live</span>
            <span className="mx-0.5">-</span>
            <span>{show.viewers}</span>
          </div>
        )}
      </div>
      <p className="text-[11px] font-semibold line-clamp-2 leading-tight mt-1.5">{show.title}</p>
    </Link>
  )

  // Product Card component
  const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => (
    <Link href={`/shop/${product.id}`} className="block shrink-0 w-[140px]">
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="relative aspect-square">
          <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex items-center gap-1.5">
              <Avatar className="size-4 border border-white/30">
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback className="text-[8px]">{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[9px] text-white truncate">{product.seller.name}</span>
            </div>
          </div>
          {product.type === "auction" && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
              Auction
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight mb-1">{product.name}</h3>
          <p className="text-xs font-bold text-primary">${product.price}</p>
        </div>
      </div>
    </Link>
  )

  // Post Card component
  const PostCard = ({ post }: { post: typeof mockPosts[0] }) => (
    <div className="shrink-0 w-[140px]">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
        <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
      </div>
      <div className="mt-1.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Avatar className="size-4">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback className="text-[8px]">{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-[9px] text-muted-foreground truncate">{post.user.name}</span>
        </div>
        <h3 className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight">{post.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Heart className="size-3 text-red-500 fill-red-500" />
          <span className="text-[9px] text-muted-foreground">{post.likes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  // User Card component
  const UserCard = ({ user }: { user: typeof mockUsers[0] }) => (
    <Link href={`/user/${user.id}`} className="block shrink-0 w-[100px]">
      <div className="flex flex-col items-center">
        <Avatar className="size-16 border-2 border-border mb-2">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-[11px] font-medium text-foreground truncate w-full text-center">{user.name}</h3>
        <p className="text-[10px] text-muted-foreground">{user.followers} followers</p>
      </div>
    </Link>
  )

  // Section Header component
  const SectionHeader = ({ title, tabId }: { title: string; tabId: SearchTab }) => (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <button
        onClick={() => setActiveTab(tabId)}
        className="flex items-center gap-0.5 text-xs text-muted-foreground"
      >
        show more
        <ChevronRight className="size-3" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-background px-4 h-14 flex items-center gap-3 border-b border-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-10 h-10 rounded-full bg-secondary border-none"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-5 bg-muted-foreground/20 rounded-full flex items-center justify-center"
            >
              <X className="size-3 text-muted-foreground" />
            </button>
          )}
        </div>
        <button onClick={handleCancel} className="text-sm text-muted-foreground shrink-0">
          Cancel
        </button>
      </header>

      {/* Content */}
      {!hasSearched ? (
        /* ── SUGGEST STATE ── */
        <div className="px-4 py-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Suggest</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordClick(keyword)}
                className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground font-medium hover:bg-secondary/80 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── SEARCH RESULTS STATE ── */
        <>
          {/* Tabs */}
          <div className="flex border-b border-border bg-background overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 py-3 px-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {/* ── ALL TAB ── */}
            {activeTab === "all" && (
              <div className="py-4">
                {/* Shows Section */}
                <div className="mb-6">
                  <div className="px-4">
                    <SectionHeader title="Shows" tabId="shows" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                    {mockShows.slice(0, 4).map((show) => (
                      <ShowCard key={show.id} show={show} />
                    ))}
                  </div>
                </div>

                {/* Products Section */}
                <div className="mb-6">
                  <div className="px-4">
                    <SectionHeader title="Products" tabId="products" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                    {mockProducts.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>

                {/* Posts Section */}
                <div className="mb-6">
                  <div className="px-4">
                    <SectionHeader title="Posts" tabId="posts" />
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                    {mockPosts.slice(0, 4).map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>

                {/* Users Section */}
                <div className="mb-6">
                  <div className="px-4">
                    <SectionHeader title="Users" tabId="users" />
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
                    {mockUsers.slice(0, 6).map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SHOWS TAB ── */}
            {activeTab === "shows" && (
              <div className="flex flex-col">
                {/* Filter Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground shrink-0">
                    <SlidersHorizontal className="size-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground shrink-0">
                    <ArrowUpDown className="size-3" />
                    Sort
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                {mockShows.map((show) => (
                  <Link href={`/live/${show.id}`} key={show.id} className="block">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="size-5 rounded-full overflow-hidden bg-muted shrink-0">
                        <Image src={show.user.avatar} alt={show.user.name} width={20} height={20} className="w-full h-full object-cover" unoptimized />
                      </div>
                      <span className="text-[10px] font-medium truncate text-foreground">{show.user.name}</span>
                    </div>
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
                      <Image src={show.thumbnail} alt={show.title} fill className="object-cover" unoptimized />
                      {show.isLive && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <span>Live</span>
                          <span className="mx-0.5">-</span>
                          <span>{show.viewers}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold line-clamp-2 leading-tight mt-1.5">{show.title}</p>
                  </Link>
                ))}
                </div>
              </div>
            )}

            {/* ── PRODUCTS TAB ── */}
            {activeTab === "products" && (
              <div className="flex flex-col max-h-[calc(100vh-110px)] overflow-y-auto">
                {/* Filter Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground shrink-0">
                    <SlidersHorizontal className="size-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground shrink-0">
                    <ArrowUpDown className="size-3" />
                    Sort
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground shrink-0">
                    Buy Format
                    <ChevronDown className="size-3" />
                  </button>
                </div>

                <div className="p-4 space-y-6">
                {/* Market Price History Card */}
                <div className="bg-card rounded-2xl border border-border p-4 shrink-0">
                  {/* Product Header */}
                  <div className="flex gap-3 mb-4">
                    <div className="size-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image src={featuredProduct.image} alt={featuredProduct.name} width={64} height={64} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-tight">{featuredProduct.name}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{featuredProduct.subtitle}</p>
                      <p className="text-xs">
                        <span className="text-muted-foreground">Avg: </span>
                        <span className="font-bold text-foreground">${featuredProduct.avgPrice}</span>
                        <span className="ml-2 font-bold text-green-500">+{featuredProduct.change}%</span>
                        <span className="ml-2 text-muted-foreground">{featuredProduct.listings} listings</span>
                      </p>
                    </div>
                  </div>

                  {/* Price History Title */}
                  <h4 className="text-sm font-bold text-foreground mb-2">Market Price History</h4>

                  {/* ComposedChart */}
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={priceHistoryData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} domain={[7, 13]} width={28} ticks={[7, 9, 11, 13]} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} width={28} ticks={[0, 25, 50, 75, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "0.375rem", fontSize: 11 }}
                          formatter={(value: any, name: string) => {
                            if (name === "price") return [`$${value}`, "Price"];
                            if (name === "volume") return [value, "Listings"];
                            return [value, name];
                          }}
                        />
                        <Bar yAxisId="right" dataKey="volume" fill="#64748b" opacity={0.4} radius={[2, 2, 0, 0]} />
                        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Products Grid */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3">More Products</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockProducts.map((product) => (
                      <Link href={`/shop/${product.id}`} key={product.id} className="block">
                        <div className="bg-card rounded-xl overflow-hidden border border-border">
                          <div className="relative aspect-square">
                            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                              <div className="flex items-center gap-1.5">
                                <Avatar className="size-4 border border-white/30">
                                  <AvatarImage src={product.seller.avatar} />
                                  <AvatarFallback className="text-[8px]">{product.seller.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-[9px] text-white truncate">{product.seller.name}</span>
                              </div>
                            </div>
                            {product.type === "auction" && (
                              <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
                                Auction
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <h3 className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight mb-1">{product.name}</h3>
                            {product.type === "auction" ? (
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-primary">${product.currentBid}</p>
                                <span className="text-[9px] text-red-500">{product.endTime}</span>
                              </div>
                            ) : (
                              <p className="text-xs font-bold text-primary">${product.price}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* ── POSTS TAB ── */}
            {activeTab === "posts" && (
              <div className="grid grid-cols-2 gap-3 p-4">
                {mockPosts.map((post) => (
                  <div key={post.id} className="bg-card rounded-xl overflow-hidden border border-border">
                    <div className="relative aspect-square">
                      <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Avatar className="size-5">
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback className="text-[8px]">{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] text-muted-foreground truncate">{post.user.name}</span>
                      </div>
                      <h3 className="text-xs font-medium text-foreground line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Heart className="size-3 text-red-500 fill-red-500" />
                        <span className="text-[10px] text-muted-foreground">{post.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === "users" && (
              <div className="divide-y divide-border">
                {[...mockUsers].sort((a, b) => b.followers - a.followers).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 px-4 py-3">
                    <Link href={`/user/${user.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="size-11 border-2 border-border shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {user.followers} followers · {user.itemsSold} items sold
                        </p>
                      </div>
                    </Link>
                    <button 
                      className="shrink-0 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchPageContent />
    </Suspense>
  )
}
