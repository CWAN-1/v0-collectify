"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"

const cartItems = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 2500000,
    image: "/products/product-1.jpg",
    seller: { name: "CardMaster Jakarta", verified: true },
    condition: "Mint",
    quantity: 1,
    maxQuantity: 1
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 25000000,
    image: "/products/product-5.jpg",
    seller: { name: "VintageCards", verified: true },
    condition: "Excellent",
    quantity: 1,
    maxQuantity: 1
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
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
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold flex-1">Keranjang</h1>
          <span className="text-muted-foreground">{items.length} item</span>
        </div>
      </header>

      <main className="px-4 py-4">
        {items.length > 0 ? (
          <>
            {/* Select All */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <Checkbox
                checked={selectedItems.length === items.length}
                onCheckedChange={toggleSelectAll}
              />
              <span className="font-medium">Pilih Semua ({items.length})</span>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="mt-4"
                  />
                  <div className="flex-1 bg-card rounded-2xl border border-border p-3">
                    {/* Seller */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-sm">{item.seller.name}</span>
                      {item.seller.verified && (
                        <div className="size-4 bg-foreground rounded-full flex items-center justify-center">
                          <Check className="size-2.5 text-background" />
                        </div>
                      )}
                    </div>

                    {/* Product */}
                    <div className="flex gap-3">
                      <div className="size-20 rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h3>
                        <span className="text-xs text-muted-foreground">{item.condition}</span>
                        <p className="font-bold mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-muted-foreground text-sm"
                      >
                        <Trash2 className="size-4" />
                        Hapus
                      </button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="size-8 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="size-8 rounded-full bg-muted flex items-center justify-center disabled:opacity-40"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="size-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Keranjang Kosong</h3>
            <p className="text-muted-foreground text-center mb-6">
              Belum ada produk di keranjang. Yuk mulai belanja!
            </p>
            <Link href="/shop">
              <Button className="rounded-full">Belanja Sekarang</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Total ({selectedItems.length} item)</span>
            <span className="text-xl font-bold">{formatPrice(selectedTotal)}</span>
          </div>
          <Link href="/checkout">
            <Button
              disabled={selectedItems.length === 0}
              className="w-full h-14 rounded-full text-base font-semibold"
            >
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
