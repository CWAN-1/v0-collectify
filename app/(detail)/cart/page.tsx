"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash2, Check, Gavel, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"

const cartItems = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    image: "/products/product-1.jpg",
    seller: { name: "CardMaster", verified: true },
    condition: "Mint",
    quantity: 1,
    maxQuantity: 1,
    type: "buy_now" as const,
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/products/product-5.jpg",
    seller: { name: "VintageCards", verified: true },
    condition: "Excellent",
    quantity: 1,
    maxQuantity: 1,
    type: "auction_won" as const,
    winningBid: 2500,
  },
  {
    id: "3",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    image: "/products/product-3.jpg",
    seller: { name: "YugiohPro", verified: true },
    condition: "Near Mint",
    quantity: 1,
    maxQuantity: 1,
    type: "buy_now" as const,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState(cartItems)
  const [selectedItems, setSelectedItems] = useState<string[]>(cartItems.map(i => i.id))

  const toggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(i => i.id))
    }
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.maxQuantity, item.quantity + delta))
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    setSelectedItems(selectedItems.filter(i => i !== id))
  }

  const selectedTotal = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Button variant="ghost" size="icon" className="size-9" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-base font-semibold flex-1">Shopping Cart</h1>
          <span className="text-xs text-muted-foreground">{items.length} items</span>
        </div>
      </header>

      <main className="px-4 py-3">
        {items.length > 0 ? (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
              <Checkbox
                checked={selectedItems.length === items.length}
                onCheckedChange={toggleSelectAll}
                className="size-4"
              />
              <span className="text-sm font-medium">Select All ({items.length})</span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="mt-3 size-4"
                  />
                  <div className="flex-1 bg-card rounded-xl border border-border p-2.5">
                    {/* Seller & Type */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-xs">{item.seller.name}</span>
                        {item.seller.verified && (
                          <div className="size-3.5 bg-foreground rounded-full flex items-center justify-center">
                            <Check className="size-2 text-background" />
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${
                        item.type === "auction_won" 
                          ? "bg-purple-500/10 text-purple-500" 
                          : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {item.type === "auction_won" ? (
                          <>
                            <Gavel className="size-2.5" />
                            Won
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="size-2.5" />
                            Buy Now
                          </>
                        )}
                      </div>
                    </div>

                    {/* Product */}
                    <div className="flex gap-2.5">
                      <div className="size-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-xs line-clamp-2 mb-0.5">{item.name}</h3>
                        <span className="text-[10px] text-muted-foreground">{item.condition}</span>
                        <p className="font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-muted-foreground text-xs"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="size-7 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="size-7 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="size-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="size-10 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Your Cart is Empty</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              No items in your cart yet.
            </p>
            <Link href="/shop">
              <Button size="sm" className="rounded-full">Browse Shop</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total ({selectedItems.length} items)</span>
            <span className="text-lg font-bold">{formatPrice(selectedTotal)}</span>
          </div>
          <Link href="/checkout" className="block">
            <Button
              disabled={selectedItems.length === 0}
              className="w-full h-10 rounded-xl text-sm font-semibold"
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
