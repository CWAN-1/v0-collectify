"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, ChevronRight, CreditCard, Wallet, Building2, Shield, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Image from "next/image"

const orderItems = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    image: "/products/product-1.jpg",
    seller: "CardMaster",
    quantity: 1
  },
  {
    id: "2",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/products/product-5.jpg",
    seller: "VintageCards",
    quantity: 1
  },
]

const addresses = [
  {
    id: "1",
    label: "Home",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    isDefault: true
  },
  {
    id: "2",
    label: "Office",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    address: "456 Business Ave, Floor 15, New York, NY 10002",
    isDefault: false
  },
]

const paymentMethods = [
  { id: "ewallet", icon: Wallet, label: "E-Wallet", options: ["PayPal", "Apple Pay", "Google Pay"] },
  { id: "card", icon: CreditCard, label: "Credit/Debit Card", options: ["Visa", "Mastercard", "Amex"] },
  { id: "bank", icon: Building2, label: "Bank Transfer", options: ["ACH", "Wire Transfer"] },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAddressSheet, setShowAddressSheet] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 15
  const serviceFee = 5
  const total = subtotal + shippingFee + serviceFee

  const handleOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      router.push("/order-success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Button variant="ghost" size="icon" className="size-9" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-base font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="px-4 py-3 space-y-3">
        {/* Shipping Address */}
        <button 
          onClick={() => setShowAddressSheet(true)}
          className="w-full bg-card rounded-xl border border-border p-3 text-left"
        >
          <div className="flex items-start gap-2.5">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <MapPin className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm">Shipping Address</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded-full">{selectedAddress.label}</span>
              </div>
              <p className="font-medium text-xs">{selectedAddress.name}</p>
              <p className="text-[10px] text-muted-foreground">{selectedAddress.phone}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{selectedAddress.address}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground shrink-0" />
          </div>
        </button>

        {/* Order Items */}
        <div className="bg-card rounded-xl border border-border p-3">
          <h3 className="font-medium text-sm mb-2.5">Order Items ({orderItems.length})</h3>
          <div className="space-y-2.5">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-2.5">
                <div className="size-12 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs line-clamp-1">{item.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{item.seller}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-semibold text-xs">{formatPrice(item.price)}</span>
                    <span className="text-[10px] text-muted-foreground">x{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-xl border border-border p-3">
          <h3 className="font-medium text-sm mb-2.5">Payment Method</h3>
          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <label
                    key={method.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors ${
                      selectedPayment === method.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                  >
                    <RadioGroupItem value={method.id} className="size-4" />
                    <div className="size-8 rounded-full bg-secondary flex items-center justify-center">
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-xs">{method.label}</span>
                      <p className="text-[10px] text-muted-foreground">{method.options.join(", ")}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl border border-border p-3">
          <h3 className="font-medium text-sm mb-2.5">Order Summary</h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-bold text-sm">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Buyer Protection */}
        <div className="flex items-center gap-2.5 p-3 bg-muted rounded-xl">
          <Shield className="size-4 text-foreground shrink-0" />
          <div className="text-xs">
            <span className="font-medium">Buyer Protection</span>
            <p className="text-muted-foreground text-[10px]">Money-back guarantee if item not as described</p>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Total Payment</span>
          <span className="text-lg font-bold">{formatPrice(total)}</span>
        </div>
        <Button
          onClick={handleOrder}
          disabled={isProcessing}
          className="w-full h-10 rounded-xl text-sm font-semibold"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>

      {/* Address Sheet */}
      <Sheet open={showAddressSheet} onOpenChange={setShowAddressSheet}>
        <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
          <SheetHeader className="pb-3">
            <SheetTitle className="text-base">Select Address</SheetTitle>
            <SheetDescription className="sr-only">Choose a shipping address</SheetDescription>
          </SheetHeader>
          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: "calc(50vh - 80px)" }}>
            {addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => {
                  setSelectedAddress(address)
                  setShowAddressSheet(false)
                }}
                className={`w-full p-3 rounded-xl text-left border transition-colors ${
                  selectedAddress.id === address.id
                    ? "border-foreground bg-muted"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{address.label}</span>
                  {address.isDefault && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-foreground text-background rounded-full">Default</span>
                  )}
                </div>
                <p className="font-medium text-xs">{address.name}</p>
                <p className="text-[10px] text-muted-foreground">{address.phone}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{address.address}</p>
              </button>
            ))}
            
            {/* Add New Address */}
            <Link href="/profile/address/new" onClick={() => setShowAddressSheet(false)}>
              <div className="w-full p-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center gap-2">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="size-4 text-muted-foreground" />
                </div>
                <span className="text-xs font-medium">Add New Address</span>
              </div>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
