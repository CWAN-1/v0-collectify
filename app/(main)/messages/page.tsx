"use client"

import { useState } from "react"
import { Package, Heart, UserPlus, MessageCircle, Check, Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tabs = [
  { id: "chats", label: "Chats" },
  { id: "notifications", label: "Notifications" },
]

const notificationCategories = [
  { id: "all", label: "All" },
  { id: "order", label: "Order" },
  { id: "post", label: "Post" },
  { id: "follow", label: "Follow" },
  { id: "system", label: "System" },
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
  // Order notifications
  {
    id: "1",
    type: "order",
    category: "order",
    icon: Package,
    title: "Order Shipped",
    message: "Order #ORD123456 is on its way",
    time: "2 hours ago",
    read: false
  },
  {
    id: "5",
    type: "order",
    category: "order",
    icon: Package,
    title: "Order Completed",
    message: "Order #ORD123455 completed. Leave a review?",
    time: "2 days ago",
    read: true
  },
  {
    id: "9",
    type: "order",
    category: "order",
    icon: Package,
    title: "Payment Received",
    message: "Payment for order #ORD123460 confirmed",
    time: "3 days ago",
    read: true
  },
  // Post notifications
  {
    id: "2",
    type: "like",
    category: "post",
    icon: Heart,
    title: "Post liked",
    message: "Alex and 23 others liked your post",
    time: "3 hours ago",
    read: false
  },
  {
    id: "4",
    type: "comment",
    category: "post",
    icon: MessageCircle,
    title: "New comment",
    message: "Maya commented on your post",
    time: "Yesterday",
    read: true
  },
  {
    id: "7",
    type: "like",
    category: "post",
    icon: Heart,
    title: "Post liked",
    message: "John and 15 others liked your collection",
    time: "2 days ago",
    read: true
  },
  // Follow notifications
  {
    id: "3",
    type: "follow",
    category: "follow",
    icon: UserPlus,
    title: "New follower",
    message: "CardMaster started following you",
    time: "5 hours ago",
    read: true
  },
  {
    id: "6",
    type: "follow",
    category: "follow",
    icon: UserPlus,
    title: "New follower",
    message: "PokeFan99 started following you",
    time: "1 day ago",
    read: true
  },
  // System notifications
  {
    id: "8",
    type: "system",
    category: "system",
    icon: Bell,
    title: "Account Verified",
    message: "Your seller account has been verified",
    time: "3 days ago",
    read: true
  },
  {
    id: "10",
    type: "system",
    category: "system",
    icon: Settings,
    title: "Security Alert",
    message: "New login detected from iOS device",
    time: "4 days ago",
    read: true
  },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredNotifications = activeCategory === "all" 
    ? notifications 
    : notifications.filter(n => n.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>

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

        {/* Notification Category Tabs */}
        {activeTab === "notifications" && (
          <div className="px-4 pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {notificationCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
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
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const Icon = notif.icon
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-4 rounded-2xl border border-border ${
                      notif.read ? "bg-card" : "bg-secondary"
                    }`}
                  >
                    <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${
                      notif.category === "order" ? "bg-blue-500/20" :
                      notif.category === "post" ? "bg-pink-500/20" :
                      notif.category === "follow" ? "bg-green-500/20" :
                      "bg-orange-500/20"
                    }`}>
                      <Icon className={`size-5 ${
                        notif.category === "order" ? "text-blue-500" :
                        notif.category === "post" ? "text-pink-500" :
                        notif.category === "follow" ? "text-green-500" :
                        "text-orange-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{notif.title}</span>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <span className="size-2 bg-primary rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </main>
    </div>
  )
}
