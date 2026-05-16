"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Heart, MessageCircle, X, ShoppingCart, Plus, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

// All available categories/IPs
const allCategories = [
  { id: "foryou", label: "For You", image: null, bgColor: "bg-blue-500" },
  { id: "pokemon", label: "Pokemon", image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=240&fit=crop" },
  { id: "onepiece", label: "One Piece", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=240&fit=crop" },
  { id: "popmart", label: "Popmart", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=240&fit=crop" },
  { id: "yugioh", label: "Yu-Gi-Oh!", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=240&fit=crop" },
  { id: "sports", label: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=240&fit=crop" },
]

// User's selected interests
const userInterests = ["foryou", "pokemon", "onepiece", "popmart", "yugioh"]

// Live stream data
const liveStreams = [
  {
    id: "live-1",
    user: { name: "pokepullzs", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop",
    title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODD...",
    viewers: 47,
    category: "Pokemon Cards",
    tags: ["Pokemon", "Giveaway"],
    isLive: true,
  },
  {
    id: "live-2",
    user: { name: "alexcardshop", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1627856013091-fed6dc16c00b?w=400&h=500&fit=crop",
    title: "BIG GIVEAWAYIES WALL OF SEALED BREAK",
    viewers: 130,
    category: "Pokemon Cards",
    tags: ["$1 Starts", "Sealed"],
    isLive: true,
  },
  {
    id: "live-3",
    user: { name: "card_lair", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop",
    title: "Prismatic SPC Giveaways!!! $1 start sl...",
    viewers: 241,
    category: "Pokemon Cards",
    tags: ["Graded Cards"],
    isLive: true,
  },
  {
    id: "live-4",
    user: { name: "caascollectibles", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop",
    title: "WoTC - EX era $1 starts Giveaways",
    viewers: 101,
    category: "Pokemon Cards",
    tags: ["Vintage", "Sealed"],
    isLive: true,
  },
  {
    id: "live-5",
    user: { name: "mastersetgames", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop",
    title: "PSA 10 Graded Cards Showcase",
    viewers: 155,
    category: "Pokemon Cards",
    tags: ["PSA 10", "Graded"],
    isLive: true,
  },
  {
    id: "live-6",
    user: { name: "dungeonswipes", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
    thumbnail: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=400&h=500&fit=crop",
    title: "$1 STARTS! DEALS DROPS STEALS",
    viewers: 118,
    category: "Pokemon Cards",
    tags: ["$1 Starts", "Limited"],
    isLive: true,
  },
]

// Post data
const posts = [
  {
    id: "1",
    user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop",
    title: "Unboxing Pikachu VMAX Rainbow Rare",
    likes: 2431,
    comments: 89,
    category: "pokemon",
    isVideo: false,
  },
  {
    id: "2",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=500&fit=crop",
    title: "NBA Rookie Cards Collection 2024",
    likes: 1892,
    comments: 45,
    category: "sports",
    isVideo: true,
  },
  {
    id: "3",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop",
    title: "Review: Blue-Eyes White Dragon",
    likes: 3210,
    comments: 156,
    category: "yugioh",
    isVideo: false,
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop",
    title: "Tips for Storing Your Collection",
    likes: 987,
    comments: 34,
    category: "all",
    isVideo: true,
  },
  {
    id: "5",
    user: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=500&fit=crop",
    title: "Luffy Gear 5 Secret Rare Pull!",
    likes: 4521,
    comments: 234,
    category: "onepiece",
    isVideo: false,
  },
  {
    id: "6",
    user: { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1642056446467-83ae30b63e37?w=400&h=500&fit=crop",
    title: "Pokemon Cards from Japan",
    likes: 1567,
    comments: 67,
    category: "pokemon",
    isVideo: false,
  },
]

// Followed users' content
const followedContent = [
  ...liveStreams.slice(0, 2),
  ...posts.slice(0, 4),
]

// Live stream card component
function LiveCard({ stream }: { stream: typeof liveStreams[0] }) {
  return (
    <Link href={`/live/${stream.id}`} className="block">
      <div className="mb-3">
        {/* User info above card */}
        <div className="flex items-center gap-2 mb-1.5">
          <Avatar className="size-6 border border-border">
            <AvatarImage src={stream.user.avatar} />
            <AvatarFallback>{stream.user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium truncate">{stream.user.name}</span>
        </div>
        
        {/* Thumbnail */}
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
          <Image
            src={stream.thumbnail}
            alt={stream.title}
            fill
            className="object-cover"
            unoptimized
          />
          
          {/* Live badge */}
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span>Live</span>
            <span>•</span>
            <span>{stream.viewers}</span>
          </div>
        </div>
        
        {/* Info */}
        <div className="mt-2">
          <h3 className="text-xs font-semibold line-clamp-2 leading-tight">{stream.title}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
            {stream.category} • {stream.tags.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  )
}

// Post card component
function PostCard({ post, priority = false }: { post: typeof posts[0]; priority?: boolean }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/post/${post.id}`} className="block mb-3">
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="relative aspect-[4/5]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority={priority}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Video indicator */}
          {post.isVideo && (
            <div className="absolute top-2 right-2 size-7 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="size-3.5 text-white fill-white" />
            </div>
          )}
          
          {/* User Avatar */}
          <div className="absolute top-2 left-2">
            <Avatar className="size-7 border-2 border-white">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <h3 className="font-semibold text-xs text-white line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setLiked(!liked)
                }}
                className="flex items-center gap-1 text-white/80"
              >
                <Heart className={`size-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                <span className="text-[10px]">{liked ? post.likes + 1 : post.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-white/80">
                <MessageCircle className="size-3.5" />
                <span className="text-[10px]">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("foryou")
  const [selectedFeedTab, setSelectedFeedTab] = useState<"live" | "post" | "followed">("live")
  const [interests, setInterests] = useState(userInterests)
  const [showAddInterestSheet, setShowAddInterestSheet] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(220)
  const headerRef = useRef<HTMLDivElement>(null)

  // SCROLL_MAX: number of px scrolled until tabs are fully collapsed to text-only
  const SCROLL_MAX = 100
  // progress: 0 = full card view, 1 = text-only pill view
  const progress = Math.min(scrollY / SCROLL_MAX, 1)

  // Derived values for smooth intermediate transition
  const cardHeight = Math.round(110 - progress * (110 - 32))
  const cardBorderRadius = Math.round(12 - progress * (12 - 999)) // 999 = full pill
  const imageOpacity = 1 - progress
  const isCompact = progress >= 1

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    }
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const displayedCategories = allCategories.filter(cat => interests.includes(cat.id))
  const availableToAdd = allCategories.filter(cat => !interests.includes(cat.id))

  const addInterest = (categoryId: string) => {
    if (!interests.includes(categoryId)) setInterests([...interests, categoryId])
  }

  const removeInterest = (categoryId: string) => {
    setInterests(interests.filter(id => id !== categoryId))
    if (selectedCategory === categoryId) setSelectedCategory("foryou")
  }

  const getFeedContent = () => {
    if (selectedFeedTab === "live") return liveStreams
    if (selectedFeedTab === "post") return posts
    return followedContent
  }

  const feedContent = getFeedContent()
  const leftColumn = feedContent.filter((_, i) => i % 2 === 0)
  const rightColumn = feedContent.filter((_, i) => i % 2 === 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="px-4 pt-12 pb-2">
          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <Link href="/search" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <div className="h-10 pl-10 pr-4 rounded-full bg-muted text-sm flex items-center text-muted-foreground">
                  Search
                </div>
              </div>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative size-10 rounded-full shrink-0">
                <ShoppingCart className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">2</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Tabs — smooth height transition on scroll */}
        <div className="px-4 pb-1.5 overflow-hidden">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide" style={{ paddingRight: "24%" }}>
            {displayedCategories.map((category) => {
              const isSelected = selectedCategory === category.id
              const isForyou = category.id === "foryou"
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="shrink-0"
                  style={{ height: `${cardHeight}px`, width: "88px" }}
                >
                  {/* Morphing card: full image → pill */}
                  <div
                    className="relative w-full h-full overflow-hidden border-2 transition-colors duration-200"
                    style={{
                      borderRadius: `${Math.min(cardBorderRadius, 20)}px`,
                      borderColor: isSelected
                        ? (isForyou ? "#3b82f6" : "hsl(var(--primary))")
                        : "transparent",
                      backgroundColor: isCompact
                        ? isSelected
                          ? isForyou ? "#3b82f6" : "hsl(var(--primary))"
                          : "hsl(var(--muted))"
                        : "transparent",
                    }}
                  >
                    {/* Background image / color - fades out as we scroll */}
                    {!isCompact && (
                      <div
                        className="absolute inset-0"
                        style={{ opacity: imageOpacity }}
                      >
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.label}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className={`w-full h-full ${category.bgColor} flex items-center justify-center`}>
                            <div className="size-10 rounded-full bg-white/90 flex items-center justify-center">
                              <div className="size-6 rounded-full bg-black" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Label */}
                    <div
                      className="absolute inset-0 flex items-start justify-start px-2"
                      style={{
                        alignItems: isCompact ? "center" : "flex-start",
                        justifyContent: isCompact ? "center" : "flex-start",
                        paddingTop: isCompact ? 0 : "6px",
                      }}
                    >
                      <span
                        className="font-semibold leading-tight"
                        style={{
                          fontSize: "11px",
                          color: isCompact
                            ? isSelected ? "white" : "hsl(var(--foreground))"
                            : "white",
                          textShadow: isCompact ? "none" : "0 1px 3px rgba(0,0,0,0.6)",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          textAlign: isCompact ? "center" : "left",
                        }}
                      >
                        {category.label}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
            {/* Add button — same fixed width, only shown when not fully compact */}
            {!isCompact && (
              <button onClick={() => setShowAddInterestSheet(true)} className="shrink-0" style={{ height: `${cardHeight}px`, width: "88px" }}>
                <div className="w-full h-full rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/30">
                  <Plus className="size-5 text-muted-foreground" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Feed Tab Switcher — always visible in header */}
        <div className="flex items-center border-b border-border px-4">
          {(["live", "post", "followed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFeedTab(tab)}
              className={`flex-1 py-2 text-xs font-medium transition-colors relative ${
                selectedFeedTab === tab ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {tab === "live" ? "LIVE" : tab === "post" ? "Post" : "Followed"}
              {selectedFeedTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Spacer: exact header height tracked via ref */}
      <div style={{ height: `${headerHeight}px` }} />

      <main className="px-4">
        {/* Feed Content */}
        <div className="mb-6">
          <div className="flex gap-3 w-full">
            <div className="flex-1 min-w-0">
              {leftColumn.map((item, index) => (
                "viewers" in item ? (
                  <LiveCard key={item.id} stream={item as typeof liveStreams[0]} />
                ) : (
                  <PostCard key={item.id} post={item as typeof posts[0]} priority={index === 0} />
                )
              ))}
            </div>
            <div className="flex-1 min-w-0">
              {rightColumn.map((item, index) => (
                "viewers" in item ? (
                  <LiveCard key={item.id} stream={item as typeof liveStreams[0]} />
                ) : (
                  <PostCard key={item.id} post={item as typeof posts[0]} priority={index === 0} />
                )
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Interest Sheet */}
      <Sheet open={showAddInterestSheet} onOpenChange={setShowAddInterestSheet}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl px-4 pb-8">
          <SheetHeader className="mb-3">
            <SheetTitle className="text-base">Add Interests</SheetTitle>
            <SheetDescription className="sr-only">Select categories you are interested in</SheetDescription>
          </SheetHeader>
          
          <div className="overflow-y-auto" style={{ height: "calc(60vh - 80px)" }}>
            {/* Current Interests */}
            {interests.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Your Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.filter(id => id !== "foryou").map(id => {
                    const cat = allCategories.find(c => c.id === id)
                    if (!cat) return null
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-full bg-primary/10 border border-primary/30"
                      >
                        {cat.image && (
                          <div className="size-6 rounded-full overflow-hidden">
                            <Image src={cat.image} alt={cat.label} width={24} height={24} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="text-xs font-medium text-primary">{cat.label}</span>
                        <button
                          onClick={() => removeInterest(id)}
                          className="size-5 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
                        >
                          <X className="size-3 text-primary" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Available to Add */}
            {availableToAdd.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Available</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableToAdd.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => addInterest(cat.id)}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="size-12 rounded-xl overflow-hidden bg-muted">
                        {cat.image ? (
                          <Image src={cat.image} alt={cat.label} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${cat.bgColor}`} />
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
