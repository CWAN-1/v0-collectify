"use client"

import { useState } from "react"
import { Search, Bell, Package, Heart, UserPlus, MessageCircle, Check, CheckCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tabs = [
  { id: "chats", label: "Chats" },
  { id: "notifications", label: "Notifications" },
]

const chats = [
  {
    id: "1",
    user: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "Your card has been shipped!",
    time: "10:30",
    unread: 2,
    isOnline: true
  },
  {
    id: "2",
    user: { name: "SportsHub", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "Still in stock, checkout now!",
    time: "09:15",
    unread: 0,
    isOnline: false
  },
  {
    id: "3",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    lastMessage: "Wow, amazing collection!",
    time: "Yesterday",
    unread: 0,
    isOnline: true
  },
  {
    id: "4",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: false },
    lastMessage: "I sent the additional photos",
    time: "Yesterday",
    unread: 1,
    isOnline: false
  },
]

const notifications = [
  {
    id: "1",
    type: "order",
    icon: Package,
    title: "Order Shipped",
    message: "Order #ORD123456 is on its way",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    type: "like",
    icon: Heart,
    title: "Post liked",
    message: "Alex and 23 others liked your post",
    time: "3 hours ago",
    read: false
  },
  {
    id: "3",
    type: "follow",
    icon: UserPlus,
    title: "New follower",
    message: "CardMaster started following you",
    time: "5 hours ago",
    read: true
  },
  {
    id: "4",
    type: "comment",
    icon: MessageCircle,
    title: "New comment",
    message: "Maya commented on your post",
    time: "Yesterday",
    read: true
  },
  {
    id: "5",
    type: "order",
    icon: Package,
    title: "Order Completed",
    message: "Order #ORD123455 completed. Leave a review?",
    time: "2 days ago",
    read: true
  },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 rounded-xl bg-card border-border text-base"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {activeTab === "chats" && (
          <div className="space-y-2">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/messages/chat/${chat.id}`}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary bg-card border border-border transition-colors"
              >
                <div className="relative">
                  <Avatar className="size-14 border-2 border-primary/30">
                    <AvatarImage src={chat.user.avatar} />
                    <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-card rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold truncate">{chat.user.name}</span>
                      {chat.user.verified && (
                        <div className="size-4 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <Check className="size-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate pr-4">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <Badge className="size-5 p-0 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs border-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = notif.icon
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-4 rounded-2xl border border-border ${
                    notif.read ? "bg-card" : "bg-secondary"
                  }`}
                >
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{notif.title}</span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                  {!notif.read && (
                    <span className="size-2 bg-primary rounded-full shrink-0 mt-2" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
