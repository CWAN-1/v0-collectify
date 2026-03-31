"use client"

import Image from "next/image"
import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PostCardProps {
  post: {
    id: string
    title: string
    image: string
    author: {
      name: string
      avatar: string
    }
    likes: number
    comments: number
    tags?: string[]
  }
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.tags && post.tags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-card-foreground">
          {post.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="text-xs">
                {post.author.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all",
                  liked && "fill-accent text-accent scale-110"
                )}
              />
              <span className="text-xs">{likeCount}</span>
            </button>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
