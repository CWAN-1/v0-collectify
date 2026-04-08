"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const myPosts = [
  {
    id: "1",
    image: "/posts/post-pokemon-1.jpg",
    title: "Just pulled this amazing Pikachu VMAX Rainbow Rare!",
    likes: 234,
    comments: 45,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    image: "/posts/post-yugioh-1.jpg",
    title: "My Blue-Eyes White Dragon collection is growing",
    likes: 189,
    comments: 32,
    createdAt: "1 week ago",
  },
  {
    id: "3",
    image: "/posts/post-storage-1.jpg",
    title: "Tips for storing your valuable cards properly",
    likes: 567,
    comments: 89,
    createdAt: "2 weeks ago",
  },
]

const user = {
  name: "CardCollector",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState(myPosts)

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Link href="/profile" className="absolute left-4">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold">My Posts</h1>
        </div>
      </header>

      <main className="p-4">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No posts yet</h3>
            <p className="text-sm text-muted-foreground">Share your collection with the community!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-2xl overflow-hidden border border-border">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleDelete(post.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-foreground mb-3">{post.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Heart className="size-4" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MessageCircle className="size-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
