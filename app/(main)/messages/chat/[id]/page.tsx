"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Phone, MoreVertical, Send, ImageIcon, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const chatUser = {
  name: "CardMaster",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  verified: true,
  isOnline: true,
  lastSeen: "Online"
}

const messages = [
  {
    id: "1",
    sender: "them",
    type: "text",
    content: "Hi! How can I help you?",
    time: "10:00",
    status: "read"
  },
  {
    id: "2",
    sender: "me",
    type: "text",
    content: "Hi, I want to ask about the Pikachu VMAX card",
    time: "10:02",
    status: "read"
  },
  {
    id: "3",
    sender: "me",
    type: "text",
    content: "Is the condition really mint?",
    time: "10:02",
    status: "read"
  },
  {
    id: "4",
    sender: "them",
    type: "text",
    content: "Yes! The card is fresh from pack, went straight into sleeve and toploader. No whitening at all",
    time: "10:05",
    status: "read"
  },
  {
    id: "5",
    sender: "them",
    type: "product",
    product: {
      image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=300&h=300&fit=crop",
      name: "Pikachu VMAX Rainbow Rare",
      price: 250
    },
    time: "10:05",
    status: "read"
  },
  {
    id: "6",
    sender: "me",
    type: "text",
    content: "Ok, I will checkout. Can you ship today?",
    time: "10:15",
    status: "read"
  },
  {
    id: "7",
    sender: "them",
    type: "text",
    content: "Sure! If you checkout before 12pm, I can ship today",
    time: "10:20",
    status: "read"
  },
  {
    id: "8",
    sender: "them",
    type: "text",
    content: "Your card has been shipped! Tracking: TRK123456789",
    time: "10:30",
    status: "delivered"
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ChatPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <Avatar className="size-10">
                <AvatarImage src={chatUser.avatar} />
                <AvatarFallback>{chatUser.name[0]}</AvatarFallback>
              </Avatar>
              {chatUser.isOnline && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{chatUser.name}</span>
                {chatUser.verified && (
                  <div className="size-4 bg-foreground rounded-full flex items-center justify-center">
                    <Check className="size-2.5 text-background" />
                  </div>
                )}
              </div>
              <span className="text-xs text-green-500">{chatUser.lastSeen}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${msg.sender === "me" ? "order-2" : ""}`}>
                {msg.type === "text" ? (
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-foreground text-background rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ) : msg.type === "product" && msg.product ? (
                  <div className="bg-muted rounded-2xl overflow-hidden w-64">
                    <div className="relative aspect-square">
                      <Image
                        src={msg.product.image}
                        alt={msg.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm mb-1">{msg.product.name}</p>
                      <p className="font-bold">{formatPrice(msg.product.price)}</p>
                    </div>
                  </div>
                ) : null}
                <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : ""}`}>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                  {msg.sender === "me" && (
                    msg.status === "read" ? (
                      <CheckCheck className="size-3.5 text-foreground" />
                    ) : (
                      <Check className="size-3.5 text-muted-foreground" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <div className="flex gap-3 items-center">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ImageIcon className="size-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="h-12 pr-12 rounded-full bg-muted border-0"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-foreground rounded-full flex items-center justify-center"
            >
              <Send className="size-4 text-background" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
