"use client"

import { useState } from "react"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const followingUsers = [
  {
    id: "1",
    name: "CardMaster",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    followers: 1234,
    products: 56,
    isFollowing: true,
  },
  {
    id: "2",
    name: "PokeFanatic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    followers: 892,
    products: 34,
    isFollowing: true,
  },
  {
    id: "3",
    name: "YugiCollector",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    followers: 567,
    products: 89,
    isFollowing: true,
  },
  {
    id: "4",
    name: "OnePieceID",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    followers: 2341,
    products: 123,
    isFollowing: true,
  },
  {
    id: "5",
    name: "MTGLegend",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    followers: 4521,
    products: 201,
    isFollowing: true,
  },
]

export default function FollowingPage() {
  const [users, setUsers] = useState(followingUsers)

  const toggleFollow = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-base font-semibold">Following</h1>
          <span className="text-sm text-muted-foreground">({users.filter(u => u.isFollowing).length})</span>
        </div>
      </header>

      <main className="p-4">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Users className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Not following anyone</h3>
            <p className="text-sm text-muted-foreground">Follow sellers to see their updates!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                <Link href={`/user/${user.id}`} className="shrink-0">
                  <Avatar className="size-12 border-2 border-border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={`/user/${user.id}`} className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate">{user.name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">{user.followers} followers</span>
                    <span className="text-xs text-muted-foreground">{user.products} products</span>
                  </div>
                </Link>
                <Button
                  variant={user.isFollowing ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleFollow(user.id)}
                  className={`h-8 rounded-full text-xs shrink-0 ${
                    user.isFollowing ? "border-border" : "bg-primary"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
