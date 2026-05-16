"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, ShoppingCart, Send, Gift, MoreHorizontal, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock live stream data
const liveStreamData = {
  id: "live-1",
  user: {
    name: "pokepullzs",
    avatar: "/avatars/user1.jpg",
    followers: 15200,
    isFollowing: false,
  },
  title: "PRISMATIC/ASCENDED WALL INSANE 1/5 ODDS! GIVEAWAYS EVERY 5 MIN!",
  viewers: 247,
  likes: 1892,
  category: "Pokemon Cards",
  tags: ["Pokemon", "Giveaway", "Prismatic"],
  thumbnail: "/live/live-1.jpg",
}

const chatMessages = [
  { id: "1", user: "CardMaster99", message: "Wow that pull!", avatar: "/avatars/chat1.jpg" },
  { id: "2", user: "PikachuFan", message: "LETS GOOO", avatar: "/avatars/chat2.jpg" },
  { id: "3", user: "CollectorJoe", message: "How much for the Charizard?", avatar: "/avatars/chat3.jpg" },
  { id: "4", user: "NewUser123", message: "First time here, great stream!", avatar: "/avatars/chat4.jpg" },
  { id: "5", user: "TCGLover", message: "That wall is insane", avatar: "/avatars/chat5.jpg" },
]

const featuredProducts = [
  { id: "1", name: "Pikachu VMAX", price: 45, image: "/cards/pokemon-1.jpg" },
  { id: "2", name: "Charizard GX", price: 120, image: "/cards/pokemon-2.jpg" },
  { id: "3", name: "Umbreon Alt Art", price: 280, image: "/cards/pokemon-3.jpg" },
]

export default function LiveStreamPage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [showProducts, setShowProducts] = useState(false)

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Video Area */}
      <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
        <Image
          src={liveStreamData.thumbnail}
          alt={liveStreamData.title}
          fill
          className="object-cover"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-black/30 text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {/* Live badge */}
            <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              <span>LIVE</span>
            </div>
            
            {/* Viewer count */}
            <div className="bg-black/30 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <Users className="size-3" />
              <span>{liveStreamData.viewers}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-black/30 text-white"
          >
            <MoreHorizontal className="size-5" />
          </Button>
        </div>
        
        {/* Right side actions */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1"
          >
            <div className="size-10 rounded-full bg-black/30 flex items-center justify-center">
              <Heart className={`size-5 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
            </div>
            <span className="text-[10px] text-white">{isLiked ? liveStreamData.likes + 1 : liveStreamData.likes}</span>
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="size-10 rounded-full bg-black/30 flex items-center justify-center">
              <MessageCircle className="size-5 text-white" />
            </div>
            <span className="text-[10px] text-white">Chat</span>
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="size-10 rounded-full bg-black/30 flex items-center justify-center">
              <Gift className="size-5 text-white" />
            </div>
            <span className="text-[10px] text-white">Gift</span>
          </button>
          
          <button className="flex flex-col items-center gap-1">
            <div className="size-10 rounded-full bg-black/30 flex items-center justify-center">
              <Share2 className="size-5 text-white" />
            </div>
            <span className="text-[10px] text-white">Share</span>
          </button>
        </div>
        
        {/* Streamer info */}
        <div className="absolute bottom-3 left-3 right-16">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="size-10 border-2 border-white">
              <AvatarImage src={liveStreamData.user.avatar} />
              <AvatarFallback>{liveStreamData.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{liveStreamData.user.name}</p>
              <p className="text-white/70 text-[10px]">{(liveStreamData.user.followers / 1000).toFixed(1)}K followers</p>
            </div>
            <Button
              size="sm"
              className={`h-7 px-3 text-xs rounded-full ${
                isFollowing ? "bg-white/20 text-white" : "bg-red-500 text-white"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
          
          <p className="text-white text-xs line-clamp-2">{liveStreamData.title}</p>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="flex-1 bg-background flex flex-col">
        {/* Featured products bar */}
        <button
          onClick={() => setShowProducts(!showProducts)}
          className="flex items-center gap-2 px-4 py-2.5 border-b border-border"
        >
          <ShoppingCart className="size-4 text-primary" />
          <span className="text-xs font-medium">Shop Products ({featuredProducts.length})</span>
        </button>
        
        {showProducts && (
          <div className="px-4 py-3 border-b border-border">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="shrink-0 w-20"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] font-medium truncate">{product.name}</p>
                  <p className="text-[10px] text-primary font-semibold">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2 mb-2">
              <Avatar className="size-6">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-[10px] text-muted-foreground">{msg.user}</span>
                <p className="text-xs">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat input */}
        <div className="p-3 border-t border-border flex items-center gap-2 pb-8">
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Say something..."
            className="flex-1 h-9 rounded-full text-sm"
          />
          <Button size="icon" className="size-9 rounded-full shrink-0">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
