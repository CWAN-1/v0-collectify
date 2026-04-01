"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Plus, MoreHorizontal, Trash2, Edit, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialAddresses = [
  {
    id: "1",
    name: "John Doe",
    phone: "+62 812 3456 7890",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12930",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+62 812 9876 5432",
    address: "Jl. Gatot Subroto No. 456",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10270",
    isDefault: false,
  },
]

export default function AddressPage() {
  const [addresses, setAddresses] = useState(initialAddresses)

  const handleDelete = (addressId: string) => {
    setAddresses(addresses.filter(a => a.id !== addressId))
  }

  const handleSetDefault = (addressId: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    })))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Address Management</h1>
        </div>
      </header>

      <main className="p-4">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <MapPin className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No addresses yet</h3>
            <p className="text-sm text-muted-foreground">Add your shipping address</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-card rounded-xl border p-4 ${
                  address.isDefault ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-foreground">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="size-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                          <Check className="size-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(address.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{address.phone}</p>
                <p className="text-sm text-foreground">
                  {address.address}, {address.city}, {address.province} {address.postalCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 rounded-xl bg-primary gap-2">
          <Plus className="size-5" />
          Add New Address
        </Button>
      </div>
    </div>
  )
}
