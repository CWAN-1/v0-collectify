"use client"

import { useState } from "react"
import { Search, Bell, Heart, MessageCircle, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All", avatar: null, bgColor: "bg-gradient-to-br from-primary to-accent" },
  { id: "pokemon", label: "Pokemon", avatar: "/brands/pikachu.jpg", bgColor: "bg-yellow-500" },
  { id: "yugioh", label: "Yu-Gi-Oh!", avatar: "/brands/yugioh.jpg", bgColor: "bg-orange-600" },
  { id: "onepiece", label: "One Piece", avatar: "/brands/luffy.jpg", bgColor: "bg-red-600" },
  { id: "mtg", label: "MTG", avatar: "/brands/mtg.jpg", bgColor: "bg-amber-700" },
  { id: "sports", label: "Sports", avatar: "/brands/sports.jpg", bgColor: "bg-green-600" },
]

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
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(post => 
    selectedCategory === "all" || post.category === selectedCategory
  )

  const leftColumn = filteredPosts.filter((_, i) => i % 2 === 0)
  const rightColumn = filteredPosts.filter((_, i) => i % 2 === 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-3">
          {/* Logo + Search + Messages */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-4 rounded-xl bg-card border-border text-sm"
              />
            </div>
            
            {/* Messages */}
            <Link href="/messages">
              <Button variant="ghost" size="icon" className="relative size-10 bg-card border border-border rounded-xl shrink-0">
                <Bell className="size-5" />
                <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">3</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* Brand Categories */}
        <div className="mb-5">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 shrink-0 transition-transform ${
                  selectedCategory === category.id ? "scale-110" : ""
                }`}
              >
                <div className={`size-14 rounded-2xl overflow-hidden border-2 ${
                  selectedCategory === category.id
                    ? "border-white shadow-lg shadow-primary/40"
                    : "border-transparent"
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
                      <span className="text-lg font-bold text-white">All</span>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${
                  selectedCategory === category.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Collection */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Featured Collection</h2>
            <Link href="/shop" className="flex items-center gap-1 text-sm text-primary">
              See All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {featuredCards.filter(card => 
              selectedCategory === "all" || card.category === selectedCategory
            ).map((card) => (
              <Link key={card.id} href={`/shop/${card.id}`} className="shrink-0">
                <div className="w-28 bg-card rounded-xl overflow-hidden border border-border">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-semibold text-foreground truncate">{card.name}</p>
                    <p className="text-[10px] text-muted-foreground">{card.set}</p>
                    <p className="text-xs font-bold text-primary mt-1">${card.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Community</h2>
            <span className="text-xs text-muted-foreground">
              {selectedCategory === "all" ? "All Categories" : categories.find(c => c.id === selectedCategory)?.label}
            </span>
          </div>
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
    </div>
  )
}
