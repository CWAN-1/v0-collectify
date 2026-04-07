"use client"

import { Check, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="size-28 bg-foreground rounded-full flex items-center justify-center">
          <Check className="size-14 text-background stroke-[3]" />
        </div>
        <div className="absolute -bottom-2 -right-2 size-12 bg-muted rounded-full flex items-center justify-center">
          <Package className="size-6 text-foreground" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
        Order Successful!
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-xs">
        Thank you for your purchase. Your order is being processed by the seller.
      </p>

      {/* Order Details */}
      <div className="w-full max-w-sm bg-card rounded-2xl border border-border p-4 mb-8">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-border">
          <span className="text-muted-foreground">Order Number</span>
          <span className="font-mono font-semibold">#ORD123456</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-muted-foreground">Total Payment</span>
          <span className="font-bold">$2,770</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Payment Method</span>
          <span className="font-medium">Credit Card</span>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="w-full max-w-sm mb-8">
        <h3 className="font-semibold mb-4">Order Status</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="size-8 bg-foreground rounded-full flex items-center justify-center">
                <Check className="size-4 text-background" />
              </div>
              <div className="w-0.5 h-8 bg-border" />
            </div>
            <div className="flex-1 pb-4">
              <p className="font-medium">Payment Received</p>
              <p className="text-sm text-muted-foreground">Today, 10:45 AM</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="size-8 bg-muted rounded-full flex items-center justify-center">
                <div className="size-3 bg-foreground rounded-full animate-pulse" />
              </div>
              <div className="w-0.5 h-8 bg-border" />
            </div>
            <div className="flex-1 pb-4">
              <p className="font-medium">Awaiting Seller Confirmation</p>
              <p className="text-sm text-muted-foreground">Estimated 24 hours</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="size-8 bg-muted rounded-full flex items-center justify-center">
              <Package className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Order Shipped</p>
              <p className="text-sm text-muted-foreground">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm space-y-3">
        <Link href="/profile/orders" className="block">
          <Button className="w-full h-14 rounded-full text-base font-semibold gap-2">
            View My Orders
            <ArrowRight className="size-5" />
          </Button>
        </Link>
        <Link href="/shop" className="block">
          <Button variant="outline" className="w-full h-14 rounded-full text-base font-semibold">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
