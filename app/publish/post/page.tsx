"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, X, Hash, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const suggestedTags = [
  "宝可梦",
  "开箱",
  "收藏",
  "球星卡",
  "游戏王",
  "鉴卡",
  "交换",
  "求购",
]

export default function PublishPostPage() {
  const [images, setImages] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

  const handleImageAdd = () => {
    // 模拟添加图片
    const mockImages = [
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop",
    ]
    if (images.length < 9) {
      setImages([...images, mockImages[images.length % 3]])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, customTag])
      setCustomTag("")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-4 py-3 backdrop-blur-lg">
        <Link
          href="/publish"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">发布动态</h1>
        <Button size="sm" disabled={!content.trim() && images.length === 0}>
          发布
        </Button>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Image Upload */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`上传图片 ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/80"
                >
                  <X className="h-4 w-4 text-background" />
                </button>
              </div>
            ))}
            {images.length < 9 && (
              <button
                onClick={handleImageAdd}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 transition-colors hover:bg-secondary"
              >
                <div className="flex flex-col items-center gap-1">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {images.length}/9
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Text Content */}
        <Textarea
          placeholder="分享你的卡牌故事..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] resize-none border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
        />

        {/* Tags */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">添加话题标签</span>
            <span className="text-xs text-muted-foreground">
              (最多5个)
            </span>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="gap-1 px-3 py-1.5"
                >
                  #{tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}

          {/* Custom Tag Input */}
          <div className="mb-3 flex gap-2">
            <Input
              placeholder="输入自定义标签"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCustomTag()}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleAddCustomTag}
              disabled={!customTag || selectedTags.length >= 5}
            >
              添加
            </Button>
          </div>

          {/* Suggested Tags */}
          <div className="flex flex-wrap gap-2">
            {suggestedTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  #{tag}
                </button>
              ))}
          </div>
        </div>

        {/* Location */}
        <button className="mt-6 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">添加位置</span>
        </button>
      </div>
    </div>
  )
}
