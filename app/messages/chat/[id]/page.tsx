"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MoreVertical, Send, Plus, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const mockChat = {
  user: {
    id: "1",
    name: "官方认证店",
    avatar: "https://i.pravatar.cc/150?img=10",
    verified: true,
    online: true,
  },
  messages: [
    {
      id: "1",
      sender: "other",
      content: "您好，请问有什么可以帮助您的？",
      time: "10:00",
    },
    {
      id: "2",
      sender: "me",
      content: "你好，我想问一下那张皮卡丘VMAX还有货吗？",
      time: "10:02",
    },
    {
      id: "3",
      sender: "other",
      content: "有的，目前库存还有3张",
      time: "10:05",
    },
    {
      id: "4",
      sender: "me",
      content: "好的，我现在下单",
      time: "10:06",
    },
    {
      id: "5",
      sender: "other",
      content: "好的，感谢您的购买！",
      time: "10:08",
    },
    {
      id: "6",
      sender: "other",
      type: "product",
      product: {
        id: "1",
        title: "皮卡丘VMAX闪卡 - 25周年纪念版",
        image:
          "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop",
        price: 2500000,
      },
      time: "10:10",
    },
    {
      id: "7",
      sender: "other",
      content: "好的，商品已发货，请注意查收",
      time: "10:30",
    },
  ],
}

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockChat.messages)

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: "me",
        content: message,
        time: new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ])
    setMessage("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/messages"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mockChat.user.avatar} />
                <AvatarFallback>
                  {mockChat.user.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              {mockChat.user.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{mockChat.user.name}</span>
                {mockChat.user.verified && (
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
              <span className="text-xs text-success">在线</span>
            </div>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <MoreVertical className="h-5 w-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "me" ? "justify-end" : "justify-start"
              )}
            >
              {msg.sender !== "me" && (
                <Avatar className="mr-2 mt-1 h-8 w-8 shrink-0">
                  <AvatarImage src={mockChat.user.avatar} />
                  <AvatarFallback>
                    {mockChat.user.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%]",
                  msg.sender === "me" ? "items-end" : "items-start"
                )}
              >
                {"product" in msg && msg.product ? (
                  <Link
                    href={`/shop/${msg.product.id}`}
                    className="block overflow-hidden rounded-xl bg-card shadow-sm"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={msg.product.image}
                          alt={msg.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="line-clamp-2 text-sm font-medium">
                          {msg.product.title}
                        </span>
                        <span className="mt-1 text-sm font-bold text-accent">
                          Rp {msg.product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5",
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-card-foreground"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                )}
                <span
                  className={cn(
                    "mt-1 block text-xs text-muted-foreground",
                    msg.sender === "me" ? "text-right" : "text-left"
                  )}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Plus className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <ImageIcon className="h-5 w-5" />
          </button>
          <Input
            placeholder="输入消息..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-full"
          />
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
