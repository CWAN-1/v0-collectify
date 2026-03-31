"use client"

import Image from "next/image"
import { Flame, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ProductCardProps {
  product: {
    id: string
    title: string
    image: string
    price: number
    originalPrice?: number
    seller: {
      name: string
      verified: boolean
    }
    condition: string
    hotScore: number
    category: string
    version?: string
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  return (
    <Link href={`/shop/${product.id}`}>
      <article
        className={cn(
          "group cursor-pointer overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-lg",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.hotScore > 80 && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-accent px-2 py-1">
              <Flame className="h-3 w-3 text-accent-foreground" />
              <span className="text-xs font-medium text-accent-foreground">
                热销
              </span>
            </div>
          )}
          {discount > 0 && (
            <div className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1">
              <span className="text-xs font-bold text-destructive-foreground">
                -{discount}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="mb-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            {product.version && (
              <Badge variant="outline" className="text-xs">
                {product.version}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {product.condition}
            </Badge>
          </div>
          <h3 className="line-clamp-2 text-sm font-medium text-card-foreground">
            {product.title}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-accent">
              Rp {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                Rp {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-1 text-muted-foreground">
            {product.seller.verified && (
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
            )}
            <span className="text-xs">{product.seller.name}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
