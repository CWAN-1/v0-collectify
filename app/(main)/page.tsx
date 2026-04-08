"use client"

import { useState } from "react"
import { Search, Heart, MessageCircle, ChevronRight, Plus, Flame, Gavel, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"

// All available categories/IPs
const allCategories = [
  { id: "pokemon", label: "Pokemon", avatar: "/brands/pikachu.jpg", bgColor: "bg-yellow-500" },
  { id: "yugioh", label: "Yu-Gi-Oh!", avatar: "/brands/yugioh.jpg", bgColor: "bg-orange-600" },
  { id: "onepiece", label: "One Piece", avatar: "/brands/luffy.jpg", bgColor: "bg-red-600" },
  { id: "mtg", label: "MTG", avatar: "/brands/mtg.jpg", bgColor: "bg-amber-700" },
  { id: "sports", label: "Sports", avatar: "/brands/sports.jpg", bgColor: "bg-green-600" },
  { id: "digimon", label: "Digimon", avatar: "/brands/digimon.jpg", bgColor: "bg-blue-600" },
  { id: "dbz", label: "Dragon Ball", avatar: "/brands/dbz.jpg", bgColor: "bg-orange-500" },
  { id: "weiss", label: "Weiss", avatar: "/brands/weiss.jpg", bgColor: "bg-pink-500" },
]

// User's selected interests (from onboarding)
const userInterests = ["pokemon", "yugioh", "onepiece"]

const featuredCards = [
  {
    id: "1",
    image: "/cards/pokemon-1.jpg",
    name: "Pikachu VMAX",
    set: "Vivid Voltage",
    price: 250,
    category: "pokemon",
  },
  {
    id: "2",
    image: "/cards/yugioh-1.jpg",
    name: "Blue-Eyes Dragon",
    set: "Legend of Blue Eyes",
    price: 850,
    category: "yugioh",
  },
  {
    id: "3",
    image: "/cards/onepiece-1.jpg",
    name: "Luffy Gear 5",
    set: "Romance Dawn",
    price: 180,
    category: "onepiece",
  },
  {
    id: "4",
    image: "/cards/pokemon-2.jpg",
    name: "Charizard GX",
    set: "Hidden Fates",
    price: 450,
    category: "pokemon",
  },
  {
    id: "5",
    image: "/cards/sports-1.jpg",
    name: "LeBron Rookie",
    set: "2003 Topps",
    price: 1500,
    category: "sports",
  },
  {
    id: "6",
    image: "/cards/mtg-1.jpg",
    name: "Black Lotus",
    set: "Alpha",
    price: 25000,
    category: "mtg",
  },
]

const posts = [
  {
    id: "1",
    user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    image: "/posts/post-pokemon-1.jpg",
    title: "Unboxing Pikachu VMAX Rainbow Rare",
    likes: 2431,
    comments: 89,
    category: "pokemon"
  },
  {
    id: "2",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-sports-1.jpg",
    title: "NBA Rookie Cards Collection 2024",
    likes: 1892,
    comments: 45,
    category: "sports"
  },
  {
    id: "3",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    image: "/posts/post-yugioh-1.jpg",
    title: "Review: Blue-Eyes White Dragon",
    likes: 3210,
    comments: 156,
    category: "yugioh"
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-storage-1.jpg",
    title: "Tips for Storing Your Collection",
    likes: 987,
    comments: 34,
    category: "all"
  },
  {
    id: "5",
    user: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    image: "/posts/post-onepiece-1.jpg",
    title: "Luffy Gear 5 Secret Rare Pull!",
    likes: 4521,
    comments: 234,
    category: "onepiece"
  },
  {
    id: "6",
    user: { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: false },
    image: "/posts/post-pokemon-2.jpg",
    title: "Pokemon Cards from Japan",
    likes: 1567,
    comments: 67,
    category: "pokemon"
  },
]

function PostCard({ post, priority = false }: { post: typeof posts[0]; priority?: boolean }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/post/${post.id}`} className="block mb-3">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        <div className="relative aspect-[4/5]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* User Avatar */}
          <div className="absolute top-3 left-3">
            <Avatar className="size-8 border-2 border-primary">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-semibold text-sm text-white line-clamp-2 mb-2">
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
                <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                <span className="text-xs">{liked ? post.likes + 1 : post.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-white/80">
                <MessageCircle className="size-4" />
                <span className="text-xs">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [interests, setInterests] = useState(userInterests)
  const [showAddInterestSheet, setShowAddInterestSheet] = useState(false)

  // Build the tabs: All + user interests
  const displayedCategories = [
    { id: "all", label: "All", avatar: null, bgColor: "bg-gradient-to-br from-primary to-accent" },
    ...allCategories.filter(cat => interests.includes(cat.id))
  ]

  const availableToAdd = allCategories.filter(cat => !interests.includes(cat.id))

  const addInterest = (categoryId: string) => {
    if (!interests.includes(categoryId)) {
      setInterests([...interests, categoryId])
    }
  }

  const removeInterest = (categoryId: string) => {
    setInterests(interests.filter(id => id !== categoryId))
    if (selectedCategory === categoryId) {
      setSelectedCategory("all")
    }
  }

  const filteredPosts = posts.filter(post => 
    selectedCategory === "all" || post.category === selectedCategory
  )

  const filteredFeatured = featuredCards.filter(card =>
    selectedCategory === "all" || card.category === selectedCategory
  )

  const leftColumn = filteredPosts.filter((_, i) => i % 2 === 0)
  const rightColumn = filteredPosts.filter((_, i) => i % 2 === 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="px-4 pt-12 pb-3">
          {/* Logo + Search + Cart */}
          <div className="flex items-center gap-3">
          {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Collectify"
                width={100}
                height={32}
                className="h-7"
                style={{ width: 'auto' }}
              />
            </Link>
            
            {/* Search - Clickable to navigate to search page */}
            <Link href="/search" className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <div className="h-9 pl-9 pr-4 rounded-xl bg-card border border-border text-sm flex items-center text-muted-foreground">
                  Search cards...
                </div>
              </div>
            </Link>
            
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative size-9 bg-card border border-border rounded-xl shrink-0">
                <ShoppingCart className="size-4" />
                <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">2</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-24" />

      <main className="px-4">
        {/* IP Category Tabs - Square Icons */}
        <div className="mb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
            {displayedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className={`size-14 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedCategory === category.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}>
                  {category.avatar ? (
                    <Image
                      src={category.avatar}
                      alt={category.label}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${category.bgColor} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">ALL</span>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${
                  selectedCategory === category.id ? "text-primary" : "text-muted-foreground"
                }`}>{category.label}</span>
              </button>
            ))}
            {/* Add Interest Button */}
            <button
              onClick={() => setShowAddInterestSheet(true)}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div className="size-14 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center">
                <Plus className="size-5 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground">Add</span>
            </button>
          </div>
        </div>

        {/* Hot & Auction Banners */}
        <div className="flex gap-2 mb-4">
          <Link href={`/hot${selectedCategory !== "all" ? `?category=${selectedCategory}` : ""}`} className="flex-1">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                <Flame className="size-3 text-white" />
              </div>
              <span className="text-white font-semibold text-xs">Hot</span>
              <ChevronRight className="size-3.5 text-white/70 ml-auto" />
            </div>
          </Link>
          <Link href={`/auctions${selectedCategory !== "all" ? `?category=${selectedCategory}` : ""}`} className="flex-1">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                <Gavel className="size-3 text-white" />
              </div>
              <span className="text-white font-semibold text-xs">Auction</span>
              <ChevronRight className="size-3.5 text-white/70 ml-auto" />
            </div>
          </Link>
        </div>

        {/* Community Feed */}
        <div className="mb-6">
          <div className="flex gap-3 w-full">
            <div className="flex-1 min-w-0">
              {leftColumn.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index === 0} />
              ))}
            </div>
            <div className="flex-1 min-w-0">
              {rightColumn.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index === 0} />
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
                  {interests.map(id => {
                    const cat = allCategories.find(c => c.id === id)
                    if (!cat) return null
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-full bg-primary/10 border border-primary/30"
                      >
                        <div className="size-6 rounded-full overflow-hidden">
                          <Image src={cat.avatar} alt={cat.label} width={24} height={24} className="w-full h-full object-cover" />
                        </div>
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
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Available</h4>
              <div className="grid grid-cols-4 gap-2">
                {availableToAdd.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => addInterest(cat.id)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="size-14 rounded-xl overflow-hidden">
                      <Image src={cat.avatar} alt={cat.label} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-medium text-center">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
