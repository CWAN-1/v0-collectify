"use client"

import { useState } from "react"
import { Search, Bell, Heart, MessageCircle, Sparkles, Flame, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All", icon: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=60&h=60&fit=crop", count: 1234 },
  { id: "pokemon", label: "Pokemon", icon: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=60&h=60&fit=crop", count: 456 },
  { id: "sports", label: "Sports", icon: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=60&h=60&fit=crop", count: 321 },
  { id: "yugioh", label: "Yu-Gi-Oh", icon: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=60&h=60&fit=crop", count: 234 },
  { id: "onepiece", label: "One Piece", icon: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=60&h=60&fit=crop", count: 189 },
  { id: "mtg", label: "MTG", icon: "https://images.unsplash.com/photo-1642056446815-3b9b6e1e3d5e?w=60&h=60&fit=crop", count: 145 },
]

const featuredCards = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=420&fit=crop",
    name: "Pikachu VMAX",
    set: "Vivid Voltage",
    price: 250,
  },
  {
    id: "2", 
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=300&h=420&fit=crop",
    name: "Charizard GX",
    set: "Hidden Fates",
    price: 450,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=300&h=420&fit=crop",
    name: "Luffy Gear 5",
    set: "Romance Dawn",
    price: 180,
  },
]

const posts = [
  {
    id: "1",
    user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop",
    title: "Unboxing Pikachu VMAX Rainbow Rare",
    likes: 2431,
    comments: 89,
    category: "pokemon"
  },
  {
    id: "2",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
    title: "NBA Rookie Cards Collection 2024",
    likes: 1892,
    comments: 45,
    category: "sports"
  },
  {
    id: "3",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400&h=400&fit=crop",
    title: "Review: Blue-Eyes White Dragon",
    likes: 3210,
    comments: 156,
    category: "yugioh"
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    title: "Tips for Storing Your Collection",
    likes: 987,
    comments: 34,
    category: "all"
  },
  {
    id: "5",
    user: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&h=400&fit=crop",
    title: "Luffy Gear 5 Secret Rare Pull!",
    likes: 4521,
    comments: 234,
    category: "onepiece"
  },
  {
    id: "6",
    user: { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: false },
    image: "https://images.unsplash.com/photo-1642056446815-3b9b6e1e3d5e?w=400&h=500&fit=crop",
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
        <div className="px-4 pt-12 pb-4">
          {/* Logo & Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">CardHub</span>
            </div>
            <Button variant="ghost" size="icon" className="relative bg-card border border-border rounded-xl">
              <Bell className="size-5" />
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">3</span>
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cards, users, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 rounded-xl bg-card border-border text-base"
            />
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* Featured Banner */}
        <div className="mb-6">
          <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/80 to-accent/80 border border-border">
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-500 rounded-full w-fit">
                <Flame className="size-3 text-white" />
                <span className="text-xs font-semibold text-white">Latest News!</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Battle Alongside your Clan</h2>
                <p className="text-sm text-white/80 mb-2">Secret Lair is here to celebrate everything we love</p>
                <Button size="sm" className="h-8 rounded-full bg-white text-primary hover:bg-white/90">
                  PREORDER NOW
                </Button>
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400&h=200&fit=crop"
              alt="Featured"
              fill
              className="object-cover opacity-30"
            />
          </div>
        </div>

        {/* Featured Collection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Featured Collection</h2>
            <Link href="/shop" className="flex items-center gap-1 text-sm text-primary">
              See All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {featuredCards.map((card) => (
              <Link key={card.id} href={`/shop/${card.id}`} className="shrink-0">
                <div className="w-32 bg-card rounded-xl overflow-hidden border border-border">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-foreground truncate">{card.name}</p>
                    <p className="text-xs text-muted-foreground">{card.set}</p>
                    <p className="text-sm font-bold text-primary mt-1">${card.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Categories</h2>
            <Link href="/shop" className="flex items-center gap-1 text-sm text-primary">
              See All <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <div className="mb-6">
          <h2 className="font-bold text-foreground mb-3">Community</h2>
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
