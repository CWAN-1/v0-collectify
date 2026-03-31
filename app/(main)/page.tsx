"use client"

import { useState } from "react"
import { Search, Bell, Bookmark, Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All" },
  { id: "pokemon", label: "Pokemon" },
  { id: "sports", label: "Sports" },
  { id: "yugioh", label: "Yu-Gi-Oh" },
  { id: "onepiece", label: "One Piece" },
  { id: "mtg", label: "MTG" },
]

const posts = [
  {
    id: "1",
    user: { name: "Alex Chen", avatar: "/avatars/user-1.jpg", verified: true },
    image: "/posts/post-1.jpg",
    title: "Unboxing Pikachu VMAX Rainbow Rare",
    likes: 2431,
    comments: 89,
    aspectRatio: "tall",
    category: "pokemon"
  },
  {
    id: "2",
    user: { name: "Sarah Lee", avatar: "/avatars/user-2.jpg", verified: false },
    image: "/posts/post-2.jpg",
    title: "NBA Rookie Cards Collection 2024",
    likes: 1892,
    comments: 45,
    aspectRatio: "square",
    category: "sports"
  },
  {
    id: "3",
    user: { name: "Mike Zhang", avatar: "/avatars/user-3.jpg", verified: true },
    image: "/posts/post-3.jpg",
    title: "Review: Blue-Eyes White Dragon 1st Edition",
    likes: 3210,
    comments: 156,
    aspectRatio: "square",
    category: "yugioh"
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "/avatars/user-4.jpg", verified: false },
    image: "/posts/post-4.jpg",
    title: "Tips for Storing Your Card Collection",
    likes: 987,
    comments: 34,
    aspectRatio: "tall",
    category: "all"
  },
  {
    id: "5",
    user: { name: "James Park", avatar: "/avatars/user-5.jpg", verified: true },
    image: "/posts/post-5.jpg",
    title: "Luffy Gear 5 Secret Rare Pull!",
    likes: 4521,
    comments: 234,
    aspectRatio: "square",
    category: "onepiece"
  },
  {
    id: "6",
    user: { name: "Lisa Wang", avatar: "/avatars/user-6.jpg", verified: false },
    image: "/posts/post-6.jpg",
    title: "Pokemon Cards Haul from Japan",
    likes: 1567,
    comments: 67,
    aspectRatio: "tall",
    category: "pokemon"
  },
]

function PostCard({ post, priority = false }: { post: typeof posts[0]; priority?: boolean }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <Link href={`/post/${post.id}`} className="block mb-4 break-inside-avoid">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className={`relative w-full ${post.aspectRatio === "tall" ? "aspect-[3/4]" : "aspect-square"}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority={priority}
          />
          {/* Save Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setSaved(!saved)
            }}
            className="absolute top-3 right-3 size-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Bookmark className={`size-4 ${saved ? "fill-foreground" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-3">
            {post.title}
          </h3>

          {/* User & Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{post.user.name.split(" ")[0]}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setLiked(!liked)
                }}
                className="flex items-center gap-1 text-muted-foreground"
              >
                <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                <span className="text-xs">{liked ? post.likes + 1 : post.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-muted-foreground">
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

  // Split posts into two columns for masonry effect
  const leftColumn = filteredPosts.filter((_, i) => i % 2 === 0)
  const rightColumn = filteredPosts.filter((_, i) => i % 2 === 1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-4 pt-12 pb-4">
          {/* Logo & Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="size-10 bg-foreground rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold text-foreground">CardHub</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cards, users, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 rounded-full bg-muted border-0 text-base"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Masonry Feed */}
      <main className="px-4 pt-4">
        <div className="flex gap-4">
          <div className="flex-1">
            {leftColumn.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index === 0} />
            ))}
          </div>
          <div className="flex-1">
            {rightColumn.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
