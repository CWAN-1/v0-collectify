"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag, ImageIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const publishOptions = [
  {
    id: "post",
    href: "/publish/post",
    icon: ImageIcon,
    title: "Write Post",
    description: "Share your collection and card stories",
    color: "bg-muted"
  },
  {
    id: "product",
    href: "/publish/product",
    icon: ShoppingBag,
    title: "Sell Something",
    description: "List your collectible cards for sale",
    color: "bg-muted"
  },
]

export default function PublishPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9 absolute left-4" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold text-sm">Create</span>
        </div>
      </header>

      {/* Options */}
      <main className="px-4 py-6">
        <div className="space-y-4">
          {publishOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={() => router.push(option.href)}
                className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-foreground/20 transition-colors"
              >
                <div className={`size-14 rounded-2xl ${option.color} flex items-center justify-center`}>
                  <Icon className="size-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-muted rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-foreground flex items-center justify-center shrink-0">
              <Sparkles className="size-5 text-background" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Tips for sellers</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Clear photos with good lighting can increase your sales by 3x. Include front, back, and detail shots of the card condition.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
