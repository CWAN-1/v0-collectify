"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ShoppingBag, Heart, MessageCircle, Users } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "chat", label: "聊天" },
  { id: "notification", label: "通知" },
]

const systemNotifications = [
  {
    id: "order",
    icon: ShoppingBag,
    label: "订单消息",
    desc: "您有新的订单更新",
    unread: 3,
    color: "bg-primary",
  },
  {
    id: "like",
    icon: Heart,
    label: "点赞收藏",
    desc: "有人喜欢了您的内容",
    unread: 12,
    color: "bg-accent",
  },
  {
    id: "comment",
    icon: MessageCircle,
    label: "评论回复",
    desc: "有新的评论和回复",
    unread: 5,
    color: "bg-success",
  },
  {
    id: "follow",
    icon: Users,
    label: "新增关注",
    desc: "有新的粉丝关注了您",
    unread: 8,
    color: "bg-chart-5",
  },
]

const chatList = [
  {
    id: "1",
    user: {
      name: "官方认证店",
      avatar: "https://i.pravatar.cc/150?img=10",
      verified: true,
    },
    lastMessage: "好的，商品已发货，请注意查收",
    time: "10:30",
    unread: 2,
  },
  {
    id: "2",
    user: {
      name: "卡牌收藏家",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: false,
    },
    lastMessage: "这张卡还在吗？可以便宜点吗？",
    time: "昨天",
    unread: 0,
  },
  {
    id: "3",
    user: {
      name: "足球卡迷",
      avatar: "https://i.pravatar.cc/150?img=2",
      verified: true,
    },
    lastMessage: "好的，期待下次合作！",
    time: "昨天",
    unread: 0,
  },
  {
    id: "4",
    user: {
      name: "游戏王老玩家",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: false,
    },
    lastMessage: "请问有黑魔导女孩吗？",
    time: "3天前",
    unread: 1,
  },
  {
    id: "5",
    user: {
      name: "海贼迷",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: false,
    },
    lastMessage: "收到了，品相很好，好评！",
    time: "上周",
    unread: 0,
  },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 px-4 py-3 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">消息</h1>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-4 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-4">
          {activeTab === "notification" ? (
            /* Notification List */
            <div className="space-y-3">
              {systemNotifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <Link
                    key={notification.id}
                    href={`/messages/${notification.id}`}
                    className="flex items-center gap-4 rounded-xl bg-card p-4 transition-all hover:shadow-md"
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full",
                        notification.color
                      )}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {notification.label}
                        </span>
                        {notification.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {notification.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {notification.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* Chat List */
            <div className="space-y-1">
              {chatList.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/messages/chat/${chat.id}`}
                  className="flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-secondary/50"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.user.avatar} />
                      <AvatarFallback>
                        {chat.user.name.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.unread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{chat.user.name}</span>
                        {chat.user.verified && (
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
                        {chat.time}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {chat.lastMessage}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
