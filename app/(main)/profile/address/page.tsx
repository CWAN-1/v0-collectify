"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, Floor 15",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    isDefault: false,
  },
]

export default function AddressPage() {
  const router = useRouter()
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
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <Button variant="ghost" size="icon" className="size-8" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-sm font-semibold">Address Management</h1>
        </div>
      </header>

      <main className="p-4 overflow-hidden">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="size-14 bg-secondary rounded-full flex items-center justify-center mb-3">
              <MapPin className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1">No addresses yet</h3>
            <p className="text-xs text-muted-foreground">Add your shipping address</p>
          </div>
        ) : (
          <div className="space-y-2">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-card rounded-xl border p-3 ${
                  address.isDefault ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xs text-foreground">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontal className="size-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem onClick={() => router.push(`/profile/address/new?edit=${address.id}`)}>
                        <Edit className="size-3.5 mr-2" />
                        <span className="text-xs">Edit</span>
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                          <Check className="size-3.5 mr-2" />
                          <span className="text-xs">Set as Default</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(address.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="size-3.5 mr-2" />
                        <span className="text-xs">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-[10px] text-muted-foreground mb-0.5">{address.phone}</p>
                <p className="text-xs text-foreground">
                  {address.address}, {address.city}, {address.state} {address.postalCode}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Link href="/profile/address/new">
          <Button className="w-full h-10 rounded-xl gap-2 text-sm">
            <Plus className="size-4" />
            Add New Address
          </Button>
        </Link>
      </div>
    </div>
  )
}
