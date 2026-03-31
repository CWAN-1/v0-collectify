"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Plus, MapPin, Hash, AtSign, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const suggestedTags = [
  "Pokemon", "Unboxing", "PullRates", "Collection",
  "SportsCards", "YuGiOh", "OnePiece", "MTG", "GradedCards"
]

export default function CreatePostPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [location, setLocation] = useState("")

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
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
          <span className="font-semibold">New Post</span>
          <Button
            onClick={handlePublish}
            disabled={!title || images.length === 0}
            className="rounded-full px-5"
          >
            Post
          </Button>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Image Upload */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Photos (Max. 9)</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Add Photo Button */}
            <label className="size-24 shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add</span>
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
            placeholder="Post title..."
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
            placeholder="Tell us about your card collection..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-32 rounded-2xl bg-muted border-0 text-base resize-none"
            maxLength={2000}
          />
          <p className="text-xs text-muted-foreground mt-2 text-right">{content.length}/2000</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Tags (Max. 5)</h3>
          
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
              placeholder="Add tag..."
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
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Location</h3>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Add location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 pl-12 rounded-full bg-muted border-0"
            />
          </div>
        </div>

        {/* Mention */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Mention</h3>
          <div className="relative">
            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Mention users..."
              className="h-12 pl-12 rounded-full bg-muted border-0"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
