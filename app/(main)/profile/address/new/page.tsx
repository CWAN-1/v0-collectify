"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Suspense } from "react"
import Link from "next/link"

function AddressFormContent() {
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const isEditing = !!editId
  
  const [formData, setFormData] = useState({
    name: isEditing ? "John Doe" : "",
    phone: isEditing ? "+1 (555) 123-4567" : "",
    street: isEditing ? "123 Main Street, Apt 4B" : "",
    city: isEditing ? "New York" : "",
    state: isEditing ? "NY" : "",
    postalCode: isEditing ? "10001" : "",
    isDefault: false,
  })

  const isFormValid = formData.name && formData.phone && formData.street && formData.city && formData.state && formData.postalCode

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link href="/profile/address">
              <Button variant="ghost" size="icon" className="size-9">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="text-base font-semibold">{isEditing ? "Edit Address" : "New Address"}</h1>
          </div>
          <Link href="/profile/address">
            <Button 
              disabled={!isFormValid}
              className="h-8 px-4 text-xs rounded-full"
            >
              Save
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Full Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            className="h-10 text-sm rounded-xl"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Phone Number</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            className="h-10 text-sm rounded-xl"
          />
        </div>

        {/* Street Address */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Street Address</Label>
          <Input
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="Enter street address"
            className="h-10 text-sm rounded-xl"
          />
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">City</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter city"
            className="h-10 text-sm rounded-xl"
          />
        </div>

        {/* State & Postal Code */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">State</Label>
            <Input
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="State"
              className="h-10 text-sm rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Postal Code</Label>
            <Input
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              placeholder="Postal code"
              className="h-10 text-sm rounded-xl"
            />
          </div>
        </div>

        {/* Set as Default */}
        <div className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
          <div>
            <p className="text-sm font-medium">Set as Default</p>
            <p className="text-[10px] text-muted-foreground">Use as primary shipping address</p>
          </div>
          <Switch
            checked={formData.isDefault}
            onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })}
          />
        </div>
      </main>
    </div>
  )
}

export default function AddressFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AddressFormContent />
    </Suspense>
  )
}
