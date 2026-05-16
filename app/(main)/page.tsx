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
  { id: "foryou", label: "For You", image: null, bgColor: "bg-yellow-400" },
  { id: "marvel", label: "Marvel Cards", image: "/brands/marvel.jpg" },
  { id: "entertainment", label: "Entertainment Cards", image: "/brands/entertainment.jpg" },
  { id: "pokemon", label: "Pokemon", image: "/brands/pikachu.jpg" },
  { id: "yugioh", label: "Yu-Gi-Oh!", image: "/brands/yugioh.jpg" },
  { id: "onepiece", label: "One Piece", image: "/brands/luffy.jpg" },
  { id: "sports", label: "Sports", image: "/brands/sports.jpg" },
]

// User's selected interests
const userInterests = ["foryou", "marvel", "entertainment", "pokemon", "yugioh", "onepiece"]

// Live stream data
const liveStreams = [
  {
    id: "live-1",
    user: { name: "pokepullzs", avatar: "/avatars/user1.jpg" },
    thumbnail: "/live/live-1.jpg",
    title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODD...",
    viewers: 47,
    category: "Pokemon Cards",
    tags: ["Pokemon", "Giveaway"],
    isLive: true,
  },
  {
    id: "live-2",
    user: { name: "alexcardshop", avatar: "/avatars/user2.jpg" },
    thumbnail: "/live/live-2.jpg",
    title: "BIG GIVEAWAYIES WALL OF SEALED BREAK",
    viewers: 130,
    category: "Pokemon Cards",
    tags: ["$1 Starts", "Sealed"],
    isLive: true,
  },
  {
    id: "live-3",
    user: { name: "card_lair", avatar: "/avatars/user3.jpg" },
    thumbnail: "/live/live-3.jpg",
    title: "Prismatic SPC Giveaways!!! $1 start sl...",
    viewers: 241,
    category: "Pokemon Cards",
    tags: ["Graded Cards"],
    isLive: true,
  },
  {
    id: "live-4",
    user: { name: "caascollectibles", avatar: "/avatars/user4.jpg" },
    thumbnail: "/live/live-4.jpg",
    title: "WoTC - EX era $1 starts Giveaways",
    viewers: 101,
    category: "Pokemon Cards",
    tags: ["Vintage", "Sealed"],
    isLive: true,
  },
  {
    id: "live-5",
    user: { name: "mastersetgames", avatar: "/avatars/user5.jpg" },
    thumbnail: "/live/live-5.jpg",
    title: "PSA 10 Graded Cards Showcase",
    viewers: 155,
    category: "Pokemon Cards",
    tags: ["PSA 10", "Graded"],
    isLive: true,
  },
  {
    id: "live-6",
    user: { name: "dungeonswipes", avatar: "/avatars/user6.jpg" },
    thumbnail: "/live/live-6.jpg",
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
    image: "/posts/post-pokemon-1.jpg",
    title: "Unboxing Pikachu VMAX Rainbow Rare",
    likes: 2431,
    comments: 89,
    category: "pokemon",
    isVideo: false,
  },
  {
    id: "2",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-sports-1.jpg",
    title: "NBA Rookie Cards Collection 2024",
    likes: 1892,
    comments: 45,
    category: "sports",
    isVideo: true,
  },
  {
    id: "3",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    image: "/posts/post-yugioh-1.jpg",
    title: "Review: Blue-Eyes White Dragon",
    likes: 3210,
    comments: 156,
    category: "yugioh",
    isVideo: false,
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-storage-1.jpg",
    title: "Tips for Storing Your Collection",
    likes: 987,
    comments: 34,
    category: "all",
    isVideo: true,
  },
  {
    id: "5",
    user: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    image: "/posts/post-onepiece-1.jpg",
    title: "Luffy Gear 5 Secret Rare Pull!",
    likes: 4521,
    comments: 234,
    category: "onepiece",
    isVideo: false,
  },
  {
    id: "6",
    user: { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-pokemon-2.jpg",
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
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  // Track scroll to toggle compact category view
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const displayedCategories = allCategories.filter(cat => interests.includes(cat.id))
  const availableToAdd = allCategories.filter(cat => !interests.includes(cat.id))

  const addInterest = (categoryId: string) => {
    if (!interests.includes(categoryId)) {
      setInterests([...interests, categoryId])
    }
  }

  const removeInterest = (categoryId: string) => {
    setInterests(interests.filter(id => id !== categoryId))
    if (selectedCategory === categoryId) {
      setSelectedCategory("foryou")
    }
  }

  // Get content based on selected feed tab
  const getFeedContent = () => {
    if (selectedFeedTab === "live") {
      return liveStreams
    } else if (selectedFeedTab === "post") {
      return posts
    } else {
      return followedContent
    }
  }

  const feedContent = getFeedContent()
  const leftColumn = feedContent.filter((_, i) => i % 2 === 0)
  const rightColumn = feedContent.filter((_, i) => i % 2 === 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="px-4 pt-12 pb-3">
          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            {/* Search - Left aligned, takes most space */}
            <Link href="/search" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <div className="h-10 pl-10 pr-4 rounded-full bg-muted text-sm flex items-center text-muted-foreground">
                  Search
                </div>
              </div>
            </Link>
            
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative size-10 rounded-full shrink-0">
                <ShoppingCart className="size-5" />
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">2</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Tabs - Shrinks on scroll */}
        <div className={`px-4 pb-2 transition-all duration-300 ${isScrolled ? "py-1" : ""}`}>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {displayedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 transition-all duration-300 ${
                  isScrolled
                    ? `px-3 py-1.5 rounded-full text-xs font-medium ${
                        selectedCategory === category.id
                          ? category.id === "foryou" ? "bg-yellow-400 text-black" : "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`
                    : "flex flex-col items-center gap-1"
                }`}
              >
                {!isScrolled && (
                  <div className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedCategory === category.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  }`}>
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.label}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full ${category.bgColor} flex flex-col items-center justify-center gap-1`}>
                        <div className="size-10 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="size-6 rounded-full bg-black" />
                        </div>
                      </div>
                    )}
                    {/* Label overlay for non-scrolled */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
                      <span className="text-[10px] font-medium text-white">{category.label}</span>
                    </div>
                  </div>
                )}
                {isScrolled ? category.label : (
                  <span className={`text-[10px] font-medium ${
                    selectedCategory === category.id ? "text-primary" : "text-muted-foreground"
                  }`}>{category.label}</span>
                )}
              </button>
            ))}
            {/* Add button */}
            {!isScrolled && (
              <button
                onClick={() => setShowAddInterestSheet(true)}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div className="w-20 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                  <Plus className="size-6 text-muted-foreground" />
                </div>
                <span className="text-[10px] text-muted-foreground">Add</span>
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header - adjusts based on scroll state */}
      <div className={`transition-all duration-300 ${isScrolled ? "h-32" : "h-48"}`} />

      <main className="px-4">
        {/* Feed Tab Switcher: LIVE / Post / Followed */}
        <div className="flex items-center gap-1 mb-4 border-b border-border">
          {(["live", "post", "followed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFeedTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors relative ${
                selectedFeedTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "live" ? "LIVE" : tab === "post" ? "Post" : "Followed"}
              {selectedFeedTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

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
