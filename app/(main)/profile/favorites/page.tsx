"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

const favoriteProducts = [
  {
    id: "1",
    image: "/cards/pokemon-1.jpg",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    seller: "CardMaster",
  },
  {
    id: "2",
    image: "/cards/yugioh-1.jpg",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    seller: "YugiCollector",
  },
  {
    id: "3",
    image: "/cards/onepiece-1.jpg",
    name: "Luffy Gear 5 Secret Rare",
    price: 180,
    seller: "OnePieceID",
  },
]

const likedPosts = [
  {
    id: "1",
    image: "/posts/post-pokemon-1.jpg",
    title: "Amazing Pikachu pull!",
    user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    likes: 2431,
  },
  {
    id: "2",
    image: "/posts/post-sports-1.jpg",
    title: "NBA Rookie Cards Collection",
    user: { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    likes: 1892,
  },
]

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<"products" | "posts">("products")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Link href="/profile" className="absolute left-4">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold">Favorites</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-2.5 text-xs font-medium relative ${
              activeTab === "products" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Products
            {activeTab === "products" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-2.5 text-xs font-medium relative ${
              activeTab === "posts" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Liked Posts
            {activeTab === "posts" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </header>

      <main className="p-4">
        {activeTab === "products" && (
          <>
            {favoriteProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Heart className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No favorites yet</h3>
                <p className="text-sm text-muted-foreground">Save products you like!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {favoriteProducts.map((product) => (
                  <Link key={product.id} href={`/shop/${product.id}`}>
                    <div className="bg-card rounded-xl overflow-hidden border border-border">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <button className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Heart className="size-4 fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                        <p className="font-bold text-primary">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "posts" && (
          <>
            {likedPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Heart className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No liked posts</h3>
                <p className="text-sm text-muted-foreground">Like posts to see them here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {likedPosts.map((post) => (
                  <Link key={post.id} href={`/post/${post.id}`}>
                    <div className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
                      <div className="size-20 rounded-lg overflow-hidden shrink-0 relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="size-5">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback className="text-[8px]">{post.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{post.user.name}</span>
                        </div>
                        <h3 className="font-medium text-sm text-foreground line-clamp-2">{post.title}</h3>
                        <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
                          <Heart className="size-3 fill-red-500 text-red-500" />
                          <span className="text-xs">{post.likes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
