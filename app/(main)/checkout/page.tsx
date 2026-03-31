"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, ChevronRight, CreditCard, Wallet, Building2, Check, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

const orderItems = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 2500000,
    image: "/products/product-1.jpg",
    seller: "CardMaster Jakarta",
    quantity: 1
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 25000000,
    image: "/products/product-5.jpg",
    seller: "VintageCards",
    quantity: 1
  },
]

const addresses = [
  {
    id: "1",
    label: "Rumah",
    name: "Budi Santoso",
    phone: "+62 812 3456 7890",
    address: "Jl. Sudirman No. 123, RT 01/RW 02, Menteng, Jakarta Pusat, DKI Jakarta, 10310",
    isDefault: true
  },
  {
    id: "2",
    label: "Kantor",
    name: "Budi Santoso",
    phone: "+62 812 3456 7890",
    address: "Gedung Menara ABC Lt. 15, Jl. Gatot Subroto, Jakarta Selatan, 12930",
    isDefault: false
  },
]

const paymentMethods = [
  { id: "ewallet", icon: Wallet, label: "E-Wallet", options: ["GoPay", "OVO", "DANA", "ShopeePay"] },
  { id: "va", icon: Building2, label: "Virtual Account", options: ["BCA", "Mandiri", "BNI", "BRI"] },
  { id: "card", icon: CreditCard, label: "Kartu Kredit/Debit", options: ["Visa", "Mastercard"] },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  const [selectedPayment, setSelectedPayment] = useState("ewallet")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 25000
  const serviceFee = 5000
  const total = subtotal + shippingFee + serviceFee

  const handleOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      router.push("/order-success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Shipping Address */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full bg-card rounded-2xl border border-border p-4 text-left">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Alamat Pengiriman</span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{selectedAddress.label}</span>
                  </div>
                  <p className="font-medium">{selectedAddress.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAddress.phone}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{selectedAddress.address}</p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground shrink-0" />
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Pilih Alamat</SheetTitle>
            </SheetHeader>
            <div className="space-y-3">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => setSelectedAddress(address)}
                  className={`w-full p-4 rounded-2xl text-left border transition-colors ${
                    selectedAddress.id === address.id
                      ? "border-foreground bg-muted"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{address.label}</span>
                    {address.isDefault && (
                      <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">Default</span>
                    )}
                  </div>
                  <p className="font-medium">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">{address.address}</p>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Order Items */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold mb-3">Pesanan ({orderItems.length} item)</h3>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="size-16 rounded-xl overflow-hidden bg-muted shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.seller}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-sm">{formatPrice(item.price)}</span>
                    <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold mb-3">Metode Pembayaran</h3>
          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      selectedPayment === method.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <RadioGroupItem value={method.id} />
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{method.label}</span>
                      <p className="text-xs text-muted-foreground">{method.options.join(", ")}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold mb-3">Ringkasan Pembayaran</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biaya Layanan</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold text-base">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Buyer Protection */}
        <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl">
          <Shield className="size-5 text-foreground" />
          <div className="text-sm">
            <span className="font-medium">Perlindungan Pembeli</span>
            <p className="text-muted-foreground">Jaminan uang kembali jika barang tidak sesuai</p>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Total Pembayaran</span>
          <span className="text-xl font-bold">{formatPrice(total)}</span>
        </div>
        <Button
          onClick={handleOrder}
          disabled={isProcessing}
          className="w-full h-14 rounded-full text-base font-semibold"
        >
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </Button>
      </div>
    </div>
  )
}
