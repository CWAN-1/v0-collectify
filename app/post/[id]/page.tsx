"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Send,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const mockPost = {
  id: "1",
  title: "开箱！终于抽到闪卡皮卡丘，太激动了！",
  content: `今天运气太好了！在本地卡店开了5包25周年纪念包，没想到最后一包居然出了皮卡丘VMAX闪卡！

这张卡是整个系列最稀有的卡之一，估计中奖率只有1/200左右。卡面的闪光效果超级漂亮，皮卡丘的表情也很生动。

分享一下开箱的心得：
1. 选择信誉好的卡店
2. 一次性多开几包提高概率
3. 保持平常心，享受开箱过程

各位有什么开箱技巧吗？欢迎在评论区分享！`,
  images: [
    "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&h=800&fit=crop",
  ],
  author: {
    id: "u1",
    name: "卡牌收藏家",
    avatar: "https://i.pravatar.cc/150?img=1",
    verified: true,
  },
  tags: ["宝可梦", "闪卡", "开箱"],
  likes: 328,
  comments: 45,
  createdAt: "2小时前",
}

const mockComments = [
  {
    id: "c1",
    user: {
      name: "足球卡迷",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    content: "太羡慕了！我开了10包都没出闪卡...",
    likes: 23,
    time: "1小时前",
  },
  {
    id: "c2",
    user: {
      name: "游戏王老玩家",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content: "恭喜恭喜！这张卡现在市价多少？",
    likes: 15,
    time: "45分钟前",
  },
  {
    id: "c3",
    user: {
      name: "新手小白",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    content: "请问哪里可以买到正版的25周年包？",
    likes: 8,
    time: "30分钟前",
  },
]

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(mockPost.likes)
  const [saved, setSaved] = useState(false)
  const [comment, setComment] = useState("")

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-4 py-3 backdrop-blur-lg">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <MoreVertical className="h-5 w-5" />
        </button>
      </header>

      {/* Image Gallery */}
      <div className="relative aspect-square bg-secondary/50">
        <Image
          src={mockPost.images[currentImage]}
          alt={mockPost.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {mockPost.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentImage === index ? "w-6 bg-primary" : "bg-card/80"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockPost.author.avatar} />
              <AvatarFallback>
                {mockPost.author.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{mockPost.author.name}</span>
                {mockPost.author.verified && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                    <svg
                      className="h-2.5 w-2.5 text-success-foreground"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {mockPost.createdAt}
              </span>
            </div>
          </div>
          <Button size="sm">关注</Button>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {mockPost.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Title & Content */}
        <h1 className="mt-4 text-xl font-bold">{mockPost.title}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {mockPost.content}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-around border-y border-border py-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
          >
            <Heart
              className={cn(
                "h-6 w-6",
                liked && "fill-accent text-accent"
              )}
            />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <MessageCircle className="h-6 w-6" />
            <span>{mockPost.comments}</span>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Bookmark
              className={cn(
                "h-6 w-6",
                saved && "fill-primary text-primary"
              )}
            />
          </button>
          <button className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {/* Comments */}
        <div className="mt-4">
          <h3 className="mb-4 font-semibold">
            评论 ({mockPost.comments})
          </h3>
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>
                    {comment.user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {comment.content}
                  </p>
                  <button className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="h-3.5 w-3.5" />
                    {comment.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Input
            placeholder="写下你的评论..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 rounded-full"
          />
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            disabled={!comment.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
