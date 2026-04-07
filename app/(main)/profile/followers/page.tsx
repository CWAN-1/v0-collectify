"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const tabs = [
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
]

const followers = [
  { id: "1", name: "CardMaster", username: "@cardmaster", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", verified: true, isFollowing: true },
  { id: "2", name: "PokeFan99", username: "@pokefan99", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false, isFollowing: false },
  { id: "3", name: "VintageCards", username: "@vintagecards", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true, isFollowing: true },
  { id: "4", name: "SportsCollector", username: "@sportscollector", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: false, isFollowing: false },
  { id: "5", name: "RareFinds", username: "@rarefinds", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true, isFollowing: false },
]

const following = [
  { id: "1", name: "CardMaster", username: "@cardmaster", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", verified: true, isFollowing: true },
  { id: "3", name: "VintageCards", username: "@vintagecards", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true, isFollowing: true },
  { id: "6", name: "TopPulls", username: "@toppulls", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", verified: true, isFollowing: true },
]

export default function FollowersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("followers")
  const [followState, setFollowState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {}
    ;[...followers, ...following].forEach(u => {
      state[u.id] = u.isFollowing
    })
    return state
  })

  const toggleFollow = (id: string) => {
    setFollowState(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const users = activeTab === "followers" ? followers : following

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold text-base">Connections</span>
          <div className="size-10" />
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all border ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* User List */}
      <main className="px-4 py-4">
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
              <Link href={`/user/${user.id}`}>
                <Avatar className="size-11">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Link href={`/user/${user.id}`} className="font-semibold text-sm truncate hover:underline">
                    {user.name}
                  </Link>
                  {user.verified && (
                    <div className="size-4 bg-foreground rounded-full flex items-center justify-center shrink-0">
                      <Check className="size-2.5 text-background" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{user.username}</span>
              </div>
              <Button
                variant={followState[user.id] ? "outline" : "default"}
                size="sm"
                className="rounded-full text-xs h-8 px-4"
                onClick={() => toggleFollow(user.id)}
              >
                {followState[user.id] ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
