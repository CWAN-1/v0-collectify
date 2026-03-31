"use client"

import { useState } from "react"
import { Search, Bell, Package, Heart, UserPlus, MessageCircle, Check, CheckCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tabs = [
  { id: "chats", label: "Pesan" },
  { id: "notifications", label: "Notifikasi" },
]

const chats = [
  {
    id: "1",
    user: { name: "CardMaster Jakarta", avatar: "/avatars/seller-1.jpg", verified: true },
    lastMessage: "Baik kak, kartu sudah dikirim ya",
    time: "10:30",
    unread: 2,
    isOnline: true
  },
  {
    id: "2",
    user: { name: "SportsHub", avatar: "/avatars/seller-2.jpg", verified: true },
    lastMessage: "Stok masih ada kak, langsung checkout aja",
    time: "09:15",
    unread: 0,
    isOnline: false
  },
  {
    id: "3",
    user: { name: "Dewi Kartika", avatar: "/avatars/user-2.jpg", verified: false },
    lastMessage: "Wah keren banget koleksinya!",
    time: "Kemarin",
    unread: 0,
    isOnline: true
  },
  {
    id: "4",
    user: { name: "Ahmad Rizky", avatar: "/avatars/user-3.jpg", verified: false },
    lastMessage: "Foto tambahan sudah saya kirim ya",
    time: "Kemarin",
    unread: 1,
    isOnline: false
  },
]

const notifications = [
  {
    id: "1",
    type: "order",
    icon: Package,
    title: "Pesanan Dikirim",
    message: "Pesanan #ORD123456 sedang dalam pengiriman",
    time: "2 jam lalu",
    read: false
  },
  {
    id: "2",
    type: "like",
    icon: Heart,
    title: "Posting disukai",
    message: "Budi dan 23 lainnya menyukai posting Anda",
    time: "3 jam lalu",
    read: false
  },
  {
    id: "3",
    type: "follow",
    icon: UserPlus,
    title: "Pengikut baru",
    message: "CardMaster Jakarta mulai mengikuti Anda",
    time: "5 jam lalu",
    read: true
  },
  {
    id: "4",
    type: "comment",
    icon: MessageCircle,
    title: "Komentar baru",
    message: "Maya berkomentar di posting Anda",
    time: "Kemarin",
    read: true
  },
  {
    id: "5",
    type: "order",
    icon: Package,
    title: "Pesanan Selesai",
    message: "Pesanan #ORD123455 telah selesai. Beri ulasan?",
    time: "2 hari lalu",
    read: true
  },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Pesan</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari pesan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 rounded-full bg-muted border-0 text-base"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground"
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
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors"
              >
                <div className="relative">
                  <Avatar className="size-14">
                    <AvatarImage src={chat.user.avatar} />
                    <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold truncate">{chat.user.name}</span>
                      {chat.user.verified && (
                        <div className="size-4 bg-foreground rounded-full flex items-center justify-center shrink-0">
                          <Check className="size-2.5 text-background" />
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
                      <Badge className="size-5 p-0 flex items-center justify-center rounded-full bg-foreground text-background text-xs">
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
                  className={`flex items-start gap-3 p-4 rounded-2xl ${
                    notif.read ? "bg-background" : "bg-muted"
                  }`}
                >
                  <div className="size-12 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{notif.title}</span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                  {!notif.read && (
                    <span className="size-2 bg-foreground rounded-full shrink-0 mt-2" />
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
