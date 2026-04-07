"use client"

import { useState } from "react"
import { Package, Heart, UserPlus, MessageCircle, Check, Bell, Settings, FolderPlus, Folder, MoreVertical, X, Plus, Gavel, TrendingUp, Trophy, XCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const tabs = [
  { id: "chats", label: "Chats" },
  { id: "notifications", label: "Notifications" },
]

const notificationCategories = [
  { id: "all", label: "All" },
  { id: "auction", label: "Auction" },
  { id: "order", label: "Order" },
  { id: "post", label: "Post" },
  { id: "follow", label: "Follow" },
  { id: "system", label: "System" },
]

const initialChats = [
  {
    id: "1",
    user: { name: "CardMaster", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "Your card has been shipped!",
    time: "10:30",
    unread: 2,
    isOnline: true,
    folderId: null
  },
  {
    id: "2",
    user: { name: "SportsHub", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: true },
    lastMessage: "Still in stock, checkout now!",
    time: "09:15",
    unread: 0,
    isOnline: false,
    folderId: null
  },
  {
    id: "3",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: false },
    lastMessage: "Wow, amazing collection!",
    time: "Yesterday",
    unread: 0,
    isOnline: true,
    folderId: null
  },
  {
    id: "4",
    user: { name: "Mike Zhang", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: false },
    lastMessage: "I sent the additional photos",
    time: "Yesterday",
    unread: 1,
    isOnline: false,
    folderId: null
  },
]

const notifications = [
  { id: "a1", type: "auction_outbid", category: "auction", icon: TrendingUp, title: "You've Been Outbid!", message: "Charizard Base Set Holo - New bid: $2,600", time: "5 min ago", read: false, link: "/profile/auction" },
  { id: "a2", type: "auction_won", category: "auction", icon: Trophy, title: "Auction Won!", message: "Congratulations! You won Pikachu VMAX for $250", time: "1 hour ago", read: false, link: "/profile/auction" },
  { id: "a3", type: "auction_lost", category: "auction", icon: XCircle, title: "Auction Ended", message: "Blue-Eyes Dragon sold to another bidder", time: "3 hours ago", read: true, link: "/profile/auction" },
  { id: "1", type: "order", category: "order", icon: Package, title: "Order Shipped", message: "Order #ORD123456 is on its way", time: "2 hours ago", read: false },
  { id: "5", type: "order", category: "order", icon: Package, title: "Order Completed", message: "Order #ORD123455 completed. Leave a review?", time: "2 days ago", read: true },
  { id: "2", type: "like", category: "post", icon: Heart, title: "Post liked", message: "Alex and 23 others liked your post", time: "3 hours ago", read: false },
  { id: "4", type: "comment", category: "post", icon: MessageCircle, title: "New comment", message: "Maya commented on your post", time: "Yesterday", read: true },
  { id: "3", type: "follow", category: "follow", icon: UserPlus, title: "New follower", message: "CardMaster started following you", time: "5 hours ago", read: true },
  { id: "6", type: "follow", category: "follow", icon: UserPlus, title: "New follower", message: "PokeFan99 started following you", time: "1 day ago", read: true },
  { id: "8", type: "system", category: "system", icon: Bell, title: "Account Verified", message: "Your seller account has been verified", time: "3 days ago", read: true },
  { id: "10", type: "system", category: "system", icon: Settings, title: "Security Alert", message: "New login detected from iOS device", time: "4 days ago", read: true },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [activeCategory, setActiveCategory] = useState("all")
  const [chats, setChats] = useState(initialChats)
  const [folders, setFolders] = useState<{id: string, name: string}[]>([
    { id: "sellers", name: "Sellers" },
    { id: "friends", name: "Friends" },
  ])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showNewFolderSheet, setShowNewFolderSheet] = useState(false)
  const [showMoveChatSheet, setShowMoveChatSheet] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [movingChatId, setMovingChatId] = useState<string | null>(null)

  const filteredNotifications = activeCategory === "all" 
    ? notifications 
    : notifications.filter(n => n.category === activeCategory)

  const filteredChats = selectedFolder === null
    ? chats.filter(c => c.folderId === null)
    : chats.filter(c => c.folderId === selectedFolder)

  const createFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { id: Date.now().toString(), name: newFolderName.trim() }])
      setNewFolderName("")
      setShowNewFolderSheet(false)
    }
  }

  const moveToFolder = (chatId: string, folderId: string | null) => {
    setChats(chats.map(c => c.id === chatId ? { ...c, folderId } : c))
    setShowMoveChatSheet(false)
    setMovingChatId(null)
  }

  const openMoveSheet = (chatId: string) => {
    setMovingChatId(chatId)
    setShowMoveChatSheet(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-xl font-bold text-foreground">Messages</h1>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border border-primary"
                    : "bg-card text-foreground border border-border"
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

        {/* Folder Tabs for Chats */}
        {activeTab === "chats" && (
          <div className="px-4 pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setSelectedFolder(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedFolder === null
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                All Chats
              </button>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedFolder === folder.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  <Folder className="size-3" />
                  {folder.name}
                  <span className="text-[10px] opacity-70">
                    ({chats.filter(c => c.folderId === folder.id).length})
                  </span>
                </button>
              ))}
              <button
                onClick={() => setShowNewFolderSheet(true)}
                className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-dashed border-border text-muted-foreground flex items-center gap-1.5 hover:border-primary/50 transition-colors"
              >
                <FolderPlus className="size-3" />
                New
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="px-4 py-4">
        {activeTab === "chats" && (
          <div className="space-y-2">
            {filteredChats.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="size-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No chats in this folder</p>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary bg-card border border-border transition-colors"
                >
                  <Link href={`/messages/chat/${chat.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <Avatar className="size-12 border-2 border-primary/30">
                        <AvatarImage src={chat.user.avatar} />
                        <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-card rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm truncate">{chat.user.name}</span>
                          {chat.user.verified && (
                            <div className="size-3.5 bg-primary rounded-full flex items-center justify-center shrink-0">
                              <Check className="size-2 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate pr-4">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <Badge className="size-4 p-0 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white text-[10px] border-0">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 shrink-0">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openMoveSheet(chat.id)}>
                        <Folder className="size-4 mr-2" />
                        Move to folder
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
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
                const notifContent = (
                  <div
                    className={`flex items-start gap-3 p-3 rounded-xl border border-border transition-colors ${
                      notif.read ? "bg-card" : "bg-secondary"
                    } ${notif.link ? "hover:bg-secondary/80 cursor-pointer" : ""}`}
                  >
                    <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                      notif.category === "auction" ? "bg-purple-500/20" :
                      notif.category === "order" ? "bg-blue-500/20" :
                      notif.category === "post" ? "bg-pink-500/20" :
                      notif.category === "follow" ? "bg-green-500/20" :
                      "bg-orange-500/20"
                    }`}>
                      <Icon className={`size-4 ${
                        notif.category === "auction" ? "text-purple-500" :
                        notif.category === "order" ? "text-blue-500" :
                        notif.category === "post" ? "text-pink-500" :
                        notif.category === "follow" ? "text-green-500" :
                        "text-orange-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-sm">{notif.title}</span>
                        <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <span className="size-2 bg-primary rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                )
                
                return notif.link ? (
                  <Link key={notif.id} href={notif.link}>
                    {notifContent}
                  </Link>
                ) : (
                  <div key={notif.id}>{notifContent}</div>
                )
              })
            )}
          </div>
        )}
      </main>

      {/* New Folder Sheet */}
      <Sheet open={showNewFolderSheet} onOpenChange={setShowNewFolderSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Create Folder</SheetTitle>
            <SheetDescription className="sr-only">Create a new folder for organizing chats</SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="h-11 rounded-xl"
            />
            <Button onClick={createFolder} disabled={!newFolderName.trim()} className="w-full h-11 rounded-xl">
              Create Folder
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Move Chat Sheet */}
      <Sheet open={showMoveChatSheet} onOpenChange={setShowMoveChatSheet}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Move to Folder</SheetTitle>
            <SheetDescription className="sr-only">Select a folder to move this chat</SheetDescription>
          </SheetHeader>
          <div className="space-y-2">
            <button
              onClick={() => movingChatId && moveToFolder(movingChatId, null)}
              className="w-full p-3 rounded-xl text-left text-sm font-medium bg-card border border-border hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <X className="size-4" />
              Remove from folder
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => movingChatId && moveToFolder(movingChatId, folder.id)}
                className="w-full p-3 rounded-xl text-left text-sm font-medium bg-card border border-border hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Folder className="size-4" />
                {folder.name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
