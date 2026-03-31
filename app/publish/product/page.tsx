"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, X, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const categories = [
  { id: "pokemon", label: "宝可梦" },
  { id: "sports", label: "球星卡" },
  { id: "yugioh", label: "游戏王" },
  { id: "onepiece", label: "海贼王" },
  { id: "mtg", label: "万智牌" },
  { id: "other", label: "其他" },
]

const conditions = [
  { id: "mint", label: "完美品 (Mint)", desc: "无任何瑕疵" },
  { id: "near-mint", label: "近完美 (NM)", desc: "极轻微磨损" },
  { id: "excellent", label: "优秀 (EX)", desc: "轻微磨损" },
  { id: "good", label: "良好 (Good)", desc: "可见磨损" },
  { id: "played", label: "使用过 (Played)", desc: "明显使用痕迹" },
]

export default function PublishProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    version: "",
    condition: "",
    price: "",
    originalPrice: "",
    stock: "1",
    description: "",
    acceptOffer: true,
  })

  const handleImageAdd = () => {
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

  const isValid =
    images.length > 0 &&
    formData.title &&
    formData.category &&
    formData.condition &&
    formData.price

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
        <h1 className="text-lg font-semibold">上架商品</h1>
        <Button size="sm" disabled={!isValid}>
          上架
        </Button>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Image Upload */}
        <div className="mb-6">
          <Label className="mb-2 block">
            商品图片 <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`商品图片 ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                    封面
                  </span>
                )}
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
          <p className="mt-2 text-xs text-muted-foreground">
            第一张图片将作为封面展示，建议上传卡牌正反面照片
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">
              商品标题 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="例如: 皮卡丘VMAX闪卡 25周年纪念版"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Category */}
          <div>
            <Label>
              卡牌分类 <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Version */}
          <div>
            <Label htmlFor="version">版本号/系列</Label>
            <Input
              id="version"
              placeholder="例如: S8a 025/028"
              value={formData.version}
              onChange={(e) =>
                setFormData({ ...formData, version: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Condition */}
          <div>
            <Label>
              品相 <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.condition}
              onValueChange={(value) =>
                setFormData({ ...formData, condition: value })
              }
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="选择品相" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond.id} value={cond.id}>
                    <div className="flex flex-col">
                      <span>{cond.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {cond.desc}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">
                售价 (Rp) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">原价 (Rp)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="可选"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock">库存数量</Label>
            <Input
              id="stock"
              type="number"
              min="1"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">商品描述</Label>
            <Textarea
              id="description"
              placeholder="描述卡牌的详细信息，如稀有度、评级、特殊之处等..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          {/* Accept Offer */}
          <div className="flex items-center justify-between rounded-lg bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">接受议价</span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <Switch
              checked={formData.acceptOffer}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, acceptOffer: checked })
              }
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-xl bg-warning/10 p-4">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div className="text-xs text-warning-foreground">
              <p className="font-medium">上架须知</p>
              <ul className="mt-1 space-y-0.5 text-muted-foreground">
                <li>- 请确保图片清晰，真实反映卡牌品相</li>
                <li>- 禁止出售假卡、盗版或侵权商品</li>
                <li>- 平台将收取成交价的5%作为服务费</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
