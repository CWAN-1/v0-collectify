"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share2, Send, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const post = {
  id: "1",
  user: {
    name: "Budi Santoso",
    username: "@budisantoso",
    avatar: "/avatars/user-1.jpg",
    verified: true,
    followers: 12500
  },
  images: [
    "/posts/post-1.jpg",
    "/posts/post-1-2.jpg",
  ],
  title: "Unboxing Pikachu VMAX Rainbow Rare - Hasil Pull Terbaik!",
  content: "Setelah buka 5 booster box Vivid Voltage, akhirnya dapet juga kartu impian! Pikachu VMAX Rainbow Rare dalam kondisi perfect centering. Langsung masuk ke sleeve dan toploader.\n\nKalian pernah pull kartu chase kalian belum? Share di komen ya!",
  likes: 2431,
  comments: 89,
  createdAt: "2 jam lalu",
  tags: ["Pokemon", "PullRates", "VividVoltage", "Pikachu"]
}

const comments = [
  {
    id: "1",
    user: { name: "Dewi K", avatar: "/avatars/user-2.jpg" },
    content: "Gila keren banget! Selamat ya bro!",
    likes: 45,
    createdAt: "1 jam lalu"
  },
  {
    id: "2",
    user: { name: "Ahmad R", avatar: "/avatars/user-3.jpg" },
    content: "Centeringnya perfect banget, PSA 10 potential nih",
    likes: 32,
    createdAt: "1 jam lalu"
  },
  {
    id: "3",
    user: { name: "Maya P", avatar: "/avatars/user-6.jpg" },
    content: "Berapa box buka total sampe dapet ini?",
    likes: 18,
    createdAt: "45 menit lalu"
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
            Ikuti
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
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* Comments */}
        <div className="border-t border-border pt-4">
          <h3 className="font-semibold mb-4">Komentar ({post.comments})</h3>
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
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <div className="flex gap-3 items-center">
          <Avatar className="size-10">
            <AvatarImage src="/avatars/user-1.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input
              placeholder="Tulis komentar..."
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
