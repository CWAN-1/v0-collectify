"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share2, Send, MoreHorizontal, ShoppingBag, Gavel, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const post = {
  id: "1",
  user: {
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    verified: true,
    followers: 12500
  },
  images: [
    "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&h=600&fit=crop",
  ],
  title: "Unboxing Pikachu VMAX Rainbow Rare - Best Pull Ever!",
  content: "After opening 5 booster boxes of Vivid Voltage, I finally got my dream card! Pikachu VMAX Rainbow Rare in perfect centering condition. Immediately sleeved and put in a toploader.\n\nHave you ever pulled your chase card? Share in the comments!",
  likes: 2431,
  comments: 89,
  createdAt: "2 hours ago",
  tags: ["Pokemon", "PullRates", "VividVoltage", "Pikachu"],
  linkedProducts: [
    {
      id: "p1",
      name: "Pikachu VMAX Rainbow Rare",
      image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
      price: 250,
      type: "buy_now" as const,
      condition: "PSA 10"
    },
    {
      id: "p2",
      name: "Charizard Base Set Holo",
      image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&h=200&fit=crop",
      price: 1500,
      currentBid: 1850,
      type: "auction" as const,
      condition: "BGS 9.5",
      endsIn: "2h 15m"
    }
  ]
}

const comments = [
  {
    id: "1",
    user: { name: "Sarah L", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    content: "Wow, that's amazing! Congrats!",
    likes: 45,
    createdAt: "1 hour ago"
  },
  {
    id: "2",
    user: { name: "Mike Z", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    content: "The centering is perfect, PSA 10 potential for sure",
    likes: 32,
    createdAt: "1 hour ago"
  },
  {
    id: "3",
    user: { name: "Emma W", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    content: "How many boxes did you open to get this?",
    likes: 18,
    createdAt: "45 min ago"
  },
]

export default function PostDetailPage() {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [comment, setComment] = useState("")

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold">Post</span>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4">
        {/* User Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.user.name}</span>
                {post.user.verified && (
                  <div className="size-4 bg-foreground rounded-full flex items-center justify-center">
                    <svg className="size-2.5 text-background" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{post.createdAt}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            Follow
          </Button>
        </div>

        {/* Images */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
          <Image
            src={post.images[selectedImage]}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`size-2 rounded-full transition-all ${
                    index === selectedImage ? "w-6 bg-background" : "bg-background/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2"
            >
              <Heart className={`size-6 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="font-semibold">{liked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center gap-2">
              <MessageCircle className="size-6" />
              <span className="font-semibold">{post.comments}</span>
            </button>
            <button>
              <Share2 className="size-6" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark className={`size-6 ${saved ? "fill-foreground" : ""}`} />
          </button>
        </div>

        {/* Title & Content */}
        <div className="mb-4">
          <h1 className="font-bold text-lg mb-2">{post.title}</h1>
          <p className="text-foreground whitespace-pre-line leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* Linked Products */}
        {post.linkedProducts && post.linkedProducts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Shop These Items</h3>
            <div className="space-y-2">
              {post.linkedProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={product.type === "auction" ? `/auction/${product.id}` : `/shop/${product.id}`}
                >
                  <div className="flex items-center gap-3 p-2.5 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                    <div className="relative size-14 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${
                          product.type === "auction" 
                            ? "bg-purple-500/10 text-purple-500" 
                            : "bg-blue-500/10 text-blue-500"
                        }`}>
                          {product.type === "auction" ? (
                            <>
                              <Gavel className="size-2.5" />
                              Auction
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="size-2.5" />
                              Buy Now
                            </>
                          )}
                        </div>
                        {product.condition && (
                          <span className="text-[9px] text-muted-foreground">{product.condition}</span>
                        )}
                      </div>
                      <p className="text-xs font-medium truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {product.type === "auction" ? (
                          <>
                            <span className="text-xs font-bold text-primary">${product.currentBid}</span>
                            <span className="text-[10px] text-muted-foreground">Ends in {product.endsIn}</span>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-primary">${product.price}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="border-t border-border pt-4">
          <h3 className="font-semibold mb-4">Comments ({post.comments})</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                  <button className="flex items-center gap-1 mt-1 text-muted-foreground">
                    <Heart className="size-3.5" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="flex gap-3 items-center">
          <Avatar className="size-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-12 pr-12 rounded-full bg-muted border-0"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <Send className="size-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
