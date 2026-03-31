"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Plus, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

const categories = [
  { id: "pokemon", label: "Pokemon TCG" },
  { id: "sports", label: "Sports Cards" },
  { id: "yugioh", label: "Yu-Gi-Oh" },
  { id: "onepiece", label: "One Piece TCG" },
  { id: "mtg", label: "Magic: The Gathering" },
  { id: "digimon", label: "Digimon TCG" },
  { id: "other", label: "Lainnya" },
]

const conditions = [
  { id: "mint", label: "Mint/Near Mint", description: "Kondisi sempurna, tanpa cacat" },
  { id: "excellent", label: "Excellent", description: "Sedikit tanda penggunaan" },
  { id: "good", label: "Good", description: "Tanda penggunaan terlihat" },
  { id: "played", label: "Played", description: "Banyak tanda penggunaan" },
]

export default function CreateProductPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    set: "",
    number: "",
    rarity: "",
    language: "English",
    price: "",
    stock: "1",
    description: "",
  })

  const handlePublish = () => {
    router.push("/profile/shop")
  }

  const isFormValid = formData.name && category && condition && formData.price

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold">Jual Kartu</span>
          <div className="size-10" />
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Image Upload */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Foto Produk (Maks. 10)</h3>
            <span className="text-xs text-muted-foreground">0/10</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Main Photo */}
            <label className="size-28 shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground text-center px-2">Foto Utama</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            
            {/* Additional Photos */}
            {[1, 2, 3, 4].map((i) => (
              <label key={i} className="size-28 shrink-0 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-foreground/50 transition-colors">
                <Plus className="size-5 text-muted-foreground" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
            <Info className="size-3.5 shrink-0 mt-0.5" />
            Sertakan foto depan, belakang, dan detail kondisi kartu
          </p>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Nama Kartu *</h3>
          <Input
            placeholder="Contoh: Pikachu VMAX Rainbow Rare"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-14 rounded-2xl bg-muted border-0 text-base"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Kategori *</h3>
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                <span className={category ? "text-foreground" : "text-muted-foreground"}>
                  {category ? categories.find(c => c.id === category)?.label : "Pilih kategori"}
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>Pilih Kategori</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-full p-4 rounded-xl text-left transition-colors ${
                      category === cat.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Condition */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Kondisi *</h3>
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                <span className={condition ? "text-foreground" : "text-muted-foreground"}>
                  {condition ? conditions.find(c => c.id === condition)?.label : "Pilih kondisi"}
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>Pilih Kondisi</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setCondition(cond.id)}
                    className={`w-full p-4 rounded-xl text-left transition-colors ${
                      condition === cond.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                    }`}
                  >
                    <span className="font-medium">{cond.label}</span>
                    <p className={`text-sm ${condition === cond.id ? "text-background/70" : "text-muted-foreground"}`}>
                      {cond.description}
                    </p>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Set & Number */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Set/Expansion</h3>
            <Input
              placeholder="Contoh: Vivid Voltage"
              value={formData.set}
              onChange={(e) => setFormData({ ...formData, set: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Nomor Kartu</h3>
            <Input
              placeholder="Contoh: 188/185"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
        </div>

        {/* Rarity & Language */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Rarity</h3>
            <Input
              placeholder="Contoh: Rainbow Rare"
              value={formData.rarity}
              onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Bahasa</h3>
            <Input
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Harga (IDR) *</h3>
            <Input
              type="number"
              placeholder="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Stok</h3>
            <Input
              type="number"
              min="1"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Deskripsi</h3>
          <Textarea
            placeholder="Jelaskan kondisi kartu secara detail..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-28 rounded-2xl bg-muted border-0 resize-none"
          />
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <Button
          onClick={handlePublish}
          disabled={!isFormValid}
          className="w-full h-14 rounded-full text-base font-semibold"
        >
          Pasang Produk
        </Button>
      </div>
    </div>
  )
}
