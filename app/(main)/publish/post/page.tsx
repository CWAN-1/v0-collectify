"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Plus, MapPin, Hash, AtSign, ShoppingBag, Check, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { cn } from "@/lib/utils"

const suggestedTags = [
  "Pokemon", "Unboxing", "PullRates", "Collection",
  "SportsCards", "YuGiOh", "OnePiece", "MTG", "GradedCards"
]

// Mock user's listed products
const userProducts = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop",
    category: "Pokemon TCG",
    status: "active",
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop",
    category: "Pokemon TCG",
    status: "active",
  },
  {
    id: "3",
    name: "Blue-Eyes White Dragon",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&h=200&fit=crop",
    category: "Yu-Gi-Oh",
    status: "active",
  },
  {
    id: "4",
    name: "Michael Jordan Rookie Card",
    price: 4999.99,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
    category: "Sports Cards",
    status: "active",
  },
  {
    id: "5",
    name: "Pokemon Vivid Voltage Booster Box",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop",
    category: "Pokemon TCG",
    status: "active",
  },
]

interface LinkedProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function CreatePostPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [location, setLocation] = useState("")
  const [linkedProducts, setLinkedProducts] = useState<LinkedProduct[]>([])
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false)

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const toggleProduct = (product: typeof userProducts[0]) => {
    const isLinked = linkedProducts.some(p => p.id === product.id)
    if (isLinked) {
      setLinkedProducts(linkedProducts.filter(p => p.id !== product.id))
    } else if (linkedProducts.length < 6) {
      setLinkedProducts([...linkedProducts, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }])
    }
  }

  const removeLinkedProduct = (productId: string) => {
    setLinkedProducts(linkedProducts.filter(p => p.id !== productId))
  }

  const handlePublish = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold">发布内容</span>
          <Button
            onClick={handlePublish}
            disabled={!title || images.length === 0}
            className="rounded-full px-5"
          >
            发布
          </Button>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Image Upload */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">图片 (最多9张)</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Add Photo Button */}
            <label className="size-24 shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">添加</span>
              <input type="file" accept="image/*" multiple className="hidden" />
            </label>
            
            {/* Placeholder Images */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-24 shrink-0 relative rounded-xl overflow-hidden bg-muted">
                <Image
                  src={`https://images.unsplash.com/photo-161377140478${i}-3a5686aa2be3?w=200&h=200&fit=crop`}
                  alt={`Photo ${i}`}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-1 right-1 size-6 bg-background/80 rounded-full flex items-center justify-center">
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <Input
            placeholder="输入标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-14 rounded-2xl bg-muted border-0 text-base font-semibold"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground mt-2 text-right">{title.length}/100</p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <Textarea
            placeholder="分享你的卡牌收藏故事..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 rounded-2xl bg-muted border-0 text-base resize-none"
            maxLength={2000}
          />
          <p className="text-xs text-muted-foreground mt-2 text-right">{content.length}/2000</p>
        </div>

        {/* Link Products */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">关联商品 (最多6个)</h3>
          
          {/* Linked Products Display */}
          {linkedProducts.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-3 mb-3">
              {linkedProducts.map((product) => (
                <div key={product.id} className="shrink-0 w-32 bg-card rounded-xl border border-border overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeLinkedProduct(product.id)}
                      className="absolute top-1 right-1 size-5 bg-background/80 rounded-full flex items-center justify-center"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-xs text-primary font-semibold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Product Button */}
          <Sheet open={isProductSheetOpen} onOpenChange={setIsProductSheetOpen}>
            <SheetTrigger asChild>
              <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center gap-3 hover:bg-border transition-colors">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="size-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium">
                    {linkedProducts.length > 0 ? `已关联 ${linkedProducts.length} 个商品` : "关联我的商品"}
                  </span>
                  <p className="text-xs text-muted-foreground">让粉丝可以直接购买</p>
                </div>
                <Plus className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>选择要关联的商品</SheetTitle>
              </SheetHeader>
              
              {userProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[40vh] text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="size-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">暂无上架商品</h4>
                  <p className="text-sm text-muted-foreground mb-4">您还没有上架任何商品</p>
                  <Button onClick={() => router.push("/publish/product")} className="rounded-full">
                    去上架商品
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[55vh] overflow-y-auto">
                  {userProducts.map((product) => {
                    const isSelected = linkedProducts.some(p => p.id === product.id)
                    const isDisabled = !isSelected && linkedProducts.length >= 6
                    return (
                      <button
                        key={product.id}
                        onClick={() => !isDisabled && toggleProduct(product)}
                        disabled={isDisabled}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
                          isSelected ? "bg-primary/10 border border-primary" : "bg-muted hover:bg-border",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="size-16 relative rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                          <p className="text-sm text-primary font-semibold">${product.price}</p>
                        </div>
                        <div className={cn(
                          "size-6 rounded-full border-2 flex items-center justify-center shrink-0",
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        )}>
                          {isSelected && <Check className="size-4 text-primary-foreground" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {userProducts.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
                  <Button
                    onClick={() => setIsProductSheetOpen(false)}
                    className="w-full h-12 rounded-full"
                  >
                    确定 ({linkedProducts.length}/6)
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">标签 (最多5个)</h3>
          
          {/* Selected Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background rounded-full text-sm"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Tag Input */}
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="添加标签..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.replace(/\s/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(tagInput)
                }
              }}
              className="h-12 pl-12 rounded-full bg-muted border-0"
              disabled={tags.length >= 5}
            />
          </div>

          {/* Suggested Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestedTags
              .filter(tag => !tags.includes(tag))
              .slice(0, 6)
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  disabled={tags.length >= 5}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm hover:bg-border transition-colors disabled:opacity-40"
                >
                  #{tag}
                </button>
              ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">位置</h3>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="添加位置..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 pl-12 rounded-full bg-muted border-0"
            />
          </div>
        </div>

        {/* Mention */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">提及用户</h3>
          <div className="relative">
            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="提及用户..."
              className="h-12 pl-12 rounded-full bg-muted border-0"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
