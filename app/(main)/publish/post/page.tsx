"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Plus, MapPin, AtSign, ShoppingBag, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

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
    setShowSuccessDialog(true)
  }

  const handleAddNewProduct = () => {
    setIsProductSheetOpen(false)
    router.push("/publish/product")
  }

  const handleGoHome = () => {
    setShowSuccessDialog(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold text-sm">Write Post</span>
          <Button
            onClick={handlePublish}
            disabled={!title || images.length === 0}
            className="h-8 rounded-full px-4 text-xs"
          >
            Post
          </Button>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Image Upload */}
        <div className="mb-4">
          <label className="text-[10px] font-medium text-muted-foreground mb-2 block">Photos (up to 9)</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* Add Photo Button */}
            <label className="size-16 shrink-0 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-4 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Add</span>
              <input type="file" accept="image/*" multiple className="hidden" />
            </label>
            
            {/* Placeholder Images */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-16 shrink-0 relative rounded-lg overflow-hidden bg-muted">
                <Image
                  src={`https://images.unsplash.com/photo-161377140478${i}-3a5686aa2be3?w=200&h=200&fit=crop`}
                  alt="placeholder"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Post Title *</label>
          <Input
            placeholder="What's your post about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 rounded-lg bg-muted border-0 text-xs placeholder:text-muted-foreground"
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Content</label>
          <Textarea
            placeholder="Share your thoughts, card stories, or collection updates..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-16 rounded-lg bg-muted border-0 resize-none text-xs placeholder:text-muted-foreground"
          />
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Tags (up to 5)</label>
          <div className="bg-muted rounded-lg p-2.5 min-h-10 mb-2">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-background rounded px-2 py-0.5 flex items-center gap-1"
                >
                  <AtSign className="size-2.5" />
                  <span className="text-[10px] font-medium">{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:opacity-60 transition-opacity"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tag Input */}
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Type tag name..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag(tagInput)
                }
              }}
              className="h-8 rounded-lg bg-background border border-border text-[10px] flex-1"
            />
            <Button
              onClick={() => addTag(tagInput)}
              size="sm"
              className="h-8 rounded-lg text-[10px] px-3"
            >
              Add
            </Button>
          </div>

          {/* Suggested Tags */}
          <div className="flex flex-wrap gap-1">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] hover:opacity-80 transition-opacity"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="text-[10px] font-medium text-muted-foreground mb-1 block">Location</label>
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 text-muted-foreground shrink-0" />
            <Input
              placeholder="Where are you located?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-8 rounded-lg bg-background border border-border text-[10px] flex-1"
            />
          </div>
        </div>

        {/* Linked Products Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
              <ShoppingBag className="size-3.5" />
              Link Your Cards (up to 6)
            </label>
            <span className="text-[10px] text-muted-foreground">{linkedProducts.length}/6</span>
          </div>

          {/* Selected Products */}
          {linkedProducts.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-2.5 mb-2">
              <div className="grid grid-cols-4 gap-1.5">
                {linkedProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <div className="aspect-square rounded overflow-hidden bg-muted relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeLinkedProduct(product.id)}
                      className="absolute -top-1 -right-1 size-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-2.5 text-background" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-border/50">
                <div className="text-[10px] text-muted-foreground space-y-0.5">
                  {linkedProducts.map((product) => (
                    <div key={product.id} className="flex justify-between">
                      <span className="truncate flex-1">{product.name}</span>
                      <span className="font-medium text-foreground ml-2">${product.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add Products Button */}
          <Sheet open={isProductSheetOpen} onOpenChange={setIsProductSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 rounded-lg border-dashed text-xs"
                disabled={linkedProducts.length >= 6}
              >
                <Plus className="size-3.5 mr-1.5" />
                Add Products
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-base">Select Products to Link</SheetTitle>
                <SheetDescription className="sr-only">Choose up to 6 products to link to your post</SheetDescription>
              </SheetHeader>
              <div className="space-y-2 overflow-y-auto pr-4" style={{ height: "calc(80vh - 100px)" }}>
                {userProducts.map((product) => {
                  const isLinked = linkedProducts.some(p => p.id === product.id)
                  const isDisabled = linkedProducts.length >= 6 && !isLinked

                  return (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full flex items-start gap-3 p-3 rounded-xl transition-colors",
                        isLinked
                          ? "bg-primary/10 border border-primary/50"
                          : isDisabled
                          ? "bg-muted opacity-50 cursor-not-allowed"
                          : "bg-card border border-border hover:border-primary/50"
                      )}
                    >
                      <div className="relative size-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-sm truncate">{product.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                        <div className="text-sm font-bold text-primary">${product.price}</div>
                      </div>
                      {isLinked && (
                        <div className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                          <Check className="size-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  )
                })}

                {/* Add New Product Option */}
                <button
                  onClick={handleAddNewProduct}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors"
                >
                  <div className="size-16 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                    <Plus className="size-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm">Add New Product</div>
                    <div className="text-xs text-muted-foreground">List a new item for sale</div>
                  </div>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </main>

      {/* Footer Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2.5">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 h-10 rounded-lg text-xs"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 h-10 rounded-lg text-xs"
            onClick={handlePublish}
            disabled={!title || images.length === 0}
          >
            Publish
          </Button>
        </div>
      </footer>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="mx-4 rounded-2xl max-w-sm">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 size-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="size-8 text-green-500" />
            </div>
            <DialogTitle className="text-lg">Post Published!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Your post is now live. Keep sharing your collection stories!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button 
              className="w-full h-12 rounded-xl"
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
