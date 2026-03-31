"use client"

import Link from "next/link"
import { ArrowLeft, Camera, ShoppingBag, X } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

export default function PublishPage() {
  return (
    <AppLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <X className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">发布内容</h1>
          <div className="w-10" />
        </header>

        {/* Content */}
        <div className="px-4 py-8">
          <p className="mb-8 text-center text-muted-foreground">
            选择你想要发布的内容类型
          </p>

          <div className="space-y-4">
            {/* Post Content */}
            <Link
              href="/publish/post"
              className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground">
                  发布动态
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  分享你的收藏、开箱记录或卡牌知识
                </p>
              </div>
            </Link>

            {/* List Product */}
            <Link
              href="/publish/product"
              className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <ShoppingBag className="h-7 w-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground">
                  上架商品
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  出售你的卡牌，开始交易
                </p>
              </div>
            </Link>
          </div>

          {/* Tips */}
          <div className="mt-8 rounded-xl bg-secondary/50 p-4">
            <h4 className="mb-2 text-sm font-medium">发布须知</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>- 请确保上传清晰的卡牌图片</li>
              <li>- 商品描述需真实准确</li>
              <li>- 禁止发布假卡或盗版卡牌</li>
              <li>- 遵守平台交易规则</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
