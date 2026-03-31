"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, ShoppingBag, ImageIcon, Video, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const publishOptions = [
  {
    id: "post",
    href: "/publish/post",
    icon: ImageIcon,
    title: "Posting",
    description: "Bagikan koleksi dan cerita kartu Anda",
    color: "bg-muted"
  },
  {
    id: "product",
    href: "/publish/product",
    icon: ShoppingBag,
    title: "Jual Kartu",
    description: "Jual kartu koleksi Anda di toko",
    color: "bg-muted"
  },
]

export default function PublishPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold text-lg">Buat</span>
          <div className="size-10" />
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
              <h4 className="font-semibold mb-1">Tips untuk penjual</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Foto yang jelas dengan pencahayaan baik dapat meningkatkan peluang penjualan hingga 3x lipat. Sertakan foto depan, belakang, dan detail kondisi kartu.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
