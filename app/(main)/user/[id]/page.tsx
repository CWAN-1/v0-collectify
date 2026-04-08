"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, UserPlus, UserCheck, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Mock user data
const mockUsers: Record<string, {
  id: string
  name: string
  username: string
  avatar: string
  rating: number
  totalSold: number
  followers: number
  following: number
  bio: string
  isFollowing: boolean
}> = {
  "1": {
    id: "1",
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 4.9,
    totalSold: 156,
    followers: 1250,
    following: 328,
    bio: "Card collector since 2015. Pokemon & Yu-Gi-Oh enthusiast.",
    isFollowing: false,
  },
  "2": {
    id: "2",
    name: "Sarah Lee",
    username: "@sarahlee",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 4.8,
    totalSold: 89,
    followers: 856,
    following: 142,
    bio: "Sports card trader. Looking for vintage NBA cards.",
    isFollowing: true,
  },
  "3": {
    id: "3",
    name: "Mike Zhang",
    username: "@mikezhang",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 5.0,
    totalSold: 324,
    followers: 2100,
    following: 89,
    bio: "Professional grader. PSA & BGS submissions.",
    isFollowing: false,
  },
}

// Mock products
const mockProducts = [
  { id: "1", name: "Pikachu VMAX", price: 250, image: "/cards/pokemon-1.jpg" },
  { id: "2", name: "Charizard GX", price: 450, image: "/cards/pokemon-2.jpg" },
  { id: "3", name: "Blue-Eyes Dragon", price: 850, image: "/cards/yugioh-1.jpg" },
  { id: "4", name: "Luffy Gear 5", price: 180, image: "/cards/onepiece-1.jpg" },
]

// Mock auctions
const mockAuctions = [
  { id: "1", name: "PSA 10 Charizard", currentBid: 1500, endTime: "2h left", image: "/cards/pokemon-2.jpg" },
  { id: "2", name: "BGS 9.5 Pikachu", currentBid: 800, endTime: "5h left", image: "/cards/pokemon-1.jpg" },
]

// Mock posts
const mockPosts = [
  { id: "1", title: "Unboxing Pikachu VMAX", image: "/posts/post-pokemon-1.jpg", likes: 2431, comments: 89 },
  { id: "2", title: "Review: Blue-Eyes Dragon", image: "/posts/post-yugioh-1.jpg", likes: 3210, comments: 156 },
  { id: "3", title: "Luffy Gear 5 Pull!", image: "/posts/post-onepiece-1.jpg", likes: 4521, comments: 234 },
  { id: "4", title: "Pokemon Cards from Japan", image: "/posts/post-pokemon-2.jpg", likes: 1567, comments: 67 },
]

type Tab = "products" | "auctions" | "posts"

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<Tab>("products")
  const [isFollowing, setIsFollowing] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  // Resolve params
  if (!resolvedParams) {
    params.then(setResolvedParams)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const user = mockUsers[resolvedParams.id] || mockUsers["1"]

  const tabs = [
    { id: "products" as Tab, label: "Products" },
    { id: "auctions" as Tab, label: "Auctions" },
    { id: "posts" as Tab, label: "Posts" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Link href="/" className="absolute left-4">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <span className="font-semibold text-sm">Profile</span>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-4 py-4">
        <div className="flex items-start gap-4">
          <Avatar className="size-16 border-2 border-border shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-lg bg-secondary">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold truncate">{user.name}</h1>
              <div className="flex items-center gap-0.5 shrink-0">
                <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-medium">{user.rating}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{user.username}</p>
            {user.bio && (
              <p className="text-xs text-foreground mt-1 line-clamp-2">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3">
          <div className="text-center">
            <p className="text-sm font-bold">{user.totalSold}</p>
            <p className="text-[10px] text-muted-foreground">Sold</p>
          </div>
          <Link href={`/user/${user.id}/followers`} className="text-center">
            <p className="text-sm font-bold">{user.followers}</p>
            <p className="text-[10px] text-muted-foreground">Followers</p>
          </Link>
          <Link href={`/user/${user.id}/following`} className="text-center">
            <p className="text-sm font-bold">{user.following}</p>
            <p className="text-[10px] text-muted-foreground">Following</p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href={`/chat/${user.id}`} className="flex-1">
            <Button variant="outline" className="w-full h-9 rounded-xl text-xs gap-1.5">
              <MessageCircle className="size-4" />
              Chat
            </Button>
          </Link>
          <Button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "flex-1 h-9 rounded-xl text-xs gap-1.5",
              isFollowing ? "bg-secondary text-foreground hover:bg-secondary/80" : ""
            )}
            variant={isFollowing ? "secondary" : "default"}
          >
            {isFollowing ? (
              <>
                <UserCheck className="size-4" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                Follow
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-40 bg-background border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 text-xs font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">
        {activeTab === "products" && (
          <div className="grid grid-cols-2 gap-2">
            {mockProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-sm font-bold text-primary">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "auctions" && (
          <div className="space-y-2">
            {mockAuctions.map((auction) => (
              <Link key={auction.id} href={`/auctions/${auction.id}`}>
                <div className="bg-card rounded-xl border border-border p-3 flex gap-3">
                  <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={auction.image}
                      alt={auction.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{auction.name}</p>
                    <p className="text-sm font-bold text-primary">${auction.currentBid}</p>
                    <p className="text-[10px] text-muted-foreground">{auction.endTime}</p>
                  </div>
                </div>
              </Link>
            ))}
            {mockAuctions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No active auctions</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <div className="grid grid-cols-2 gap-2">
            {mockPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-[10px] font-medium text-white line-clamp-2">{post.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5 text-white/80">
                          <Heart className="size-3" />
                          <span className="text-[9px]">{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
